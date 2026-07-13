import React from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Download, Server, Cpu, Database, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const architectureSteps = [
    {
      title: "Data Ingestion",
      desc: "Restaurant operators drop raw transaction CSV datasets containing orders, quantities, prices, and locations.",
      icon: UploadCloud,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Google Cloud Storage",
      desc: "Raw datasets are securely archived in GCS buckets triggering ingestion events.",
      icon: Server,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Apache Airflow",
      desc: "Orchestrates validation, deduplication, price anomalies clean up, and loading steps via automated DAG workflows.",
      icon: Cpu,
      color: "text-primary-container",
      bgColor: "bg-primary-container/10",
    },
    {
      title: "Google BigQuery",
      desc: "Highly optimized enterprise serverless data warehouse storing cleaned analytics-ready operational records.",
      icon: Database,
      color: "text-secondary-container",
      bgColor: "bg-secondary-container/10",
    },
    {
      title: "Power BI Analytics",
      desc: "Business users explore interactive sales trends, location performance profiles, and menu insights.",
      icon: BarChart3,
      color: "text-tertiary",
      bgColor: "bg-tertiary/10",
    },
  ];

  const handleDownloadTemplate = () => {
    // Generate a simple CSV mock template download
    const csvContent = "data:text/csv;charset=utf-8,Date,Item,Quantity,Price,Location\n2026-07-08,Burger,5,12.50,LOC-NY-01\n2026-07-08,Pizza,2,18.00,LOC-LA-02\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "foodfusion_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-xl max-w-[1200px] mx-auto animate-fade-in select-none">
      
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-surface-container to-surface border border-outline-variant/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-lg">
        {/* Glow decorative spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-2xl space-y-md">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary font-mono">
            PORTFOLIO PROJECT
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
            Restaurant Decision Intelligence Platform
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
            Welcome to the FoodFusion Analytics dashboard interface. Extract, validate, profile, and transform raw restaurant transaction histories into high-performance warehouse data models and live operational reports.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => navigate("/upload")}
              className="px-5 py-2.5 rounded-lg bg-primary text-background font-semibold hover:bg-primary-container transition-all duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
            >
              <UploadCloud size={18} />
              Upload Dataset
            </button>
            
            <button
              onClick={handleDownloadTemplate}
              className="px-5 py-2.5 rounded-lg border border-outline-variant/60 text-on-surface font-semibold hover:bg-surface-container-high hover:border-on-surface transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Download size={18} />
              Download CSV Template
            </button>
          </div>
        </div>
      </section>

      {/* Overview Block */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-6 space-y-sm">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-lg text-on-surface">Data Verification</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Automated schema checks and verification rule templates assure that incoming restaurant logs align completely with data warehouse structures.
          </p>
        </div>

        <div className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-6 space-y-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-2">
            <Cpu size={20} />
          </div>
          <h3 className="font-bold text-lg text-on-surface">Workflow Execution</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Monitor pipeline tasks dynamically through granular step stepper milestones accompanied by live status logs.
          </p>
        </div>

        <div className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-6 space-y-sm">
          <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-2">
            <BarChart3 size={20} />
          </div>
          <h3 className="font-bold text-lg text-on-surface">BI Integration</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Seamlessly links pipeline status reports directly with external reporting layers (Power BI Gateway) to synchronize executive dashboards.
          </p>
        </div>
      </section>

      {/* Cloud Architecture Flow */}
      <section className="space-y-lg pt-4">
        <div className="text-center max-w-lg mx-auto space-y-sm">
          <h2 className="text-2xl font-bold text-on-surface">System Architecture & Data Pipeline Flow</h2>
          <p className="text-sm text-on-surface-variant">
            How raw restaurant transactions flow into enterprise insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
          {architectureSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title}
                className="bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/50 transition-colors duration-200 rounded-xl p-5 flex flex-col justify-between relative group shadow-sm"
              >
                {/* Horizontal flow arrow helper for desktop */}
                {idx < 4 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-outline-variant group-hover:text-primary transition-colors">
                    <ArrowRight size={18} />
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center ${step.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{step.title}</h4>
                    <p className="text-xs text-on-surface-variant/80 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-outline-variant/10 text-[10px] font-mono text-on-surface-variant/40">
                  STAGE {idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
