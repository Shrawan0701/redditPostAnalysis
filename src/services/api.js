import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for analysis
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeReddit = async (input, analysisType) => {
  try {
    const response = await api.post('/analyze-reddit', {
      input: input.trim(),
      analysisType: analysisType
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Network error
      throw new Error('Network error - please check your connection and ensure the backend is running');
    } else {
      // Other error
      throw new Error('An unexpected error occurred');
    }
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};

export default api;