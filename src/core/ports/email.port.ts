// src/core/ports/email.port.ts
export interface IEmailProvider {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}
