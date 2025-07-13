import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Image, FileText } from 'lucide-react';
import Chart2D from './Chart2D';
import Chart3D from './Chart3D';
import { useData } from '../../contexts/DataContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

export default function ChartRenderer() {
  const { currentFile, chartConfig } = useData();
  const chartRef = useRef<HTMLDivElement>(null);

  if (!currentFile || !chartConfig.xAxis || !chartConfig.yAxis) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/10 rounded-xl p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-black mb-2">Chart Configuration Required</h3>
          <p className="text-black/70 mb-4">Please configure your chart in the previous step before visualizing</p>
          <p className="text-black/50 text-sm">Select chart type, X-axis, and Y-axis columns</p>
        </div>
      </div>
    );
  }

  const downloadPNG = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#1e293b',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `${chartConfig.title || 'chart'}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('Chart downloaded as PNG!');
    } catch (error) {
      toast.error('Failed to download PNG');
    }
  };

  const downloadPDF = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#1e293b',
        scale: 2,
      });
      
      const pdf = new jsPDF('landscape');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${chartConfig.title || 'chart'}.pdf`);
      
      toast.success('Chart downloaded as PDF!');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">Chart Visualization</h2>
          <p className="text-black/70">Interactive chart based on your configuration</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPNG}
            className="flex items-center space-x-2 bg-blue-500/20 text-black-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Image className="w-4 h-4" />
            <span>PNG</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-red-500/20 text-black-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </motion.button>
        </div>
      </div>

      <div 
        ref={chartRef}
        className="bg-black/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
      >
        {chartConfig.type === '3d-column' ? (
          <Chart3D />
        ) : (
          <Chart2D />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-black font-medium mb-2">Chart Info</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-black/70">Type:</span>
              <span className="text-black capitalize">{chartConfig.type.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Data Points:</span>
              <span className="text-black">{currentFile.data.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-black font-medium mb-2">Axes</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-black/70">X-Axis:</span>
              <span className="text-black">{chartConfig.xAxis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Y-Axis:</span>
              <span className="text-black">{chartConfig.yAxis}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-black font-medium mb-2">Export Options</h4>
          <div className="text-sm text-black/70">
            Download your chart as high-quality PNG or PDF for presentations and reports.
          </div>
        </div>
      </div>
    </div>
  );
}