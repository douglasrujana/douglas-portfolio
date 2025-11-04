// src/infrastructure/adapters/email/resend-adapter.ts
import type { IEmailProvider } from '@core/ports/email.port';

export class ResendAdapter implements IEmailProvider {
  constructor(private apiKey: string) {}

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      throw new Error(`Email failed: ${response.statusText}`);
    }
  }
}
