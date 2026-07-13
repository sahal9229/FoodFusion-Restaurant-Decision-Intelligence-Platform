import React from "react";
import { BookOpen, Server, HelpCircle, Code, Settings2, FileCode } from "lucide-react";

export const Help: React.FC = () => {
  return (
    <div className="space-y-lg max-w-[900px] mx-auto animate-fade-in select-none">
      
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-1">Documentation & Support</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Complete structural guide to the FoodFusion Restuarant Analytics ecosystem.
        </p>
      </div>

      {/* Docs Sections */}
      <div className="space-y-xl">
        
        {/* Section 1: Overview */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
            <BookOpen size={18} className="text-primary" />
            <h3 className="font-bold text-base text-on-surface">System Walkthrough</h3>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The FoodFusion Restaurant ETL dashboard provides analytics engineers and restaurant managers an interface to ingestion pipelines. Raw dataset files uploaded here are archived in Google Cloud Storage, verified and staged in Airflow DAG tasks, loaded into Google BigQuery warehouse tables, and finally visualized in Power BI.
          </p>
        </section>

        {/* Section 2: Pipeline Details */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
            <Server size={18} className="text-secondary" />
            <h3 className="font-bold text-base text-on-surface">Data Warehouse Staging Flow</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-surface-container/40 border border-outline-variant/20 rounded-lg p-4 space-y-2">
              <span className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Settings2 size={12} />
                GCS Folder Layout
              </span>
              <ul className="space-y-1 text-on-surface-variant">
                <li>• Raw: <code className="text-primary-container">gs://foodfusion-raw-datasets/</code></li>
                <li>• Archive: <code className="text-primary-container">gs://foodfusion-archive-datasets/</code></li>
                <li>• Stage: <code className="text-primary-container">gs://foodfusion-temp-staging/</code></li>
              </ul>
            </div>
            <div className="bg-surface-container/40 border border-outline-variant/20 rounded-lg p-4 space-y-2">
              <span className="font-bold text-secondary flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <FileCode size={12} />
                BigQuery Staging Tables
              </span>
              <ul className="space-y-1 text-on-surface-variant">
                <li>• Dataset: <code className="text-primary-container">foodfusion_restaurant_bi</code></li>
                <li>• Staged: <code className="text-primary-container">stg_transactions_orders</code></li>
                <li>• Core: <code className="text-primary-container">dim_locations</code>, <code className="text-primary-container">fact_sales</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: CSV Format rules */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
            <Code size={18} className="text-primary-container" />
            <h3 className="font-bold text-base text-on-surface">JSON Schema Ingestion Check</h3>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Verify validation constraints within files before running uploads. Price formatting supports decimals. Ingestions with negative quantities or pricing formats are marked invalid and redirected to the Rejected rows output file.
          </p>
          <div className="bg-[#050914] border border-outline-variant/20 rounded-lg p-4 font-mono text-xs text-on-surface-variant">
            <span className="text-primary-container font-bold block mb-1">CSV Row Example:</span>
            Date,Item,Quantity,Price,Location<br/>
            2023-09-01,BBQ Chicken Pizza,2,14.50,LOC-NY-01<br/>
            2023-09-01,French Fries Lrg,4,4.25,LOC-LA-02
          </div>
        </section>

        {/* Section 4: Support */}
        <section className="bg-surface-container/20 border border-outline-variant/20 rounded-xl p-5 flex items-start gap-4">
          <HelpCircle size={22} className="text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-on-surface">Need help setting up cloud pipelines?</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              For issues connecting GCS, Apache Airflow scheduler DAGs, Google BigQuery database queries, or setting up Power BI semantic dashboard datasets, contact your organization's analytics platform administrator.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
};
