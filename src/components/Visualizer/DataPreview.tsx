import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, BarChart3 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function DataPreview() {
  const { currentFile } = useData();

  if (!currentFile) return null;

  const displayData = currentFile.data.slice(0, 10); // Show first 10 rows
  const totalRows = currentFile.data.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blac mb-2">Data Preview</h2>
          <p className="text-black/70">Review your uploaded data before visualization</p>
        </div>
        <div className="bg-black/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-black font-medium">{currentFile.name}</p>
              <p className="text-black/60 text-sm">{totalRows} rows • {currentFile.headers.length} columns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/5 rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/10 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-black/80 font-medium text-sm">Row</th>
                {currentFile.headers.map((header, index) => (
                  <th key={index} className="px-4 py-3 text-left text-black/80 font-medium text-sm min-w-[120px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {displayData.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className="hover:bg-black/5 transition-colors"
                >
                  <td className="px-4 py-3 text-black/60 text-sm font-mono">{rowIndex + 1}</td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-black text-sm">
                      {cell?.toString() || '-'}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalRows > 10 && (
        <div className="text-center">
          <p className="text-black/60 text-sm">
            Showing 10 of {totalRows} rows. All data will be available for visualization.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-black font-medium mb-2">Data Quality</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-black/70">Complete rows</span>
              <span className="text-black-800">
                {Math.round((currentFile.data.filter(row => row.every(cell => cell !== null && cell !== '')).length / totalRows) * 100)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black/70">Total columns</span>
              <span className="text-gray-700">{currentFile.headers.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-black font-medium mb-2">Numeric Columns</h3>
          <div className="text-sm text-blcak/70">
            {currentFile.headers.filter((_, index) => {
              const sample = currentFile.data.slice(0, 5).map(row => row[index]);
              return sample.some(val => !isNaN(Number(val)) && val !== '');
            }).length} of {currentFile.headers.length} columns contain numeric data
          </div>
        </div>

        <div className="bg-black/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-black font-medium mb-2">Ready for Charts</h3>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-black-800" />
            <span className="text-black-800 text-sm">Data is ready for visualization</span>
          </div>
        </div>
      </div>
    </div>
  );
}