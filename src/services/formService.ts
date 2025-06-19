import { WaitlistService } from './waitlistService.js';
import { EmailService } from './emailService.js';

interface FormData {
  email: string;
  name: string;
  company?: string;
  message?: string;
}

interface FormResponse {
  success: boolean;
  message: string;
  data?: FormData;
}

export class FormService {
  private static instance: FormService;
  private waitlistService: WaitlistService;
  private emailService: EmailService;

  private constructor() {
    this.waitlistService = WaitlistService.getInstance();
    this.emailService = EmailService.getInstance();
  }

  static getInstance(): FormService {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }
    return FormService.instance;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private processFormData(data: Partial<FormData>): FormData {
    return {
      email: data.email || '',
      name: data.name || data.email?.split('@')[0] || 'Anonymous',
      company: data.company,
      message: data.message
    };
  }

  async submitQuickForm(email: string): Promise<FormResponse> {
    try {
      if (!this.validateEmail(email)) {
        return {
          success: false,
          message: 'Invalid email address'
        };
      }

      const formData = this.processFormData({ email });
      let entry;
      try {
        entry = await this.waitlistService.createPendingEntry({
          email: formData.email,
          name: formData.name,
          company: 'Not provided'
        });
      } catch (err: any) {
        if (err.message === 'Email is already registered') {
          return {
            success: false,
            message: 'This email is already registered. Please check your inbox for the confirmation email.'
          };
        }
        console.error('[WaitlistService.createPendingEntry] Error:', err, { email: formData.email, name: formData.name });
        throw err;
      }

      try {
        await this.emailService.sendConfirmationEmail(
          formData.email,
          formData.name,
          entry.confirmation_token
        );
      } catch (err) {
        console.error('[EmailService.sendConfirmationEmail] Error:', err, { email: formData.email, name: formData.name, token: entry.confirmation_token });
        // Clean up the pending entry if email fails
        await this.waitlistService.cleanupExpiredEntries();
        throw err;
      }

      return {
        success: true,
        message: 'Please check your email to confirm your waitlist spot!',
        data: formData
      };
    } catch (error) {
      let errorMsg = error;
      if (typeof error === 'object' && error && 'stack' in error) {
        errorMsg = (error as any).stack;
      }
      console.error('[FormService.submitQuickForm] Error:', errorMsg);
      return {
        success: false,
        message: 'Failed to submit form. Please try again.'
      };
    }
  }

  async submitDetailedForm(data: FormData): Promise<FormResponse> {
    try {
      if (!this.validateEmail(data.email)) {
        return {
          success: false,
          message: 'Invalid email address'
        };
      }

      const formData = this.processFormData(data);
      let entry;
      try {
        entry = await this.waitlistService.createPendingEntry({
          email: formData.email,
          name: formData.name,
          company: formData.company
        });
      } catch (err: any) {
        if (err.message === 'Email is already registered') {
          return {
            success: false,
            message: 'This email is already registered. Please check your inbox for the confirmation email.'
          };
        }
        console.error('[WaitlistService.createPendingEntry] Error:', err, { email: formData.email, name: formData.name });
        throw err;
      }

      try {
        await this.emailService.sendConfirmationEmail(
          formData.email,
          formData.name,
          entry.confirmation_token
        );
        // Send notification to mateusz@leadchoose.com
        await this.emailService.sendEmail({
          from: process.env.SMTP_FROM || 'LeadChoose <ext.abid.hossain@bracu.ac.bd>',
          to: 'mateusz@leadchoose.com',
          subject: 'New Request Demo Submission',
          html: `<h2>New Request Demo Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Company:</strong> ${formData.company || 'N/A'}</p>
            <p><strong>Message:</strong> ${formData.message || 'N/A'}</p>`
        });
      } catch (err) {
        console.error('[EmailService.sendConfirmationEmail] Error:', err, { email: formData.email, name: formData.name, token: entry.confirmation_token });
        // Clean up the pending entry if email fails
        await this.waitlistService.cleanupExpiredEntries();
        throw err;
      }

      return {
        success: true,
        message: 'Please check your email to confirm your waitlist spot!',
        data: formData
      };
    } catch (error) {
      let errorMsg = error;
      if (typeof error === 'object' && error && 'stack' in error) {
        errorMsg = (error as any).stack;
      }
      console.error('[FormService.submitDetailedForm] Error:', errorMsg);
      return {
        success: false,
        message: 'Failed to submit form. Please try again.'
      };
    }
  }
} 