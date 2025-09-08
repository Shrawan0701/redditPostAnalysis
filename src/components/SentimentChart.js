import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ data, large = false }) => {
  if (!data) return <div>No sentiment data available</div>;

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [
          data.positivePercentage || 0,
          data.neutralPercentage || 0,
          data.negativePercentage || 0,
        ],
        backgroundColor: [
          '#4CAF50',
          '#FFC107',
          '#F44336',
        ],
        borderColor: [
          '#45a049',
          '#ffb300',
          '#d32f2f',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: large ? 'bottom' : 'right',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Sentiment Analysis',
        font: {
          size: large ? 18 : 16,
          weight: 'bold',
        },
        padding: 20,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed.toFixed(1) + '%';
          }
        }
      }
    },
  };

  return (
    <div className={`sentiment-chart ${large ? 'large' : ''}`}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;