import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { UploadCloud, Info, Download, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { uploadFile } from "../../services/uploadService";

type UploadStage = "idle" | "uploading" | "success" | "error";

export const Upload: React.FC = () => {
  const { setUploadedFile } = useAppContext();
  const navigate = useNavigate();
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStage, setUploadStage] = useState<UploadStage>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = uploadStage === "uploading";

  /**
   * Real upload: POST file directly as FormData to Cloud Function
   */
  const startRealUpload = async (file: File) => {
    setUploadStage("uploading");
    setUploadProgress(0);
    setErrorMsg(null);
    setCurrentFileName(file.name);

    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);

    try {
      // Upload file with progress tracking
      await uploadFile(file, (percent) => {
        setUploadProgress(percent);
      });

      // Success — save file metadata
      setUploadedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        rows: 4500000,
        cols: 5,
        date: new Date().toLocaleDateString(),
      });
      setUploadStage("success");

    } catch (err) {
      setUploadStage("error");
      const message = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setErrorMsg(message);
    }
  };

  /**
   * Demo mode: simulate upload without hitting cloud services
   */
  const startDemoUpload = (fileName: string, sizeBytes: number) => {
    setUploadStage("uploading");
    setUploadProgress(0);
    setErrorMsg(null);
    setCurrentFileName(fileName);

    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFile({
            name: fileName,
            size: `${sizeMB} MB`,
            rows: 4500000,
            cols: 5,
            date: new Date().toLocaleDateString(),
          });
          setUploadStage("success");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const validateAndUpload = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setErrorMsg("Invalid file type. Please upload a CSV dataset.");
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      setErrorMsg("File exceeds the maximum size limit of 500MB.");
      return;
    }
    startRealUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
    // Reset the input so re-selecting the same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
  };

  const triggerFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Item,Quantity,Price,Location\n2023-09-01,Burger,12,8.50,LOC-NY-01\n2023-09-01,Fries,32,3.50,LOC-LA-02\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "restaurant_sales_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** Status label shown next to the progress bar */
  const getStatusLabel = () => {
    switch (uploadStage) {
      case "uploading": return `${uploadProgress}%`;
      case "success": return "Upload complete!";
      default: return "";
    }
  };

  return (
    <div className="space-y-lg max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col gap-sm">
        <h2 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface">Upload Dataset</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Import your raw restaurant transaction logs into Google Cloud Storage to begin the validation and warehouse pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Upload Action Zone */}
        <div className="lg:col-span-8 flex flex-col gap-md">
          {/* File Input Element */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv" 
            className="hidden" 
          />

          {/* Drag & Drop Area */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={!isUploading ? triggerFileBrowser : undefined}
            className={`bg-surface border-2 rounded-xl p-xl flex flex-col items-center justify-center text-center border-dashed group h-[350px] transition-all duration-200 ${
              isUploading 
                ? "border-primary/30 bg-primary/5 cursor-wait opacity-70 pointer-events-none"
                : isDragOver 
                  ? "border-primary bg-primary/5 cursor-pointer" 
                  : "border-outline-variant hover:border-primary/60 hover:bg-surface-container/20 cursor-pointer"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-md group-hover:bg-primary/20 transition-colors duration-200">
              <UploadCloud size={28} className="text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs font-semibold">
              Drag & Drop file here
            </h3>
            
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg max-w-sm">
              or click to browse from your computer. CSV format supported, maximum size of 500MB.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                disabled={isUploading}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileBrowser();
                }}
                className="bg-primary text-background font-body-md text-body-md font-semibold py-2.5 px-6 rounded hover:bg-primary-container transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select CSV File
              </button>
              <button 
                disabled={isUploading}
                onClick={(e) => {
                  e.stopPropagation();
                  startDemoUpload("restaurant_transactions_q3.csv", 1288490188);
                }}
                className="bg-surface-container-high border border-outline-variant/40 text-on-surface font-body-md text-body-md font-semibold py-2.5 px-6 rounded hover:bg-surface-container-highest transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Use Demo Dataset
              </button>
            </div>
          </div>

          {/* Upload Progress/Status Indicator */}
          {isUploading && (
            <div className="border rounded-xl p-5 flex items-center gap-md bg-surface-container/60 border-outline-variant/40">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold truncate max-w-[200px] md:max-w-md">
                    {currentFileName}
                  </span>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {getStatusLabel()}
                  </span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-150 ease-out bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {uploadStage === "success" && (
            <div className="border rounded-xl p-6 bg-tertiary/5 border-tertiary/30 space-y-4 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-tertiary/10 text-tertiary">
                  <CheckCircle2 size={22} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-on-surface font-semibold text-md flex items-center gap-2">
                    File uploaded successfully
                  </h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Your dataset <span className="font-mono font-semibold text-primary-container">{currentFileName}</span> will be processed automatically within the next 2 minutes.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/10">
                <button
                  onClick={() => {
                    setUploadStage("idle");
                    setUploadedFile(null);
                  }}
                  className="px-4 py-2 text-xs rounded border border-outline-variant hover:bg-surface-container transition-colors text-on-surface-variant font-medium"
                >
                  Upload Another File
                </button>
                <button
                  onClick={() => navigate("/preview")}
                  className="px-5 py-2 text-xs rounded bg-primary text-background hover:bg-primary-container font-semibold transition-colors shadow-[0_0_10px_rgba(59,130,246,0.25)]"
                >
                  Preview Dataset
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-error/10 border border-error/20 rounded-xl p-4 flex items-start gap-3 text-error">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-body-md text-body-md font-semibold">{errorMsg}</p>
                <button
                  onClick={() => { setErrorMsg(null); setUploadStage("idle"); }}
                  className="mt-2 text-xs underline opacity-80 hover:opacity-100 transition-opacity"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Requirements & Instructions Panel */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col h-full justify-between">
            <div className="space-y-md">
              <div className="flex items-center gap-sm pb-4 border-b border-outline-variant/20">
                <Info size={18} className="text-secondary" />
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Schema Constraints</h3>
              </div>
              
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                For successful execution in Airflow & loading into BigQuery, ensure columns exactly match:
              </p>

              <div className="bg-surface-container-high border border-outline-variant/20 rounded-lg p-4 font-mono text-xs text-on-surface divide-y divide-outline-variant/10">
                <div className="flex justify-between pb-2 mb-2 text-on-surface-variant font-bold">
                  <span>Column Header</span>
                  <span>DataType</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-primary-container">Date</span>
                  <span className="text-on-surface-variant/80">YYYY-MM-DD</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-primary-container">Item</span>
                  <span className="text-on-surface-variant/80">STRING</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-primary-container">Quantity</span>
                  <span className="text-on-surface-variant/80">INTEGER</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-primary-container">Price</span>
                  <span className="text-on-surface-variant/80">FLOAT</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span className="text-primary-container">Location</span>
                  <span className="text-on-surface-variant/80">STRING</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleDownloadTemplate}
                className="flex items-center justify-center gap-2 w-full border border-outline-variant text-on-surface font-semibold py-2.5 px-4 rounded hover:bg-surface-container-high hover:border-on-surface transition-all duration-150"
              >
                <Download size={16} />
                Download Template CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
