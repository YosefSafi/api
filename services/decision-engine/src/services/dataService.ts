import axios from 'axios';

const DATA_AGGREGATOR_URL = process.env.DATA_AGGREGATOR_URL || 'http://localhost:3003';

export const fetchAggregatedData = async () => {
  try {
    const response = await axios.get(`${DATA_AGGREGATOR_URL}/aggregate`);
    return response.data;
  } catch (error) {
    console.error('Data Aggregator Error:', error);
    return { summary: 0.5, market: { trend: 0.5 }, weather: { score: 0.5 } };
  }
};
