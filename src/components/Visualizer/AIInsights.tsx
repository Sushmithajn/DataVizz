import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AIInsights() {
  const { currentFile, chartConfig } = useData();
  const [insights, setInsights] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (currentFile) {
      generateInsights();
    }
  }, [currentFile, chartConfig]);

  const generateInsights = async () => {
    if (!currentFile) return;

    setIsGenerating(true);
    
    // Simulate AI analysis - in production, this would call OpenAI API
    setTimeout(() => {
      const mockInsights = [
        {
          type: 'trend',
          icon: TrendingUp,
          title: 'Data Trend Analysis',
          content: `Based on the ${chartConfig.yAxis} column, there's a ${Math.round(Math.random() * 40 + 10)}% increase in values over the dataset range. The trend shows consistent growth with some seasonal variations.`,
          confidence: 85
        },
        {
          type: 'outlier',
          icon: AlertTriangle,
          title: 'Outlier Detection',
          content: `Identified ${Math.floor(Math.random() * 5 + 1)} potential outliers in your data. These values are significantly different from the norm and might require investigation.`,
          confidence: 92
        },
        {
          type: 'correlation',
          icon: Sparkles,
          title: 'Pattern Recognition',
          content: `Strong correlation detected between ${chartConfig.xAxis} and ${chartConfig.yAxis}. The relationship suggests predictable patterns that could be leveraged for forecasting.`,
          confidence: 78
        },
        {
          type: 'recommendation',
          icon: Lightbulb,
          title: 'Visualization Recommendation',
          content: `For your current data structure, consider using a ${chartConfig.type === 'bar' ? 'line chart to show trends over time' : 'scatter plot to highlight correlations'} as an alternative visualization.`,
          confidence: 90
        }
      ];

      setInsights(mockInsights);
      setIsGenerating(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-black';
    if (confidence >= 60) return 'text-black';
    return 'text-red-300';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500/20 border-green-500/30';
    if (confidence >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">AI-Powered Insights</h2>
          <p className="text-black/70">Automated analysis and recommendations for your data</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateInsights}
          disabled={isGenerating}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-black px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50"
        >
          <Brain className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : ''}`} />
          <span>{isGenerating ? 'Analyzing...' : 'Regenerate'}</span>
        </motion.button>
      </div>

      {isGenerating ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="animate-pulse">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  <div className="h-4 bg-white/20 rounded w-1/3"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded w-full"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-black">{insight.title}</h3>
                      <div className={`px-3 py-1 rounded-full border ${getConfidenceBg(insight.confidence)}`}>
                        <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-black/80 leading-relaxed">{insight.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Brain className="w-5 h-5 text-black mt-0.5" />
          <div>
            <h4 className="text-black font-medium mb-1">AI Integration</h4>
            <p className="text-black/80 text-sm">
              This is a demo version with simulated insights. In production, this would integrate with OpenAI's API 
              to provide real-time analysis of your data patterns, statistical insights, and actionable recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}