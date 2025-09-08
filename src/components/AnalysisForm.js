import React, { useState } from 'react';
import '../styles/AnalysisForm.css';

const AnalysisForm = ({ onAnalysis }) => {
  const [input, setInput] = useState('');
  const [analysisType, setAnalysisType] = useState('subreddit');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSubmitting(true);
    await onAnalysis(input, analysisType);
    setIsSubmitting(false);
  };

  const getPlaceholder = () => {
    return analysisType === 'subreddit' 
      ? 'e.g., programming, GameDev, r/technology'
      : 'e.g., https://reddit.com/r/programming/comments/xyz123/...';
  };

  const getHelpText = () => {
    return analysisType === 'subreddit'
      ? 'Enter a subreddit name (with or without r/) or subreddit URL'
      : 'Enter the full URL of a Reddit thread/post';
  };

  return (
    <div className="analysis-form-container">
      <div className="form-header">
        <h2>Start Your Reddit Analysis</h2>
        <p>Analyze subreddits or specific threads to extract valuable insights</p>
      </div>

      <form onSubmit={handleSubmit} className="analysis-form">
        <div className="analysis-type-selector">
          <label className="radio-option">
            <input
              type="radio"
              value="subreddit"
              checked={analysisType === 'subreddit'}
              onChange={(e) => setAnalysisType(e.target.value)}
            />
            <span className="radio-text">
              <strong>Subreddit Analysis</strong>
              <small>Analyze posts from an entire subreddit</small>
            </span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              value="thread"
              checked={analysisType === 'thread'}
              onChange={(e) => setAnalysisType(e.target.value)}
            />
            <span className="radio-text">
              <strong>Thread Deep-Dive</strong>
              <small>Analyze a specific Reddit thread and comments</small>
            </span>
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="reddit-input">
            {analysisType === 'subreddit' ? 'Subreddit Name or URL' : 'Reddit Thread URL'}
          </label>
          <input
            id="reddit-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            required
            className="reddit-input"
          />
          <small className="help-text">{getHelpText()}</small>
        </div>

        <button 
          type="submit" 
          disabled={!input.trim() || isSubmitting}
          className="analyze-button"
        >
          {isSubmitting ? 'Starting Analysis...' : 'Analyze Reddit Data'}
        </button>
      </form>

      <div className="examples">
        <h3>Examples:</h3>
        <div className="example-links">
          <div className="example-category">
            <h4>Subreddits:</h4>
            <button onClick={() => setInput('programming')} className="example-button">programming</button>
            <button onClick={() => setInput('r/technology')} className="example-button">r/technology</button>
            <button onClick={() => setInput('GameDev')} className="example-button">GameDev</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalysisForm;