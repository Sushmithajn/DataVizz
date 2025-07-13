import React from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Upload, 
  Download, 
  Brain, 
  FileSpreadsheet, 
  TrendingUp, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: 'Easy File Upload',
      description: 'Drag and drop Excel files (.xlsx, .xls) with instant parsing and validation'
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Create stunning 2D and 3D visualizations with dynamic axis selection'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Download charts as high-quality PNG or PDF for presentations'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get intelligent analysis and recommendations powered by AI'
    },
    {
      icon: TrendingUp,
      title: 'Data Analytics',
      description: 'Discover patterns, trends, and outliers in your data automatically'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely with enterprise-grade protection'
    }
  ];

  const chartTypes = [
    { name: 'Bar Charts', description: 'Compare values across categories' },
    { name: 'Line Charts', description: 'Show trends over time' },
    { name: 'Pie Charts', description: 'Display proportions and percentages' },
    { name: 'Scatter Plots', description: 'Reveal correlations between variables' },
    { name: '3D Columns', description: 'Interactive three-dimensional visualizations' }
  ];

  return (
    <div className="min-h-screen bg-purple-200 from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-purple-100/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-pink-800 from-blue-600 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DataViz Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-pink-800 from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Transform Your{' '}
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                  Excel Data
                </span>
                <br />
                Into Beautiful Charts
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Upload spreadsheets, create stunning visualizations, and discover insights with AI-powered analytics. 
                No coding required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-800 from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Visualizing Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-300 hover:bg-gray-50 transition-all shadow-md"
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
                    <FileSpreadsheet className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-gray-900 font-semibold mb-2">Upload Excel</h3>
                    <p className="text-gray-600 text-sm">Drag & drop your spreadsheet files</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border border-purple-200">
                    <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                    <h3 className="text-gray-900 font-semibold mb-2">Create Charts</h3>
                    <p className="text-gray-600 text-sm">Generate interactive visualizations</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 border border-pink-200">
                    <Brain className="w-12 h-12 text-pink-600 mb-4" />
                    <h3 className="text-gray-900 font-semibold mb-2">AI Insights</h3>
                    <p className="text-gray-600 text-sm">Get intelligent data analysis</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features for{' '}
                <span className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Data Visualization
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to transform raw data into actionable insights
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all group shadow-sm"
                >
                  <div className="bg-pink-700 from-blue-600 to-purple-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chart Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Multiple Chart Types
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose from various visualization options to best represent your data
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {chartTypes.map((chart, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all shadow-sm"
              >
                <div className="bg-pink-700 from-blue-600 to-purple-600 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{chart.name}</h3>
                <p className="text-gray-600 text-sm">{chart.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-200 from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Ready to Visualize Your Data?
            </h2>
            <p className="text-xl text-black mb-8">
              Join thousands of users who trust DataViz Pro for their data visualization needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-black-200">
                <CheckCircle className="w-5 h-5" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2 text-black-200">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-black-200">
                <CheckCircle className="w-5 h-5" />
                <span>Instant setup</span>
              </div>
            </div>

            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold text-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-pink-700 from-blue-600 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DataViz Pro</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-600">
              <span>© 2025 DataViz Pro. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}