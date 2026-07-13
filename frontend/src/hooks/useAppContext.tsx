import React, { createContext, useContext, useState } from "react";

export interface FileData {
  name: string;
  size: string;
  rows: number;
  cols: number;
  date: string;
}

interface AppContextType {
  uploadedFile: FileData | null;
  setUploadedFile: (file: FileData | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);

  return (
    <AppContext.Provider
      value={{
        uploadedFile,
        setUploadedFile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
