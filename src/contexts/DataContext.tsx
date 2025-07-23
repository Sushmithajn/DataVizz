import React, { createContext, useContext, useState } from 'react';


// File data interface
export interface DataFile {
  id: string;
  name: string;
  uploadDate: Date;
  data: any[][]; // spreadsheet data
  headers: string[];
  size: number;
}

// Chart config interface
export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter' | '3d-column';
  xAxis: string;
  yAxis: string;
  title: string;
}

// Combined context type
interface DataContextType {
  files: DataFile[];
  currentFile: DataFile | null;
  chartConfig: ChartConfig;
  addFile: (file: DataFile) => void;
  setFiles: (files: DataFile[]) => void;              // ✅ NEW
  setCurrentFile: (file: DataFile | null) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
  deleteFile: (id: string) => void;
}

// Create context with undefined default
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [files, setFilesState] = useState<DataFile[]>([]);
  const [currentFile, setCurrentFile] = useState<DataFile | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: 'Chart',
  });

  const addFile = (file: DataFile) => {
    setFilesState(prev => [file, ...prev]);
  };

  const setFiles = (files: DataFile[]) => {
    setFilesState(files);
  };

  const updateChartConfig = (config: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...config }));
  };

  const deleteFile = (id: string) => {
    setFilesState(prev => prev.filter(f => f.id !== id));
    if (currentFile?.id === id) {
      setCurrentFile(null);
    }
  };

  return (
    <DataContext.Provider
      value={{
        files,
        currentFile,
        chartConfig,
        addFile,
        setFiles, // ✅ included here
        setCurrentFile,
        updateChartConfig,
        deleteFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use context safely
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
