import React from "react";
import { 
  BarChart3, 
  Layers
} from "lucide-react";

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-lg max-w-[1000px] mx-auto animate-fade-in select-none">
      
      {/* Main Workspace Card */}
      <div className="bg-surface-container/30 border border-outline-variant/30 rounded-2xl p-lg md:p-xl space-y-lg shadow-md">
        
        {/* Title & Description Block */}
        <div className="space-y-md">
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface flex items-center gap-2">
            <span role="img" aria-label="chart">📊</span> Microsoft Power BI Analytics Dashboard
          </h2>
          
          <div className="space-y-md text-on-surface-variant font-body-lg text-body-lg leading-relaxed max-w-3xl">
            <p className="font-semibold text-primary">
              The Business Intelligence dashboard for the FoodFusion ETL Platform will be displayed here.
            </p>
            <p>
              Uploaded restaurant datasets are automatically processed through the Google Cloud ETL pipeline using Apache Airflow.
            </p>
            <p>
              After successful extraction, transformation and loading, the processed data is stored in Google BigQuery.
            </p>
            <p>
              Microsoft Power BI connects directly to the warehouse and provides interactive business intelligence reports including sales trends, restaurant performance, customer insights, cuisine analysis, revenue analytics and operational KPIs.
            </p>
            <p>
              This page serves as the embedded Power BI workspace where users will explore the final analytics dashboard.
            </p>
          </div>
        </div>

        {/* Large Outlined Placeholder Area */}
        <div className="border border-dashed border-outline-variant/55 rounded-xl p-lg md:p-xl text-center bg-surface-container-low/10 relative overflow-hidden">
          {/* Decorative faint glow */}
          <div className="absolute inset-0 bg-radial-glow opacity-5 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-md py-md max-w-md mx-auto">
            {/* Power BI Styled Yellow/Amber Icon Container */}
            <div className="w-16 h-16 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto shadow-sm text-amber-400">
              <BarChart3 size={32} />
            </div>
            
            <div className="space-y-xs">
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Power BI Dashboard will be embedded here
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Interactive reports and visualizations will appear after connecting the Microsoft Power BI Embedded report.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Professional Integration Card at Bottom */}
      <div className="bg-surface-container/30 border border-outline-variant/30 rounded-xl p-6 flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Layers size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
            Dashboard Integration
          </h4>
          <p className="text-xs text-on-surface-variant/80 leading-relaxed">
            This application uses Google Cloud Storage for data ingestion, Apache Airflow for workflow orchestration, Google BigQuery as the enterprise data warehouse and Microsoft Power BI for business intelligence visualization. The embedded Power BI dashboard will automatically reflect the latest processed datasets after each successful ETL execution.
          </p>
        </div>
      </div>

    </div>
  );
};
