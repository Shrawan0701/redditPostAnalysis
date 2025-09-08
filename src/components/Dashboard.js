import React, { useState } from 'react';
import '../styles/Dashboard.css';
import SentimentChart from './SentimentChart';
import KeywordsChart from './KeywordsChart';
import PostsList from './PostsList';

const Dashboard = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Provide default values to prevent errors
  const safeData = {
    inputSource: data?.inputSource || 'Unknown',
    timestamp: data?.timestamp || new Date().toISOString(),
    sentimentAnalysis: data?.sentimentAnalysis || { positivePercentage: 0, neutralPercentage: 0, negativePercentage: 0, overallSentiment: 'neutral' },
    keywordFrequency: data?.keywordFrequency || {},
    keyTopics: data?.keyTopics || [],
    stats: data?.stats || { totalPosts: 0, totalComments: 0, totalUsers: 0, averageScore: 0 },
    llmSummary: data?.llmSummary || 'No summary available',
    businessInsights: data?.businessInsights || 'No business insights available',
    analyzedPosts: data?.analyzedPosts || []
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h2>Analysis Results</h2>
          <div className="header-info">
            <span className="source-info">Source: {safeData.inputSource}</span>
            <span className="timestamp">Analyzed: {formatTimestamp(safeData.timestamp)}</span>
          </div>
        </div>
        <button onClick={onReset} className="new-analysis-button">
          New Analysis
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'sentiment' ? 'active' : ''}`}
          onClick={() => setActiveTab('sentiment')}
        >
          Sentiment Analysis
        </button>
        <button
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          AI Insights
        </button>
        <button
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts Data
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Posts</h3>
                <div className="stat-value">{safeData.stats.totalPosts}</div>
              </div>
              <div className="stat-card">
                <h3>Total Comments</h3>
                <div className="stat-value">{safeData.stats.totalComments}</div>
              </div>
              <div className="stat-card">
                <h3>Unique Users</h3>
                <div className="stat-value">{safeData.stats.totalUsers}</div>
              </div>
              <div className="stat-card">
                <h3>Average Score</h3>
                <div className="stat-value">{safeData.stats.averageScore?.toFixed(1) || 0}</div>
              </div>
            </div>

            <div className="overview-charts">
              <div className="chart-container">
                <SentimentChart data={safeData.sentimentAnalysis} />
              </div>
              <div className="chart-container">
                <KeywordsChart data={safeData.keywordFrequency} />
              </div>
            </div>

            {safeData.keyTopics.length > 0 && (
              <div className="key-topics">
                <h3>Key Topics</h3>
                <div className="topics-list">
                  {safeData.keyTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sentiment' && (
          <div className="sentiment-tab">
            <div className="sentiment-overview">
              <div className="sentiment-summary">
                <h3>Overall Sentiment: <span className={`sentiment-${safeData.sentimentAnalysis.overallSentiment}`}>
                  {safeData.sentimentAnalysis.overallSentiment?.toUpperCase()}
                </span></h3>
              </div>
              <div className="sentiment-breakdown">
                <div className="sentiment-item positive">
                  <span>Positive</span>
                  <span>{safeData.sentimentAnalysis.positivePercentage?.toFixed(1)}%</span>
                </div>
                <div className="sentiment-item neutral">
                  <span>Neutral</span>
                  <span>{safeData.sentimentAnalysis.neutralPercentage?.toFixed(1)}%</span>
                </div>
                <div className="sentiment-item negative">
                  <span>Negative</span>
                  <span>{safeData.sentimentAnalysis.negativePercentage?.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="chart-large">
              <SentimentChart data={safeData.sentimentAnalysis} large={true} />
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="insights-tab">
            <div className="insights-section">
              <h3>AI-Generated Summary</h3>
              <div className="insight-content">
                {safeData.llmSummary}
              </div>
            </div>

            <div className="insights-section">
              <h3>Business Insights</h3>
              <div className="insight-content">
                {safeData.businessInsights}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-tab">
            <PostsList posts={safeData.analyzedPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
