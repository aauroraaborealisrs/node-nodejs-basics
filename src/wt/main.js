import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const workerPath = join(__dirname, 'worker.js');
    const cpuCount = cpus().length;
    const results = [];
  
    const createWorker = (index) => {
      return new Promise((resolve) => {
        const worker = new Worker(workerPath, { workerData: { num: 10 + index } });
  
        worker.on('message', (data) => {
          results[index] = { status: 'resolved', data };
          resolve();
        });
  
        worker.on('error', () => {
          results[index] = { status: 'error', data: null };
          resolve();
        });
      });
    };
  
    const workerPromises = Array.from({ length: cpuCount }, (_, index) => createWorker(index));
    await Promise.all(workerPromises);
  
    console.log(results);
};

await performCalculations();