import { CronService } from '../services/cronService.js';

async function main() {
  try {
    console.log('Starting cleanup service...');
    const cronService = CronService.getInstance();
    cronService.startJobs();
    
    // Keep the process running
    process.on('SIGINT', () => {
      console.log('Stopping cleanup service...');
      cronService.stopJobs();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start cleanup service:', error);
    process.exit(1);
  }
}

main(); 