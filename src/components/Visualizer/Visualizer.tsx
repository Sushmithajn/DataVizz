import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import DataPreview from './DataPreview';
import ChartConfigPanel from './ChartConfigPanel';
import ChartRenderer from './ChartRenderer';
import AIInsights from './AIInsights';
import { useData } from '../../contexts/DataContext';

export default function Visualizer() {
  const { id } = useParams();
  const { files, currentFile, setCurrentFile } = useData();
  const [activeTab, setActiveTab] = useState<'upload' | 'preview' | 'configure' | 'visualize' | 'insights'>('upload');

  useEffect(() => {
    if (id) {
      const file = files.find(f => f.id === id);
      if (file) {
        setCurrentFile(file);
        setActiveTab('preview');
      }
    }
  }, [id, files, setCurrentFile]);

  useEffect(() => {
    if (currentFile && activeTab === 'upload') {
      setActiveTab('preview');
    }
  }, [currentFile, activeTab]);

  const tabs = [
    { key: 'upload', label: 'Upload', disabled: false },
    { key: 'preview', label: 'Preview', disabled: !currentFile },
    { key: 'configure', label: 'Configure', disabled: !currentFile },
    { key: 'visualize', label: 'Visualize', disabled: !currentFile },
    { key: 'insights', label: 'AI Insights', disabled: !currentFile },
  ];

  return (
    <div className="min-h-screen pt-16 bg-pink-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Data Visualizer</h1>
          <p className="text-black/70">Transform your Excel data into beautiful, interactive charts</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-black/10 backdrop-blur-lg rounded-2xl border border-black/20 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => !tab.disabled && setActiveTab(tab.key as any)}
                disabled={tab.disabled}
                className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-black bg-black/10 border-b-2 border-blue-400'
                    : tab.disabled
                    ? 'text-black/30 cursor-not-allowed'
                    : 'text-black/70 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-black/10 backdrop-blur-lg rounded-2xl border border-black/20 p-6 text-black">
          {activeTab === 'upload' && <FileUpload />}
          {activeTab === 'preview' && currentFile && <DataPreview />}
          {activeTab === 'configure' && currentFile && <ChartConfigPanel />}
          {activeTab === 'visualize' && currentFile && <ChartRenderer />}
          {activeTab === 'insights' && currentFile && <AIInsights />}
        </div>
      </div>
    </div>
  );
}
