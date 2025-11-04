// src/application/use-cases/handle-contact-form.use-case.ts
import type { IEmailProvider, ContactFormData } from '@core/ports/email.port';
import type { ICRMProvider } from '@core/ports/crm.port';
import type { ILLMProvider } from '@core/ports/llm-port-interface';

export class HandleContactFormUseCase {
  constructor(
    private email: IEmailProvider,
    private crm: ICRMProvider | null,
    private llm: ILLMProvider
  ) {}

  async execute(data: ContactFormData): Promise<void> {
    // 1. Score lead
    const score = this.scoreLead(data);

    // 2. Generate AI response (for notification)
    const aiResponse = await this.generateResponse(data);

    // 3. Notify owner (only email that works in testing)
    await this.email.sendEmail(
      'drrclabx@gmail.com',
      `🔥 Nuevo contacto - ${data.name} (Score: ${score})`,
      this.buildOwnerNotification(data, score, aiResponse)
    );

    // 4. Save to CRM (if configured)
    if (this.crm) {
      try {
        await this.crm.createLead({
          ...data,
          source: 'website',
          score,
        });
      } catch (error) {
        console.error('CRM error (non-critical):', error);
        // Continue even if CRM fails
      }
    }
  }

  private scoreLead(data: ContactFormData): number {
    let score = 50;
    if (data.company) score += 20;
    if (data.message.length > 100) score += 15;
    if (/contratar|hiring|proyecto/i.test(data.message)) score += 15;
    return Math.min(score, 100);
  }

  private async generateResponse(data: ContactFormData): Promise<string> {
    const context = `Eres Douglas Rujana, Full Stack + AI Developer. 
${data.name} te contactó desde tu portfolio${data.company ? ` (trabaja en ${data.company})` : ''}.
Genera una respuesta profesional, breve y amigable. 
Agradece el contacto, confirma que responderás pronto, y menciona que pueden agendar una llamada si es urgente.
Máximo 3 párrafos cortos.`;

    const response = await this.llm.generateResponse(
      `Mensaje de ${data.name}: "${data.message}"`,
      [context],
      { maxTokens: 200, temperature: 0.7 }
    );
    
    return `<p>Hola ${data.name},</p>${response.content}<p>Saludos,<br>Douglas Rujana</p>`;
  }

  private buildOwnerNotification(data: ContactFormData, score: number, aiResponse: string): string {
    return `
      <h2>Nuevo Contacto</h2>
      <p><strong>Score:</strong> ${score}/100</p>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Empresa:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${data.message}</p>
      <hr>
      <h3>Respuesta sugerida (IA):</h3>
      ${aiResponse}
      <hr>
      <p><a href="mailto:${data.email}">Responder ahora</a></p>
    `;
  }
}
