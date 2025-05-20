import { CronJob } from 'cron';
import { WaitlistService } from './waitlistService.js';

export class CronService {
  private static instance: CronService;
  private waitlistService: WaitlistService;
  private cleanupJob: CronJob;

  private constructor() {
    this.waitlistService = WaitlistService.getInstance();
    
    // Run cleanup job every hour
    this.cleanupJob = new CronJob('0 * * * *', async () => {
      try {
        console.log('[CronService] Starting expired entries cleanup...');
        await this.waitlistService.cleanupExpiredEntries();
        console.log('[CronService] Cleanup completed successfully');
      } catch (error) {
        console.error('[CronService] Cleanup failed:', error);
      }
    });
  }

  static getInstance(): CronService {
    if (!CronService.instance) {
      CronService.instance = new CronService();
    }
    return CronService.instance;
  }

  startJobs(): void {
    this.cleanupJob.start();
    console.log('[CronService] Started cleanup job');
  }

  stopJobs(): void {
    this.cleanupJob.stop();
    console.log('[CronService] Stopped cleanup job');
  }
} 