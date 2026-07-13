import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { Table, CheckCircle2, ShieldCheck, ChevronRight, AlertCircle, ArrowLeftRight, Inbox } from "lucide-react";

export const Preview: React.FC = () => {
  const { uploadedFile, setUploadedFile } = useAppContext();
  const navigate = useNavigate();

  const mockRows = [
    { date: "2023-09-01", item: "Double Smash Burger", qty: 12, price: 9.50, location: "LOC-CHI-01", status: "Valid" },
    { date: "2023-09-01", item: "Truffle Pizza slice", qty: 4, price: 14.00, location: "LOC-NY-04", status: "Valid" },
    { date: "2023-09-01", item: "Caesar Salad Combo", qty: 0, price: 0.00, location: "LOC-LA-02", status: "Missing Qty" },
    { date: "2023-09-01", item: "Dark Chocolate Shake", qty: 15, price: 5.50, location: "LOC-NY-01", status: "Valid" },
    { date: "2023-09-02", item: "Carbonara Pasta", qty: 8, price: 16.50, location: "LOC-CHI-02", status: "Valid" },
    { date: "2023-09-02", item: "Double Soda (Lrg)", qty: 24, price: 2.50, location: "LOC-NY-02", status: "Valid" },
    { date: "2023-09-02", item: "Warm Garlic Baguette", qty: 10, price: 4.50, location: "LOC-LA-01", status: "Valid" },
    { date: "2023-09-03", item: "Spicy Chicken Wings", qty: 18, price: -1.00, location: "LOC-CHI-01", status: "Negative Price" },
    { date: "2023-09-03", item: "Apple Pie w/ Ice Cream", qty: 6, price: 6.50, location: "LOC-NY-04", status: "Valid" },
    { date: "2023-09-03", item: "Cold Iced Brew", qty: 20, price: 4.00, location: "LOC-LA-02", status: "Valid" },
  ];

  if (!uploadedFile) {
    return (
      <div className="flex flex-col items-center justify-center border border-outline-variant/30 bg-surface-container/20 rounded-2xl p-12 text-center h-[450px] max-w-2xl mx-auto animate-fade-in select-none">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-on-surface-variant/70">
          <Inbox size={28} />
        </div>
        <h3 className="font-headline-md text-headline-md font-semibold text-on-surface mb-2">
          No Ingested Dataset Found
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
          Please upload a restaurant transaction CSV dataset first to preview database rows and check structural template rules.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="bg-primary text-background font-semibold py-2 px-6 rounded hover:bg-primary-container transition-colors duration-150"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-lg max-w-[1200px] mx-auto animate-fade-in select-none">
      
      {/* File Details Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-1">Preview Data</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Analyzing ingested file: <span className="font-mono text-primary font-semibold">{uploadedFile.name}</span>
          </p>
        </div>
        
        {/* Verification Status Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary/10 border border-tertiary/20 text-xs font-semibold text-tertiary font-mono">
            <CheckCircle2 size={12} />
            CSV VALID
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary font-mono">
            <ShieldCheck size={12} />
            TEMPLATE VERIFIED
          </span>
        </div>
      </div>

      {/* Grid: Details and Mini Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Left Column: Metadata Cards */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container/60 border border-outline-variant/30 rounded-xl p-5 space-y-md">
            <h3 className="font-semibold text-sm text-on-surface uppercase tracking-wider font-mono text-on-surface-variant/70 border-b border-outline-variant/20 pb-2">
              File Properties
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surface-container-high border border-outline-variant/20 px-3 py-2.5 rounded-lg text-center">
                <span className="block text-[10px] text-on-surface-variant uppercase font-semibold mb-1">Size</span>
                <span className="font-bold text-sm text-on-surface">{uploadedFile.size}</span>
              </div>
              <div className="bg-surface-container-high border border-outline-variant/20 px-3 py-2.5 rounded-lg text-center">
                <span className="block text-[10px] text-on-surface-variant uppercase font-semibold mb-1">Rows</span>
                <span className="font-bold text-sm text-on-surface">4.5M</span>
              </div>
              <div className="bg-surface-container-high border border-outline-variant/20 px-3 py-2.5 rounded-lg text-center">
                <span className="block text-[10px] text-on-surface-variant uppercase font-semibold mb-1">Cols</span>
                <span className="font-bold text-sm text-on-surface">{uploadedFile.cols}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-on-surface-variant/80 bg-surface-container-high/40 p-2.5 rounded-lg border border-outline-variant/10">
              <span>Upload Time:</span>
              <span className="font-mono">{uploadedFile.date}</span>
            </div>
          </div>

          <div className="bg-surface-container/60 border border-outline-variant/30 rounded-xl p-5 space-y-md">
            <h3 className="font-semibold text-sm text-on-surface uppercase tracking-wider font-mono text-on-surface-variant/70 border-b border-outline-variant/20 pb-2">
              Temporal Range
            </h3>
            <div className="flex items-center justify-between gap-2">
              <div className="bg-surface-container-high border border-outline-variant/20 px-3 py-2 rounded-lg flex-1">
                <span className="block text-[8px] text-on-surface-variant/70 font-mono font-bold uppercase mb-0.5">MIN DATE</span>
                <span className="font-bold text-xs text-on-surface">2023-07-01</span>
              </div>
              <ArrowLeftRight size={14} className="text-outline-variant" />
              <div className="bg-surface-container-high border border-outline-variant/20 px-3 py-2 rounded-lg flex-1">
                <span className="block text-[8px] text-on-surface-variant/70 font-mono font-bold uppercase mb-0.5">MAX DATE</span>
                <span className="font-bold text-xs text-on-surface">2023-09-30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ingested Rows Table */}
        <div className="lg:col-span-8 bg-surface-container/40 border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-lg py-md border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-high/40">
            <div className="flex items-center gap-2">
              <Table size={16} className="text-primary" />
              <h3 className="font-bold text-sm text-on-surface">Raw Data Snapshot (First 10 Rows)</h3>
            </div>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full font-mono">
              PREVIEW ONLY
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-surface-container-high/35 border-b border-outline-variant/20 text-on-surface-variant/80">
                  <th className="p-3 font-semibold uppercase tracking-wider">Date</th>
                  <th className="p-3 font-semibold uppercase tracking-wider">Item</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-right">Quantity</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-right">Price</th>
                  <th className="p-3 font-semibold uppercase tracking-wider">Location</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                {mockRows.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-surface-container-high/40 transition-colors duration-100 ${
                      row.status !== "Valid" ? "bg-error/5 hover:bg-error/10" : ""
                    }`}
                  >
                    <td className="p-3 text-on-surface-variant">{row.date}</td>
                    <td className="p-3 font-semibold text-primary-container">{row.item}</td>
                    <td className="p-3 text-right font-medium">{row.qty}</td>
                    <td className={`p-3 text-right font-semibold ${row.price <= 0 ? "text-error" : ""}`}>
                      ${row.price.toFixed(2)}
                    </td>
                    <td className="p-3 text-on-surface-variant">{row.location}</td>
                    <td className="p-3 text-center">
                      {row.status === "Valid" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/20 text-[10px] text-tertiary font-semibold font-sans">
                          <span className="w-1 h-1 rounded-full bg-tertiary"></span>
                          Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error/10 border border-error/20 text-[10px] text-error font-semibold font-sans">
                          <AlertCircle size={10} />
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Navigation Actions Footer */}
      <div className="flex justify-end gap-4 pt-lg border-t border-outline-variant/30">
        <button 
          onClick={() => {
            setUploadedFile(null);
            navigate("/upload");
          }}
          className="px-6 py-2 rounded-lg font-semibold text-on-surface border border-outline-variant hover:bg-surface-container transition-colors"
        >
          Cancel Ingestion
        </button>
        <button 
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 rounded-lg font-semibold text-background bg-primary hover:bg-primary-container transition-all duration-200 flex items-center gap-1 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          View Dashboard
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
};
