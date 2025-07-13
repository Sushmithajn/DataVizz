import React, { createContext, useContext, useState } from 'react';

export interface DataFile {
  id: string;
  name: string;
  uploadDate: Date;
  data: any[][];
  headers: string[];
  size: number;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter' | '3d-column';
  xAxis: string;
  yAxis: string;
  title: string;
}

interface DataContextType {
  files: DataFile[];
  currentFile: DataFile | null;
  chartConfig: ChartConfig;
  addFile: (file: DataFile) => void;
  setCurrentFile: (file: DataFile | null) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
  deleteFile: (id: string) => void;
}



const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<DataFile[]>([]);
  const [currentFile, setCurrentFile] = useState<DataFile | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: 'Chart'
  });

  const addFile = (file: DataFile) => {
    setFiles(prev => [file, ...prev]);
  };

  const updateChartConfig = (config: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...config }));
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (currentFile?.id === id) {
      setCurrentFile(null);
    }
  };

  return (
    <DataContext.Provider value={{
      files,
      currentFile,
      chartConfig,
      addFile,
      setCurrentFile,
      updateChartConfig,
      deleteFile
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}