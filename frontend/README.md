# FoodFusion Restaurant ETL & Analytics Platform

This is the professional, production-quality React + Vite + TypeScript frontend for **FoodFusion – Restaurant ETL & Analytics Platform**. 

The interface is engineered with a **Deep Sea Dark Mode** theme, optimized for high data density, readability, and performance. The design draws inspiration from enterprise data orchestration and cloud warehouse consoles like Snowflake, Airbyte, and Databricks.

---

## 🚀 Key Features

1. **Home Landing Portal**: Complete system architecture flow diagram illustrating the ingestion pathway (GCS ➔ Apache Airflow ➔ Google BigQuery ➔ Power BI).
2. **Interactive Mock Upload**: Simulated drag-and-drop workspace supporting file size check limits (up to 500MB) and upload progress bars. Includes a **Use Demo Dataset** shortcut button.
3. **High-Density Data Preview**: Displays file metadata properties, data completeness ratios, temporal ranges, and renders a 10-row database preview table.
4. **Airflow ETL Simulation**: A visual stepper showing active pipeline stages connected with a live scrolling console terminal window streaming raw ingestion logs.
5. **Data Quality Reports**: Staging summaries metrics, data quality scores, execution times, and export triggers to download rejected records and full txt reports.
6. **Power BI Dashboard Sync**: Active Microsoft Power BI gateway connection status and instructions for post-ETL manual query refreshes.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons**: Lucide React Icons

---

## 📂 Directory Layout

The application has been generated strictly within the specified path:

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── logo/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── upload/
│   │   ├── preview/
│   │   ├── pipeline/
│   │   ├── reports/
│   │   ├── dashboard/
│   │   └── layout/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Upload/
│   │   ├── Preview/
│   │   ├── Pipeline/
│   │   ├── Reports/
│   │   └── Dashboard/
│   │
│   ├── hooks/          # AppContext state simulator
│   ├── services/
│   ├── utils/
│   ├── styles/         # index.css (Tailwind v4 imports & theme definitions)
│   ├── App.tsx         # Routing & layout shell
│   └── main.tsx
│
├── package.json
└── README.md
```

---

## 💻 Local Setup & Execution

### 1. Install Dependencies
Navigate to the `frontend/` directory and install the packages:
```bash
cd frontend
npm install
```

### 2. Launch Local Development Server
To start the local server with hot module replacement (HMR):
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your web browser.

### 3. Production Compilation Build
To compile the TypeScript project and generate the output bundle for hosting:
```bash
npm run build
```
Build outputs will be generated under the `dist/` directory.
