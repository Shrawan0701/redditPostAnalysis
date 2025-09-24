import React, { useState } from 'react';
import './styles/App.css';
import AnalysisForm from './components/AnalysisForm';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeReddit } from './services/api';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleAnalysis = async (input, analysisType) => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);
    setShowForm(false);

    try {
      const result = await analyzeReddit(input, analysisType);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      setShowForm(true); // Show form again on error
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setShowForm(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Analyze Subreddits</h1>
        <p>Transform Reddit data into actionable insights with AI-powered analysis</p>
      </header>

      <main className="App-main">
        {showForm && !loading && (
          <AnalysisForm onAnalysis={handleAnalysis} />
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-container">
            <h2>Analysis Error</h2>
            <p>{error}</p>
            <button onClick={handleReset} className="reset-button">
              Try Again
            </button>
          </div>
        )}

        {analysisResult && !loading && (
          <Dashboard data={analysisResult} onReset={handleReset} />
        )}
      </main>


    </div>
  );
}

export default App;
