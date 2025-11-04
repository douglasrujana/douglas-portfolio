// src/application/use-cases/handle-telegram-message.use-case.ts
import type { IMessagingProvider, IncomingMessage } from '@core/ports/messaging.port';
import type { ILLMProvider } from '@core/ports/llm-port-interface';
import { env } from '@infrastructure/config/env';

/**
 * Use Case: Maneja mensajes entrantes de Telegram
 * 
 * Responsabilidades:
 * - Detectar intención del usuario
 * - Generar respuesta contextual con IA
 * - Enviar recursos (CV, proyectos)
 * - Registrar leads
 */
export class HandleTelegramMessageUseCase {
  constructor(
    private messaging: IMessagingProvider,
    private llm: ILLMProvider
  ) {}

  async execute(message: IncomingMessage): Promise<void> {
    try {
      // 1. Detectar intención
      const intent = this.detectIntent(message.text);

      // 2. Generar respuesta según intención
      switch (intent) {
        case 'cv':
          await this.handleCVRequest(message);
          break;

        case 'projects':
          await this.handleProjectsRequest(message);
          break;

        case 'schedule':
          await this.handleScheduleRequest(message);
          break;

        case 'skills':
          await this.handleSkillsRequest(message);
          break;

        default:
          await this.handleGeneralMessage(message);
      }

      // 3. Log del lead (opcional)
      this.logLead(message, intent);
    } catch (error) {
      console.error('Error handling message:', error);
      await this.messaging.sendMessage(
        message.chatId,
        '❌ Disculpa, hubo un error. Por favor intenta de nuevo.'
      );
    }
  }

  /**
   * Detecta la intención del usuario
   */
  private detectIntent(text: string): string {
    const lower = text.toLowerCase();

    if (lower.includes('cv') || lower.includes('curriculum') || lower.includes('resume')) {
      return 'cv';
    }

    if (lower.includes('proyecto') || lower.includes('portfolio') || lower.includes('trabajo')) {
      return 'projects';
    }

    if (
      lower.includes('llamada') ||
      lower.includes('reunión') ||
      lower.includes('meeting') ||
      lower.includes('agendar')
    ) {
      return 'schedule';
    }

    if (
      lower.includes('skill') ||
      lower.includes('tecnología') ||
      lower.includes('stack') ||
      lower.includes('experiencia')
    ) {
      return 'skills';
    }

    return 'general';
  }

  /**
   * Maneja solicitud de CV
   */
  private async handleCVRequest(message: IncomingMessage): Promise<void> {
    await this.messaging.sendMessage(
      message.chatId,
      `📄 *CV de Douglas Rujana*

*Full Stack + AI Developer*
5+ años de experiencia

*Highlights:*
✅ Arquitectura Hexagonal & Clean Code
✅ TypeScript, Node.js, Laravel, Python
✅ IA Integration (Gemini, OpenAI)
✅ Cloud-native (AWS, Docker, K8s)
✅ DevOps & CI/CD${env.CV_PDF_URL ? '\n\nTe envío el PDF completo...' : ''}`,
      { parseMode: 'Markdown' }
    );

    // Enviar PDF del CV solo si la URL está configurada
    if (env.CV_PDF_URL) {
      try {
        await this.messaging.sendDocument(message.chatId, env.CV_PDF_URL, '📄 CV completo de Douglas Rujana');
      } catch (error) {
        console.error('Error sending CV PDF:', error);
        await this.messaging.sendMessage(
          message.chatId,
          '⚠️ No pude enviar el PDF. Puedes verlo en: /contact'
        );
      }
    }

    // Ofrecer siguiente paso
    const calendlyUrl = env.CALENDLY_URL || 'https://calendly.com/douglas/30min';
    await this.messaging.sendMessage(
      message.chatId,
      '¿Te gustaría ver proyectos destacados o agendar una llamada?',
      {
        inlineKeyboard: [
          [
            { text: '🚀 Ver Proyectos', callbackData: 'projects' },
            { text: '📅 Agendar Llamada', url: calendlyUrl },
          ],
        ],
      }
    );
  }

  /**
   * Maneja solicitud de proyectos
   */
  private async handleProjectsRequest(message: IncomingMessage): Promise<void> {
    await this.messaging.sendMessage(
      message.chatId,
      `🚀 *Proyectos Destacados*

*1. AI Chat System*
• Gemini + Astro + Svelte
• Real-time streaming
• Context-aware responses
• Rate limiting built-in
🔗 [Ver demo](https://douglasrujana.com)

*2. Blog Platform con IA*
• MDX + Cross-posting automation
• SEO optimized
• ATS-friendly CV integration
🔗 [Ver blog](https://douglasrujana.com/blog)

*3. E-commerce Laravel*
• Arquitectura hexagonal
• Microservices migration
• 15+ deployments exitosos
🔗 [Case study](https://douglasrujana.com/projects)

*4. Este Bot de Telegram*
• Arquitectura limpia
• Multi-provider ready
• IA integration
🔗 [Ver código](https://github.com/douglasrujana)`,
      { parseMode: 'Markdown' }
    );
  }

  /**
   * Maneja solicitud de agendar
   */
  private async handleScheduleRequest(message: IncomingMessage): Promise<void> {
    await this.messaging.sendMessage(
      message.chatId,
      `📅 *Agendar una Llamada*

Perfecto! Puedes agendar una llamada de 30 minutos para:
• Discutir oportunidades laborales
• Revisar proyectos en detalle
• Consultoría técnica
• Colaboraciones

Elige un horario que te convenga:`,
      {
        parseMode: 'Markdown',
        inlineKeyboard: [
          [{ text: '📅 Ver Disponibilidad', url: env.CALENDLY_URL || 'https://calendly.com/douglas/30min' }],
          [{ text: '📧 Enviar Email', url: 'mailto:douglas@example.com' }],
        ],
      }
    );
  }

  /**
   * Maneja solicitud de skills
   */
  private async handleSkillsRequest(message: IncomingMessage): Promise<void> {
    await this.messaging.sendMessage(
      message.chatId,
      `💻 *Stack Técnico*

*Backend:*
• Node.js, TypeScript, Laravel, Python
• Arquitectura Hexagonal, DDD, SOLID
• REST APIs, GraphQL, gRPC

*Frontend:*
• Astro, Svelte, React
• Tailwind CSS, CSS-in-JS
• SSR, SSG, SPA

*IA & ML:*
• Gemini AI, OpenAI, Claude
• LangChain, Vector DBs
• Prompt Engineering

*DevOps & Cloud:*
• Docker, Kubernetes
• AWS, Vercel, Cloudflare
• CI/CD (GitHub Actions)

*Databases:*
• PostgreSQL, MySQL, MongoDB
• Redis, Elasticsearch

¿Quieres saber más sobre alguna tecnología específica?`,
      { parseMode: 'Markdown' }
    );
  }

  /**
   * Maneja mensajes generales con IA
   */
  private async handleGeneralMessage(message: IncomingMessage): Promise<void> {
    const context = `Eres el asistente personal de Douglas Rujana, un Full Stack + AI Developer con 5+ años de experiencia.

Información clave:
- Especialista en Arquitectura Hexagonal y Clean Code
- Experto en TypeScript, Node.js, Laravel, Python
- Integración de IA (Gemini, OpenAI)
- DevOps y Cloud-native (AWS, Docker, K8s)
- Portfolio: https://douglasrujana.com

Responde de manera profesional, concisa y amigable en español.
Si preguntan por disponibilidad, menciona que está abierto a proyectos freelance y posiciones full-time remotas.
Si preguntan por rango salarial, di que depende del proyecto/posición y sugiere agendar una llamada.`;

    try {
      const response = await this.llm.generateResponse(message.text, [context], {
        temperature: 0.7,
        maxTokens: 500,
      });

      await this.messaging.sendMessage(message.chatId, response.content);

      // Si la conversación es prometedora, ofrecer siguiente paso
      if (this.isPromisingLead(message.text)) {
        await this.messaging.sendMessage(
          message.chatId,
          '¿Te gustaría ver el CV completo o agendar una llamada?',
          {
            inlineKeyboard: [
              [
                { text: '📄 Ver CV', callbackData: 'cv' },
                { text: '📅 Agendar', url: env.CALENDLY_URL || 'https://calendly.com/douglas/30min' },
              ],
            ],
          }
        );
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      await this.messaging.sendMessage(
        message.chatId,
        'Disculpa, estoy teniendo problemas para generar una respuesta. ¿Puedes reformular tu pregunta?'
      );
    }
  }

  /**
   * Determina si el lead es prometedor
   */
  private isPromisingLead(text: string): boolean {
    const lower = text.toLowerCase();
    const promisingKeywords = [
      'contratar',
      'hiring',
      'posición',
      'vacante',
      'proyecto',
      'freelance',
      'consultoría',
      'empresa',
      'startup',
      'equipo',
      'salario',
      'remoto',
    ];

    return promisingKeywords.some((keyword) => lower.includes(keyword));
  }

  /**
   * Registra el lead para análisis posterior
   */
  private logLead(message: IncomingMessage, intent: string): void {
    const lead = {
      timestamp: new Date().toISOString(),
      userId: message.userId,
      userName: message.userName,
      username: message.userUsername,
      message: message.text,
      intent,
      isPromising: this.isPromisingLead(message.text),
    };

    // TODO: Guardar en base de datos o Notion
    console.log('📊 New lead:', JSON.stringify(lead, null, 2));
  }
}
