import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getMarketTrends } from './services/marketService';
import { getWeatherData } from './services/weatherService';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/aggregate', async (req: Request, res: Response) => {
  try {
    const market = await getMarketTrends();
    const weather = await getWeatherData();

    res.status(200).json({
      market,
      weather,
      summary: (market.trend + weather.score) / 2
    });
  } catch (error) {
    res.status(500).json({ message: 'Aggregation failed', error });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'Data Aggregator' });
});

export default app;
