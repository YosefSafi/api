import cron from 'node-cron';
import dotenv from 'dotenv';
import { runRetrainTask } from './tasks/retrainTask';

dotenv.config();

console.log('[Worker] Service started. Waiting for scheduled tasks...');

// Run retraining every 5 minutes
cron.schedule('*/5 * * * *', () => {
  runRetrainTask();
});

// Initial run
runRetrainTask();
