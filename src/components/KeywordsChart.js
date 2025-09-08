import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KeywordsChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No keyword data available</div>;
  }

  // Take top keywords
  const entries = Object.entries(data).slice(0, 10);
  const labels = entries.map(([keyword]) => keyword);
  const frequencies = entries.map(([, frequency]) => frequency);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Keywords',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return 'Keyword: ' + context[0].label;
          },
          label: function(context) {
            return 'Mentions: ' + context.parsed.y;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="keywords-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default KeywordsChart;