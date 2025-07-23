import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useData } from '../../contexts/DataContext';
import toast from 'react-hot-toast';




export default function FileUpload() {
  const { addFile } = useData();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback(async (file: File) => {
  if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
    toast.error('Please upload a valid Excel or CSV file');
    return;
  }

  setIsProcessing(true);
  try {
    let data: any[][] = [];
    if (file.name.toLowerCase().endsWith('.csv')) {
      // Read CSV as text
      const text = await file.text();
      const workbook = XLSX.read(text, { type: 'string' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    } else {
      // Read XLSX/XLS as arrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    }

    if (data.length === 0) {
      toast.error('The file appears to be empty');
      return;
    }

    const headers = data[0] as string[];
    const dataRows = data.slice(1);

    const fileData = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date(),
      data: dataRows,
      headers,
      size: file.size
    };

    // 🔥 Send to backend

    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/files/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 🔐 Send the token
      },
      body: JSON.stringify(fileData),
    });

    

    addFile(fileData);
    toast.success('File uploaded successfully!');
    navigate(`/visualizer/${fileData.id}`);
  } catch (error) {
    console.error('Error processing file:', error);
    toast.error('Error processing file. Please try again.');
  } finally {
    setIsProcessing(false);
  }
}, [addFile]);


  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
      (e.target as HTMLInputElement).value = '';
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black mb-2">Upload Excel File</h2>
        <p className="text-black/70">Drag and drop your Excel file or click to browse</p>
      </div>

      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging
            ? 'border-blue-400 bg-blue-500/10'
            : 'border-black/30 hover:border-white/50'
        }`}
      >
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: isProcessing ? 360 : 0 }}
            transition={{ repeat: isProcessing ? Infinity : 0, duration: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-pink-800 from-blue-500 to-purple-600 rounded-2xl"
          >
            {isProcessing ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </motion.div>
          
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              {isProcessing ? 'Processing file...' : 'Drop your Excel file here'}
            </h3>
            <p className="text-black/60">
              {isProcessing ? 'Please wait while we process your data' : 'or click to browse from your computer'}
            </p>
          </div>

          {!isProcessing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-800 from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Browse Files
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="bg-black-500/10 border border-black-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-black-400 mt-0.5" />
          <div>
            <h4 className="text-black-300 font-medium mb-1">Supported Formats</h4>
            <ul className="text-black-200/80 text-sm space-y-1">
              <li>• Excel files (.xlsx, .xls, .csv)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• First row should contain column headers</li>
              <li>• Data should be in tabular format</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}