import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

export const getPrediction = async (factors: number[]) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/ai/predict`, { factors });
    return response.data;
  } catch (error) {
    console.error('AI Service Error:', error);
    return { prediction: 0.5, model: 'error_fallback', confidence: 0 };
  }
};
