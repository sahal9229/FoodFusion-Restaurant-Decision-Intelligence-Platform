import pandas as pd 
import io

from datetime import datetime

from airflow import DAG
from airflow.operators.python import PythonOperator

from airflow.providers.google.cloud.hooks.gcs import GCSHook
from google.cloud import storage


# configuratioin

BUCKET_NAME = "foodfusion-bucket"
RAW_FOLDER = "raw/"
PROCESSED_FOLDER = "processed/"


default_args = {
    "owner": "FoodFusion",
    "start_date": datetime(2026, 7, 13)
}

with DAG(
    dag_id="foodfusion_etl",
    default_args=default_args,
    description="FoodFusion ETL Pipeline",
    schedule="*/2 * * * *",
    catchup=False
) as dag:

# extract   
    def extract_data(ti):

        client = storage.Client()

        blobs = [
            blob
            for blob in client.list_blobs(BUCKET_NAME, prefix=RAW_FOLDER)
            if blob.name.endswith(".csv")
        ]

        if not blobs:
            raise Exception("No CSV files found in raw folder.")

        latest_blob = max(blobs, key=lambda blob: blob.updated)

        print(f"Latest File: {latest_blob.name}")

        # Push the filename into XCom
        ti.xcom_push(
            key="input_file",
            value=latest_blob.name
        )

        gcs_hook = GCSHook()

        file_bytes = gcs_hook.download(
            bucket_name=BUCKET_NAME,
            object_name=latest_blob.name
        )

        df = pd.read_csv(io.BytesIO(file_bytes))

        print(df.head())
        df.info()

        return df.to_json()


    def transform_data(ti):

        # Get extracted data from XCom
        pulled_data = ti.xcom_pull(task_ids="extract_data")

        # Convert JSON back to DataFrame
        df = pd.read_json(pulled_data)

        # -------------------------
        # Data Cleaning
        # -------------------------

        # Remove duplicate recipes
        df = df.drop_duplicates(subset=["id"])

        # Remove rows where recipe name is missing
        df = df.dropna(subset=["name"])

        # Remove extra spaces
        df["name"] = df["name"].fillna("").str.strip()
        df["cuisine"] = df["cuisine"].fillna("").str.strip()

        # -------------------------
        # Data Transformation
        # -------------------------

        # Total cooking time
        df["Total_Time"] = (
            df["prepTimeMinutes"] +
            df["cookTimeMinutes"]
        )

        # Rating Category
        df["Rating_Category"] = df["rating"].apply(
            lambda x:
            "Excellent" if x >= 4.5 else
            "Good" if x >= 3.5 else
            "Average"
        )

        # Difficulty in uppercase
        df["difficulty"] = df["difficulty"].str.upper()

        # -------------------------
        # Rename Columns
        # -------------------------

        df = df.rename(columns={
            "id": "Recipe_ID",
            "name": "Recipe_Name",
            "reviewCount": "Review_Count",
            "prepTimeMinutes": "Preparation_Time",
            "cookTimeMinutes": "Cooking_Time",
            "servings": "Servings",
            "caloriesPerServing": "Calories_Per_Serving",
            "mealType": "Meal_Type",
            "image": "Image_URL"
        })

        # Return transformed data to XCom
        return df.to_json()


    def load_data(ti):

        # Get transformed data from XCom
        pulled_data = ti.xcom_pull(task_ids="transform_data")

        # Convert JSON back to DataFrame
        df = pd.read_json(pulled_data)

        # Get original uploaded file name from Extract task
        input_file = ti.xcom_pull(
            task_ids="extract_data",
            key="input_file"
        )

        # Example:
        # raw/recipes.csv -> recipes.csv
        filename = input_file.split("/")[-1]

        # Remove .csv extension
        filename = filename.replace(".csv", "")

        # Create output file name
        output_file = f"{PROCESSED_FOLDER}{filename}_cleaned.csv"

        # Convert DataFrame to CSV
        csv_data = df.to_csv(index=False)

        # Upload to Google Cloud Storage
        gcs_hook = GCSHook()

        gcs_hook.upload(
            bucket_name=BUCKET_NAME,
            object_name=output_file,
            data=csv_data,
            mime_type="text/csv"
        )

        print(f"Processed file uploaded successfully to: {output_file}")



    extract_task = PythonOperator(
        task_id="extract_data",
        python_callable=extract_data
    )

    transform_task = PythonOperator(
        task_id="transform_data",
        python_callable=transform_data
    )

    load_task = PythonOperator(
        task_id="load_data",
        python_callable=load_data
    )


    extract_task >> transform_task >> load_task