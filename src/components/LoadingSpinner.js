import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">
        <h2>Analyzing Reddit Data...</h2>
        <p>This may take a few moments while we:</p>
        <ul>
          <li>Fetch Reddit posts and comments</li>
          <li>Process and analyze the content</li>
          <li>Generate AI-powered insights</li>
          <li>Prepare visualizations</li>
        </ul>
        <div className="progress-bar">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;