// src/infrastructure/adapters/messaging/telegram-adapter.ts
import TelegramBot from 'node-telegram-bot-api';
import type {
  IMessagingProvider,
  IncomingMessage,
  MessageOptions,
  MessageHandler,
  CommandHandler,
  MessagingError,
  MessagingErrorCode,
} from '@core/ports/messaging.port';

/**
 * Adapter de Telegram Bot API
 * Implementa IMessagingProvider usando node-telegram-bot-api
 */
export class TelegramAdapter implements IMessagingProvider {
  private bot: TelegramBot;
  private messageHandlers: MessageHandler[] = [];
  private commandHandlers: Map<string, CommandHandler> = new Map();
  private isRunning = false;

  constructor(token: string, options?: { polling?: boolean; webhook?: string }) {
    this.bot = new TelegramBot(token, {
      polling: options?.polling ?? true,
    });

    this.setupEventListeners();
  }

  /**
   * Configura los listeners de eventos del bot
   */
  private setupEventListeners(): void {
    // Listener para mensajes generales
    this.bot.on('message', async (msg) => {
      // Ignorar comandos (se manejan aparte)
      if (msg.text?.startsWith('/')) return;

      const incomingMessage = this.mapToIncomingMessage(msg);

      // Ejecutar todos los handlers registrados
      for (const handler of this.messageHandlers) {
        try {
          await handler(incomingMessage);
        } catch (error) {
          console.error('Error in message handler:', error);
        }
      }
    });

    // Listener para comandos
    this.bot.on('message', async (msg) => {
      if (!msg.text?.startsWith('/')) return;

      const commandMatch = msg.text.match(/^\/(\w+)/);
      if (!commandMatch || !commandMatch[1]) return;

      const command = commandMatch[1];
      const handler = this.commandHandlers.get(command);

      if (handler) {
        const incomingMessage = this.mapToIncomingMessage(msg);
        try {
          await handler(incomingMessage);
        } catch (error) {
          console.error(`Error in command handler (/${command}):`, error);
        }
      }
    });

    // Listener para errores
    this.bot.on('polling_error', (error) => {
      console.error('Telegram polling error:', error);
    });
  }

  /**
   * Mapea un mensaje de Telegram a nuestro formato estándar
   */
  private mapToIncomingMessage(msg: TelegramBot.Message): IncomingMessage {
    return {
      messageId: msg.message_id.toString(),
      chatId: msg.chat.id.toString(),
      userId: msg.from?.id.toString() || '',
      userName: msg.from?.first_name,
      userUsername: msg.from?.username,
      text: msg.text || msg.caption || '',
      timestamp: new Date(msg.date * 1000),
      attachments: this.extractAttachments(msg),
      metadata: {
        chatType: msg.chat.type,
        language: msg.from?.language_code,
      },
    };
  }

  /**
   * Extrae URLs de archivos adjuntos
   */
  private extractAttachments(msg: TelegramBot.Message): string[] | undefined {
    const attachments: string[] = [];

    if (msg.photo && msg.photo.length > 0) {
      const largestPhoto = msg.photo[msg.photo.length - 1];
      if (largestPhoto) {
        attachments.push(largestPhoto.file_id);
      }
    }

    if (msg.document) {
      attachments.push(msg.document.file_id);
    }

    return attachments.length > 0 ? attachments : undefined;
  }

  async sendMessage(chatId: string, message: string, options?: MessageOptions): Promise<void> {
    try {
      const telegramOptions: TelegramBot.SendMessageOptions = {};

      if (options?.parseMode) {
        telegramOptions.parse_mode = options.parseMode;
      }

      if (options?.disableWebPagePreview) {
        telegramOptions.disable_web_page_preview = true;
      }

      if (options?.inlineKeyboard) {
        telegramOptions.reply_markup = {
          inline_keyboard: options.inlineKeyboard.map((row) =>
            row.map((btn) => ({
              text: btn.text,
              url: btn.url,
              callback_data: btn.callbackData,
            }))
          ),
        };
      }

      await this.bot.sendMessage(chatId, message, telegramOptions);
    } catch (error) {
      this.handleError(error, 'sendMessage');
    }
  }

  async sendDocument(chatId: string, fileUrl: string, caption?: string): Promise<void> {
    try {
      await this.bot.sendDocument(chatId, fileUrl, {
        caption,
      });
    } catch (error) {
      this.handleError(error, 'sendDocument');
    }
  }

  async sendPhoto(chatId: string, imageUrl: string, caption?: string): Promise<void> {
    try {
      await this.bot.sendPhoto(chatId, imageUrl, {
        caption,
      });
    } catch (error) {
      this.handleError(error, 'sendPhoto');
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      console.warn('Telegram bot is already running');
      return;
    }

    console.log('🤖 Telegram bot started');
    this.isRunning = true;
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return;

    await this.bot.stopPolling();
    this.isRunning = false;
    console.log('🛑 Telegram bot stopped');
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  onCommand(command: string, handler: CommandHandler): void {
    this.commandHandlers.set(command, handler);
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: unknown, context: string): never {
    console.error(`Telegram error in ${context}:`, error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`Unknown error in ${context}`);
  }
}
