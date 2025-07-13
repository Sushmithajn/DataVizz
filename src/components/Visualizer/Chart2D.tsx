import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart2D() {
  const { currentFile, chartConfig } = useData();

  const chartData = useMemo(() => {
    if (!currentFile) return null;

    const xAxisIndex = currentFile.headers.indexOf(chartConfig.xAxis);
    const yAxisIndex = currentFile.headers.indexOf(chartConfig.yAxis);

    if (xAxisIndex === -1 || yAxisIndex === -1) return null;

    if (chartConfig.type === 'pie') {
      // For pie charts, aggregate data by category
      const aggregated = new Map();
      currentFile.data.forEach(row => {
        const category = row[xAxisIndex]?.toString() || 'Unknown';
        const value = Number(row[yAxisIndex]) || 0;
        aggregated.set(category, (aggregated.get(category) || 0) + value);
      });

      const labels = Array.from(aggregated.keys());
      const data = Array.from(aggregated.values());

      return {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
            '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
          ],
          borderWidth: 2,
          borderColor: '#1e293b'
        }]
      };
    }

    if (chartConfig.type === 'scatter') {
      const data = currentFile.data
        .filter(row => {
          const x = Number(row[xAxisIndex]);
          const y = Number(row[yAxisIndex]);
          return !isNaN(x) && !isNaN(y);
        })
        .map(row => ({
          x: Number(row[xAxisIndex]),
          y: Number(row[yAxisIndex])
        }));

      return {
        datasets: [{
          label: `${chartConfig.yAxis} vs ${chartConfig.xAxis}`,
          data,
          backgroundColor: '#3B82F6',
          borderColor: '#1D4ED8',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      };
    }

    // For bar and line charts
    const labels = currentFile.data.map(row => row[xAxisIndex]?.toString() || '');
    const data = currentFile.data.map(row => Number(row[yAxisIndex]) || 0);

    return {
      labels,
      datasets: [{
        label: chartConfig.yAxis,
        data,
        backgroundColor: chartConfig.type === 'line' ? 'rgba(59, 130, 246, 0.2)' : '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 2,
        tension: chartConfig.type === 'line' ? 0.4 : 0,
        fill: chartConfig.type === 'line'
      }]
    };
  }, [currentFile, chartConfig]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: !!chartConfig.title,
        text: chartConfig.title,
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    scales: chartConfig.type === 'pie' ? {} : {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff'
        }
      }
    }
  };

  if (!chartData) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-white/70">Unable to render chart with current configuration</p>
      </div>
    );
  }

  const ChartComponent = {
    bar: Bar,
    line: Line,
    pie: Pie,
    scatter: Scatter
  }[chartConfig.type];

  if (!ChartComponent) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-white/70">Chart type not supported</p>
      </div>
    );
  }

  return (
    <div className="h-96">
      <ChartComponent data={chartData} options={options} />
    </div>
  );
}