import { EmailService } from '../services/emailService';
import * as nodemailer from 'nodemailer';
import { jest } from '@jest/globals';

describe('EmailService', () => {
  let emailService: EmailService;
  let mockSendMail: jest.Mock;
  let mockVerify: jest.Mock;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create mocks
    mockSendMail = jest.fn().mockImplementation(() => Promise.resolve({ messageId: 'test-message-id' }));
    mockVerify = jest.fn().mockImplementation((...args: any[]) => {
      const callback = args[0];
      if (typeof callback === 'function') callback(null, true);
    });

    // Mock createTransport
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
      verify: mockVerify
    });

    // Reset environment variables
    process.env.SMTP_FROM = 'test@example.com';
    process.env.APP_URL = 'http://test.com';

    // Get instance of EmailService
    emailService = EmailService.getInstance();
  });

  afterEach(() => {
    // Reset the singleton instance after each test
    (EmailService as any).instance = null;
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = EmailService.getInstance();
      const instance2 = EmailService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Email Templates', () => {
    it('should send confirmation email with correct template', async () => {
      await emailService.sendConfirmationEmail('user@example.com', 'John', 'token123');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const callArgs = mockSendMail.mock.calls[0][0] as nodemailer.SendMailOptions;
      expect(callArgs.to).toBe('user@example.com');
      expect(callArgs.subject).toContain('Confirm');
      expect(callArgs.html).toContain('John');
      expect(callArgs.html).toContain('token123');
    });

    it('should send demo request email with correct template', async () => {
      await emailService.sendDemoRequestEmail('user@example.com', 'John');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const callArgs = mockSendMail.mock.calls[0][0] as nodemailer.SendMailOptions;
      expect(callArgs.to).toBe('user@example.com');
      expect(callArgs.subject).toContain('Demo');
      expect(callArgs.html).toContain('John');
      expect(callArgs.html).toContain('What\'s next?');
    });

    it('should send welcome email with correct template', async () => {
      await emailService.sendWelcomeEmail('user@example.com', 'John');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const callArgs = mockSendMail.mock.calls[0][0] as nodemailer.SendMailOptions;
      expect(callArgs.to).toBe('user@example.com');
      expect(callArgs.subject).toContain('Welcome');
      expect(callArgs.html).toContain('Getting Started');
    });

    it('should send newsletter email with correct template and content', async () => {
      const content = 'Test newsletter content';
      await emailService.sendNewsletterEmail('user@example.com', 'John', content);

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const callArgs = mockSendMail.mock.calls[0][0] as nodemailer.SendMailOptions;
      expect(callArgs.to).toBe('user@example.com');
      expect(callArgs.subject).toContain('Newsletter');
      expect(callArgs.html).toContain(content);
      expect(callArgs.html).toContain('unsubscribe');
    });

    it('should send password reset email with correct template', async () => {
      await emailService.sendPasswordResetEmail('user@example.com', 'John', 'reset123');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const callArgs = mockSendMail.mock.calls[0][0] as nodemailer.SendMailOptions;
      expect(callArgs.to).toBe('user@example.com');
      expect(callArgs.subject).toContain('Reset');
      expect(callArgs.html).toContain('reset123');
    });
  });

  describe('Error Handling and Retries', () => {
    it('should retry sending email on failure', async () => {
      mockSendMail
        .mockImplementationOnce(() => Promise.reject(new Error('SMTP error')))
        .mockImplementationOnce(() => Promise.reject(new Error('SMTP error')))
        .mockImplementationOnce(() => Promise.resolve({ messageId: 'test-message-id' }));

      await emailService.sendConfirmationEmail('user@example.com', 'John', 'token123');

      expect(mockSendMail).toHaveBeenCalledTimes(3);
    });

    it('should throw error after max retries', async () => {
      mockSendMail.mockImplementation(() => Promise.reject(new Error('SMTP error')));

      await expect(
        emailService.sendConfirmationEmail('user@example.com', 'John', 'token123')
      ).rejects.toThrow('Failed to send email after multiple attempts');

      expect(mockSendMail).toHaveBeenCalledTimes(3);
    });
  });

  describe('SMTP Configuration', () => {
    it('should use correct SMTP configuration', () => {
      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: expect.any(Object),
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
      });
    });

    it('should handle SMTP verification failure', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Reset the singleton to test initialization with failing verification
      (EmailService as any).instance = null;
      
      // Setup mock to fail verification
      mockVerify.mockImplementation((...args: any[]) => {
        const callback = args[0];
        if (typeof callback === 'function') callback(new Error('SMTP verification failed'));
      });
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: mockSendMail,
        verify: mockVerify
      });

      EmailService.getInstance();

      expect(consoleSpy).toHaveBeenCalledWith(
        'SMTP Connection Error:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
}); 