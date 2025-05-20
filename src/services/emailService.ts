import nodemailer from 'nodemailer';

// Define email template types
type EmailTemplateType = 'confirmation' | 'demo' | 'welcome' | 'newsletter' | 'passwordReset' | 'waitlistWelcome';

// Define template data interface
interface TemplateData {
  name: string;
  confirmationUrl?: string;
  newsletterContent?: string;
  resetPasswordUrl?: string;
  customContent?: Record<string, string>;
  learnMoreUrl?: string;
}

export class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;
  private readonly styles = {
    container: 'font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;',
    header: 'background-color: #6366f1; color: white; padding: 30px; text-align: center; border-radius: 8px;',
    heading: 'margin: 0; font-size: 28px; font-weight: bold;',
    content: 'background-color: white; padding: 30px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
    button: 'background-color: #6366f1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold;',
    footer: 'text-align: center; margin-top: 20px; color: #666; font-size: 14px;',
    list: 'margin: 20px 0; padding-left: 20px;',
    highlight: 'background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 10px 0;',
    listItem: 'margin: 10px 0; padding-left: 25px; position: relative;',
    emoji: 'position: absolute; left: 0; top: 50%; transform: translateY(-50%);',
    benefitsList: 'margin: 20px 0; padding-left: 0; list-style: none;',
    benefitItem: 'margin: 10px 0; padding-left: 25px; position: relative; color: #4B5563;'
  };

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Verify connection configuration
    this.transporter.verify((error) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Connection Successfully Established');
      }
    });
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private getEmailTemplate(type: EmailTemplateType, data: TemplateData): string {
    const baseTemplate = `
      <div style="${this.styles.container}">
        <div style="${this.styles.header}">
          <h1 style="${this.styles.heading}">${this.getTemplateHeader(type)}</h1>
        </div>
        <div style="${this.styles.content}">
          ${this.getTemplateContent(type, data)}
        </div>
        <div style="${this.styles.footer}">
          <p>© ${new Date().getFullYear()} LeadChoose. All rights reserved.</p>
          <p>Questions? Contact us at support@leadchoose.com</p>
          ${this.getUnsubscribeLink(type)}
        </div>
      </div>
    `;

    if (type === 'waitlistWelcome') {
      return `
        <div style="${this.styles.container}">
          <div style="${this.styles.header}">
            <h1 style="${this.styles.heading}">🎉 You're In! Welcome to the LeadFlow Waitlist</h1>
          </div>
          <div style="${this.styles.content}">
            <h2 style="${this.styles.emoji} color: #4B5563; margin-bottom: 20px;">Thanks for Joining LeadFlow – Your Smart Lead Assistant is Almost Here</h2>
            
            <p>Hi ${data.name},</p>
            
            <p>Thanks for signing up! You're now officially on the LeadFlow waitlist 🚀</p>
            
            <p>We're building something powerful for real estate pros like you — a smart, AI-powered platform that automates lead nurturing across Email, SMS, and Voice so you can focus on what truly matters: closing deals.</p>
            
            <div style="${this.styles.highlight}">
              <p style="${this.styles.emoji} font-weight: bold; margin-bottom: 15px;">As a waitlist member, here's what you'll get:</p>
              <ul style="${this.styles.benefitsList}">
                <li style="${this.styles.benefitItem}">✅ Priority Access to our private beta</li>
                <li style="${this.styles.benefitItem}">🎁 FREE use of LeadFlow during the initial launch</li>
                <li style="${this.styles.benefitItem}">💸 50% Lifetime Discount as a founding user</li>
              </ul>
            </div>
            
            <p>We'll keep you updated as we approach launch — and you'll be the first to know when it's your turn to jump in.</p>
            
            <p>In the meantime, feel free to explore more about what LeadFlow can do:</p>
            <div style="text-align: center;">
              <a href="${data.learnMoreUrl || 'https://www.leadflow.com'}" style="${this.styles.button}">
                👉 Learn More About LeadFlow
              </a>
            </div>
            
            <p style="margin-top: 30px;">Have any questions? Just hit reply — we're here to help.</p>
            
            <p style="margin-top: 30px;">
              Excited to have you with us,<br>
              — The LeadFlow Team
            </p>
          </div>
          <div style="${this.styles.footer}">
            <p>© ${new Date().getFullYear()} LeadFlow. All rights reserved.</p>
            <p>Questions? Contact us at support@leadflow.com</p>
          </div>
        </div>
      `;
    }

    return baseTemplate;
  }

  private getTemplateHeader(type: EmailTemplateType): string {
    const headers = {
      confirmation: 'Welcome to LeadChoose!',
      demo: 'Thank You for Your Interest!',
      welcome: 'Welcome to the LeadChoose Family!',
      newsletter: 'LeadChoose Newsletter',
      passwordReset: 'Reset Your Password',
      waitlistWelcome: `🎉 You're In! Welcome to the LeadFlow Waitlist`
    };
    return headers[type];
  }

  private getTemplateContent(type: EmailTemplateType, data: TemplateData): string {
    switch (type) {
      case 'confirmation':
        return this.getConfirmationContent(data);
      case 'demo':
        return this.getDemoContent(data);
      case 'welcome':
        return this.getWelcomeContent(data);
      case 'newsletter':
        return this.getNewsletterContent(data);
      case 'passwordReset':
        return this.getPasswordResetContent(data);
      case 'waitlistWelcome':
        return this.getWaitlistWelcomeContent(data);
      default:
        return '';
    }
  }

  private getConfirmationContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      <p>Thank you for joining our waitlist! We're excited to have you on board.</p>
      <p>LeadChoose is revolutionizing how real estate agents handle leads with AI-powered automation.</p>
      <p>Please confirm your email address to secure your spot:</p>
      <div style="text-align: center;">
        <a href="${data.confirmationUrl}" style="${this.styles.button}">Confirm Email</a>
      </div>
      <p style="margin-top: 30px;">Or copy and paste this link into your browser:</p>
      <p style="color: #6366f1;">${data.confirmationUrl}</p>
    `;
  }

  private getDemoContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      <p>Thank you for requesting a demo of LeadChoose. We're thrilled to show you how our AI-powered platform can transform your lead management process.</p>
      <div style="${this.styles.highlight}">
        <h3>What's next?</h3>
        <ul style="${this.styles.list}">
          <li>Our team will review your request</li>
          <li>We'll reach out within 24 hours to schedule your personalized demo</li>
          <li>You'll get a sneak peek at our latest features</li>
        </ul>
      </div>
    `;
  }

  private getWelcomeContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      <p>Welcome to LeadChoose! We're thrilled to have you join our community of successful real estate professionals.</p>
      <div style="${this.styles.highlight}">
        <h3>Getting Started</h3>
        <ul style="${this.styles.list}">
          <li>Complete your profile setup</li>
          <li>Import your first leads</li>
          <li>Explore our AI-powered features</li>
        </ul>
      </div>
    `;
  }

  private getNewsletterContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      ${data.newsletterContent || ''}
      <div style="${this.styles.highlight}">
        <p>Stay tuned for more updates and tips on maximizing your real estate success!</p>
      </div>
    `;
  }

  private getPasswordResetContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <div style="text-align: center;">
        <a href="${data.resetPasswordUrl}" style="${this.styles.button}">Reset Password</a>
      </div>
      <p style="margin-top: 30px;">Or copy and paste this link into your browser:</p>
      <p style="color: #6366f1;">${data.resetPasswordUrl}</p>
      <p style="${this.styles.highlight}">If you didn't request this change, please ignore this email or contact support.</p>
    `;
  }

  private getWaitlistWelcomeContent(data: TemplateData): string {
    return `
      <p>Hi ${data.name},</p>
      <p>Thanks for signing up! You're now officially on the LeadFlow waitlist 🚀</p>
      <p>We're building something powerful for real estate pros like you — a smart, AI-powered platform that automates lead nurturing across Email, SMS, and Voice so you can focus on what truly matters: closing deals.</p>
      <div style="${this.styles.highlight}">
        <p style="font-weight: bold; margin-bottom: 15px;">As a waitlist member, here's what you'll get:</p>
        <ul style="${this.styles.benefitsList}">
          <li style="${this.styles.benefitItem}">✅ Priority Access to our private beta</li>
          <li style="${this.styles.benefitItem}">🎁 FREE use of LeadFlow during the initial launch</li>
          <li style="${this.styles.benefitItem}">💸 50% Lifetime Discount as a founding user</li>
        </ul>
      </div>
      <p>We'll keep you updated as we approach launch — and you'll be the first to know when it's your turn to jump in.</p>
      <p>In the meantime, feel free to explore more about what LeadFlow can do:</p>
      <div style="text-align: center;">
        <a href="${data.learnMoreUrl || 'https://www.leadflow.com'}" style="${this.styles.button}">
          👉 Learn More About LeadFlow
        </a>
      </div>
      <p style="margin-top: 30px;">Have any questions? Just hit reply — we're here to help.</p>
      <p style="margin-top: 30px;">
        Excited to have you with us,<br>
        — The LeadFlow Team
      </p>
    `;
  }

  private getUnsubscribeLink(type: EmailTemplateType): string {
    return type === 'newsletter' 
      ? '<p><small><a href="{unsubscribe_url}" style="color: #666;">Unsubscribe</a></small></p>'
      : '';
  }

  // Enhanced email sending method with retry logic and logging
  private async sendEmail(options: nodemailer.SendMailOptions, retries = 3): Promise<void> {
    try {
      const info = await this.transporter.sendMail(options);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      if (retries > 1) {
        console.log(`Retrying... ${retries - 1} attempts remaining`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        return this.sendEmail(options, retries - 1);
      }
      throw new Error('Failed to send email after multiple attempts');
    }
  }

  // Enhanced public methods with new template support
  async sendConfirmationEmail(email: string, name: string, confirmationToken: string): Promise<void> {
    const confirmationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/confirm?token=${confirmationToken}`;
    await this.sendEmail({
      from: process.env.SMTP_FROM || '"LeadChoose" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: 'Welcome to LeadChoose - Please Confirm Your Email',
      html: this.getEmailTemplate('confirmation', { name, confirmationUrl }),
    });
  }

  async sendDemoRequestEmail(email: string, name: string): Promise<void> {
    await this.sendEmail({
      from: process.env.SMTP_FROM || '"LeadChoose" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: 'LeadChoose Demo Request Received',
      html: this.getEmailTemplate('demo', { name }),
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.sendEmail({
      from: process.env.SMTP_FROM || '"LeadChoose" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: 'Welcome to LeadChoose!',
      html: this.getEmailTemplate('welcome', { name }),
    });
  }

  async sendNewsletterEmail(email: string, name: string, content: string): Promise<void> {
    await this.sendEmail({
      from: process.env.SMTP_FROM || '"LeadChoose" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: 'LeadChoose Newsletter',
      html: this.getEmailTemplate('newsletter', { name, newsletterContent: content }),
    });
  }

  async sendPasswordResetEmail(email: string, name: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    await this.sendEmail({
      from: process.env.SMTP_FROM || '"LeadChoose" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: 'Reset Your LeadChoose Password',
      html: this.getEmailTemplate('passwordReset', { name, resetPasswordUrl: resetUrl }),
    });
  }

  async sendWaitlistWelcomeEmail(email: string, name: string, learnMoreUrl?: string): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"LeadFlow" <ext.abid.hossain@bracu.ac.bd>',
      to: email,
      subject: "🎉 You're In! Welcome to the LeadFlow Waitlist",
      html: this.getEmailTemplate('waitlistWelcome', { name, learnMoreUrl }),
    };

    try {
      await this.sendEmail(mailOptions);
    } catch (error) {
      console.error('Error sending waitlist welcome email:', error);
      throw new Error('Failed to send waitlist welcome email');
    }
  }
} 