import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, ScatterChart as Scatter, Box } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const chartTypes = [
  { type: 'bar', label: 'Bar Chart', icon: BarChart3, description: 'Compare values across categories' },
  { type: 'line', label: 'Line Chart', icon: LineChart, description: 'Show trends over time' },
  { type: 'pie', label: 'Pie Chart', icon: PieChart, description: 'Show proportions of a whole' },
  { type: 'scatter', label: 'Scatter Plot', icon: Scatter, description: 'Show correlation between variables' },
  { type: '3d-column', label: '3D Column', icon: Box, description: 'Interactive 3D visualization' },
];

export default function ChartConfigPanel() {
  const { currentFile, chartConfig, updateChartConfig } = useData();

  if (!currentFile) return null;

  const numericColumns = currentFile.headers.filter((header, index) => {
    const sample = currentFile.data.slice(0, 10).map(row => row[index]);
    return sample.some(val => !isNaN(Number(val)) && val !== null && val !== '');
  });

  const allColumns = currentFile.headers;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">Configure Chart</h2>
        <p className="text-black/70">Choose chart type and configure axes for your visualization</p>
      </div>

      {/* Chart Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">Chart Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {chartTypes.map((chart) => {
            const Icon = chart.icon;
            const isSelected = chartConfig.type === chart.type;
            
            return (
              <motion.button
                key={chart.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateChartConfig({ type: chart.type as any })}
                className={`p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-500/20 border-blue-400 text-black-300'
                    : 'bg-white/5 border-white/20 text-black/70 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">{chart.label}</div>
                <div className="text-xs opacity-70 mt-1">{chart.description}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Axis Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-black font-medium mb-3">X-Axis (Categories)</label>
          <select
            value={chartConfig.xAxis}
            onChange={(e) => updateChartConfig({ xAxis: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select X-Axis column</option>
            {allColumns.map((column, index) => (
              <option key={index} value={column} className="bg-white-800 text-black">
                {column}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-black font-medium mb-3">
            Y-Axis (Values)
            {chartConfig.type === 'pie' && <span className="text-black/60 text-sm"> - Values to sum</span>}
          </label>
          <select
            value={chartConfig.yAxis}
            onChange={(e) => updateChartConfig({ yAxis: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Y-Axis column</option>
            {(chartConfig.type === 'pie' ? allColumns : numericColumns).map((column, index) => (
              <option key={index} value={column} className="bg-white text-black">
                {column}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Title */}
      <div>
        <label className="block text-black font-medium mb-3">Chart Title</label>
        <input
          type="text"
          value={chartConfig.title}
          onChange={(e) => updateChartConfig({ title: e.target.value })}
          placeholder="Enter chart title..."
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Configuration Preview */}
      {chartConfig.xAxis && chartConfig.yAxis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
        >
          <h4 className="text-green-300 font-medium mb-2">Configuration Preview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-black/70">Chart Type:</span>
              <span className="text-black capitalize">{chartConfig.type.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">X-Axis:</span>
              <span className="text-black">{chartConfig.xAxis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Y-Axis:</span>
              <span className="text-black">{chartConfig.yAxis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Title:</span>
              <span className="text-black">{chartConfig.title || 'Untitled Chart'}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}