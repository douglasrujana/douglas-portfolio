// src/infrastructure/bots/telegram-bot.ts
import { MessagingFactory } from '@infrastructure/adapters/messaging/messaging-factory';
import { LLMFactory } from '@infrastructure/adapters/llm/llm-factory';
import { HandleTelegramMessageUseCase } from '@application/use-cases/handle-telegram-message.use-case';
import { env } from '@infrastructure/config/env';
import type { IncomingMessage } from '@core/ports/messaging.port';

/**
 * Inicializa y configura el bot de Telegram
 * 
 * Este es el punto de entrada principal para el bot.
 * Conecta todos los componentes siguiendo arquitectura hexagonal.
 */
export class TelegramBotService {
  private messaging;
  private llm;
  private handleMessageUseCase;

  constructor() {
    // Validar que el token existe
    if (!env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured in .env');
    }

    // Crear adapters
    this.messaging = MessagingFactory.create('telegram', {
      token: env.TELEGRAM_BOT_TOKEN,
      polling: true,
    });

    this.llm = LLMFactory.create('gemini', {
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_CHAT_MODEL,
    });

    // Crear use case
    this.handleMessageUseCase = new HandleTelegramMessageUseCase(this.messaging, this.llm);

    // Configurar comandos y handlers
    this.setupCommands();
    this.setupMessageHandler();
  }

  /**
   * Configura los comandos del bot
   */
  private setupCommands(): void {
    const calendlyUrl = env.CALENDLY_URL || 'https://calendly.com/douglas/30min';
    
    // Comando /start
    this.messaging.onCommand('start', async (message: IncomingMessage) => {
      await this.messaging.sendMessage(
        message.chatId,
        `👋 *¡Hola ${message.userName || 'amigo'}!*

Soy el asistente de *Douglas Rujana*

*Full Stack + AI Developer*
5+ años de experiencia

*Comandos disponibles:*
/cv - Ver curriculum completo
/projects - Proyectos destacados
/skills - Stack técnico
/schedule - Agendar llamada
/contact - Información de contacto
/help - Ver esta ayuda

O simplemente escribe tu pregunta y te responderé con IA 🤖`,
        {
          parseMode: 'Markdown',
          inlineKeyboard: [
            [
              { text: '📄 Ver CV', callbackData: 'cv' },
              { text: '🚀 Proyectos', callbackData: 'projects' },
            ],
            [
              { text: '📅 Agendar Llamada', url: calendlyUrl },
            ],
          ],
        }
      );
    });

    // Comando /help
    this.messaging.onCommand('help', async (message: IncomingMessage) => {
      await this.messaging.sendMessage(
        message.chatId,
        `🤖 *Ayuda - Bot de Douglas Rujana*

*Comandos:*
/start - Mensaje de bienvenida
/cv - Ver curriculum
/projects - Ver proyectos
/skills - Stack técnico
/schedule - Agendar llamada
/contact - Contacto directo

*Uso:*
• Usa los comandos para acceso rápido
• O escribe cualquier pregunta en lenguaje natural
• El bot usa IA para responder contextualmente

*Ejemplos:*
"¿Cuántos años de experiencia tienes?"
"¿Trabajas con React?"
"¿Estás disponible para freelance?"

¿En qué puedo ayudarte?`,
        { parseMode: 'Markdown' }
      );
    });

    // Comando /cv
    this.messaging.onCommand('cv', async (message: IncomingMessage) => {
      await this.handleMessageUseCase.execute({
        ...message,
        text: 'quiero ver tu cv',
      });
    });

    // Comando /projects
    this.messaging.onCommand('projects', async (message: IncomingMessage) => {
      await this.handleMessageUseCase.execute({
        ...message,
        text: 'muéstrame tus proyectos',
      });
    });

    // Comando /skills
    this.messaging.onCommand('skills', async (message: IncomingMessage) => {
      await this.handleMessageUseCase.execute({
        ...message,
        text: 'cuáles son tus habilidades técnicas',
      });
    });

    // Comando /schedule
    this.messaging.onCommand('schedule', async (message: IncomingMessage) => {
      await this.handleMessageUseCase.execute({
        ...message,
        text: 'quiero agendar una llamada',
      });
    });

    // Comando /contact
    this.messaging.onCommand('contact', async (message: IncomingMessage) => {
      const calendlyUrl = env.CALENDLY_URL || 'https://calendly.com/douglas/30min';
      
      await this.messaging.sendMessage(
        message.chatId,
        `📧 *Contacto Directo*

*Douglas Rujana*
Full Stack + AI Developer

📧 Email: douglas@example.com
💼 LinkedIn: linkedin.com/in/douglasrujana
🐙 GitHub: github.com/douglasrujana
🌐 Portfolio: douglasrujana.com
📅 Calendly: ${calendlyUrl}

*Ubicación:* Ecuador 🇪🇨
*Zona Horaria:* GMT-5 (ECT)

*Disponibilidad:*
✅ Proyectos freelance
✅ Posiciones full-time remotas
✅ Consultoría técnica

¿Prefieres agendar una llamada?`,
        {
          parseMode: 'Markdown',
          inlineKeyboard: [
            [
              { text: '📅 Agendar Llamada', url: calendlyUrl },
              { text: '📧 Enviar Email', url: 'mailto:douglas@example.com' },
            ],
            [{ text: '💼 Ver LinkedIn', url: 'https://linkedin.com/in/douglasrujana' }],
          ],
        }
      );
    });
  }

  /**
   * Configura el handler para mensajes generales
   */
  private setupMessageHandler(): void {
    this.messaging.onMessage(async (message: IncomingMessage) => {
      console.log(`📨 Message from ${message.userName} (@${message.userUsername}): ${message.text}`);
      await this.handleMessageUseCase.execute(message);
    });
  }

  /**
   * Inicia el bot
   */
  async start(): Promise<void> {
    try {
      await this.messaging.start();
      console.log('✅ Telegram bot is running!');
      console.log('📱 Users can find it at: t.me/YOUR_BOT_USERNAME');
      console.log('💬 Waiting for messages...');
    } catch (error) {
      console.error('❌ Failed to start Telegram bot:', error);
      throw error;
    }
  }

  /**
   * Detiene el bot
   */
  async stop(): Promise<void> {
    await this.messaging.stop();
    console.log('🛑 Telegram bot stopped');
  }
}

/**
 * Función helper para iniciar el bot
 */
export async function startTelegramBot(): Promise<TelegramBotService> {
  const bot = new TelegramBotService();
  await bot.start();
  return bot;
}
