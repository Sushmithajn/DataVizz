import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';
import { useData } from '../../contexts/DataContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


import {
  Upload,
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  Calendar,
  Trash2,
} from 'lucide-react';



export default function Dashboard() {
  const { files, deleteFile, setFiles, setCurrentFile } = useData();
  const navigate = useNavigate();
  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token'); // ✅ Get token from localStorage

      const res = await axios.get('http://localhost:5000/api/files/all', {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include the token in the header
        },
      });

      const filesWithParsedDates = res.data.map((file: any) => ({
        ...file,
        uploadDate: new Date(file.uploadDate),
      }));

      setFiles(filesWithParsedDates);
    } catch (error) {
      console.error('❌ Failed to fetch files from DB:', error);
    }
  };

  fetchFiles();
}, [setFiles]);




  const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const handleStartVisualizing = () => {
  setCurrentFile(null);
  navigate('/visualizer');
};

const handleUploadClick = () => {
  setCurrentFile(null);
  navigate('/visualizer');
};



  return (
    <div className="min-h-screen pt-16 bg-purple-200 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Your{' '}
            <span className="text-4xl md:text-6xl font-bold mb-4">
              Excel Data
            </span>
          </h1>
          <p className="text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
            Upload, visualize, and gain insights from your spreadsheets with powerful 2D/3D charts and AI-powered analysis.
          </p>
          <Link to="/visualizer">
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartVisualizing}
            className="bg-pink-800 from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Start uploading
              </motion.button>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-yellow-100 rounded-2xl p-6 border border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-black">{files.length}</p>
              </div>
              <FileSpreadsheet className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-100 rounded-2xl p-6 border border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-sm">Charts Created</p>
                <p className="text-3xl font-bold text-black">{files.length * 2}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-pink-200 rounded-2xl p-6 border border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-black">Data Points</p>
                <p className="text-3xl font-bold text-black">
                  {files.reduce((total, file) => total + file.data.length, 0)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-pink-400" />
            </div>
          </motion.div>
        </div>

        {/* Recent Files */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-pink-100 rounded-2xl border border-gray-700 shadow-sm"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-black">Recent Files</h2>
            <p className="text-gray-800">Your uploaded Excel files and data</p>
          </div>

          {files.length === 0 ? (
            <div className="p-12 text-center">
              <FileSpreadsheet className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No files uploaded yet</h3>
              <p className="text-gray-500 mb-6">Start by uploading your first Excel file</p>
              <Link to="/visualizer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-800 from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Upload File
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 hover:bg-pink-200 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-900 p-3 rounded-xl">
                        <FileSpreadsheet className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(file.uploadDate, 'MMM dd, yyyy')}
                          </span>
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.data.length} rows</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 ">
                      <Link to={`/visualizer/${file.id}`}>
                        <button
                  
                          className="bg-blue-900 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          Visualize
                        </button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteFile(file.id)}
                        className="bg-red-900 text-red-300 p-2 rounded-lg hover:bg-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
