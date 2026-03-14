import { ENV } from './ENV.js';
import type { Express } from 'express';

export async function startServer(app: Express) {
  try {
    const PORT = Number(ENV.PORT) || 3002;
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', (error as Error).message);
    process.exit(1);
  }
}
