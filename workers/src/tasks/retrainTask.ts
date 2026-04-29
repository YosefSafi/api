import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

export const runRetrainTask = async () => {
  console.log('[Worker] Starting model retraining task...');
  
  // Dummy training data
  const trainingData = {
    X: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9], [0.2, 0.4, 0.1]],
    y: [0.3, 0.6, 0.9, 0.35]
  };

  try {
    const response = await axios.post(`${AI_SERVICE_URL}/ai/train`, trainingData);
    console.log('[Worker] Retraining complete:', response.data.message);
  } catch (error) {
    console.error('[Worker] Retraining failed:', error);
  }
};
