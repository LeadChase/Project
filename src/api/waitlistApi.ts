import express, { Request, Response, Router, RequestHandler } from 'express';
import { FormService } from '../services/formService.js';
import { WaitlistService } from '../services/waitlistService.js';
import { EmailService } from '../services/emailService.js';

const router: Router = express.Router();
const formService = FormService.getInstance();
const waitlistService = WaitlistService.getInstance();
const emailService = EmailService.getInstance();

interface QuickFormRequest {
  email: string;
}

interface DetailedFormRequest {
  email: string;
  name: string;
  company?: string;
  message?: string;
}

interface ConfirmQueryParams {
  token?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

type ConfirmHandler = RequestHandler<{}, ApiResponse, {}, ConfirmQueryParams>;

// Test email endpoint
router.post('/test-email', async (_req: Request, res: Response) => {
  try {
    const testEmail = 'ext.abid.hossain@bracu.ac.bd';
    await emailService.sendConfirmationEmail(
      testEmail,
      'Test User',
      'test-token-123'
    );
    
    res.json({
      success: true,
      message: `Test email sent to ${testEmail}. Please check your inbox.`
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to send test email: ${error.message || 'Unknown error'}`
    });
  }
});

// Quick form submission (email only)
router.post('/join', async (req: Request<{}, {}, QuickFormRequest>, res: Response<ApiResponse>) => {
  try {
    const { email } = req.body;
    const result = await formService.submitQuickForm(email);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Detailed form submission (Request a Demo)
router.post('/request-demo', async (req: Request<{}, {}, DetailedFormRequest>, res: Response<ApiResponse>) => {
  try {
    const { email, name, company, message } = req.body;
    const result = await formService.submitDetailedForm({
      email,
      name,
      company,
      message
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Email confirmation endpoint
const confirmHandler: ConfirmHandler = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token || typeof token !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid confirmation token'
      });
      return;
    }

    const confirmedEntry = await waitlistService.confirmEntry(token);

    if (confirmedEntry) {
      // Send welcome email after successful confirmation
      try {
        await emailService.sendWaitlistWelcomeEmail(
          confirmedEntry.email,
          confirmedEntry.name
        );
      } catch (err) {
        console.error('Failed to send welcome email:', err);
        // Don't fail the confirmation if welcome email fails
      }

      res.json({
        success: true,
        message: 'Email confirmed successfully! Welcome to LeadChoose.'
      });
      return;
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired confirmation token. Please sign up again.'
      });
      return;
    }
  } catch (error) {
    console.error('Email confirmation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
    return;
  }
};

router.get('/confirm', confirmHandler);

// Cleanup expired entries (can be called by a cron job)
router.post('/cleanup', async (_req: Request, res: Response<ApiResponse>) => {
  try {
    await waitlistService.cleanupExpiredEntries();
    res.json({
      success: true,
      message: 'Successfully cleaned up expired entries'
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clean up expired entries'
    });
  }
});

export default router; 