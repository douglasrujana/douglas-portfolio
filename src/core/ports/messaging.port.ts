// src/core/ports/messaging.port.ts

/**
 * Interface para proveedores de mensajería
 * 
 * Abstracción que permite usar diferentes plataformas de mensajería
 * (Telegram, WhatsApp, Discord, etc.) sin cambiar la lógica de negocio.
 * 
 * Siguiendo el Dependency Inversion Principle (DIP).
 */
export interface IMessagingProvider {
  /**
   * Envía un mensaje de texto
   * @param chatId - ID del chat/usuario
   * @param message - Contenido del mensaje
   * @param options - Opciones adicionales (botones, formato, etc.)
   */
  sendMessage(chatId: string, message: string, options?: MessageOptions): Promise<void>;

  /**
   * Envía un archivo/documento
   * @param chatId - ID del chat/usuario
   * @param fileUrl - URL del archivo
   * @param caption - Descripción del archivo (opcional)
   */
  sendDocument(chatId: string, fileUrl: string, caption?: string): Promise<void>;

  /**
   * Envía una imagen
   * @param chatId - ID del chat/usuario
   * @param imageUrl - URL de la imagen
   * @param caption - Descripción de la imagen (opcional)
   */
  sendPhoto(chatId: string, imageUrl: string, caption?: string): Promise<void>;

  /**
   * Inicia el bot (polling o webhooks)
   */
  start(): Promise<void>;

  /**
   * Detiene el bot
   */
  stop(): Promise<void>;

  /**
   * Registra un handler para mensajes entrantes
   * @param handler - Función que procesa mensajes
   */
  onMessage(handler: MessageHandler): void;

  /**
   * Registra un handler para comandos específicos
   * @param command - Comando sin el "/" (ej: "start", "help")
   * @param handler - Función que procesa el comando
   */
  onCommand(command: string, handler: CommandHandler): void;
}

/**
 * Mensaje entrante
 */
export interface IncomingMessage {
  /** ID único del mensaje */
  messageId: string;
  
  /** ID del chat/usuario */
  chatId: string;
  
  /** ID del usuario que envió el mensaje */
  userId: string;
  
  /** Nombre del usuario */
  userName?: string;
  
  /** Username del usuario (sin @) */
  userUsername?: string;
  
  /** Contenido del mensaje */
  text: string;
  
  /** Timestamp del mensaje */
  timestamp: Date;
  
  /** URLs de archivos adjuntos (si hay) */
  attachments?: string[];
  
  /** Metadata adicional del proveedor */
  metadata?: Record<string, unknown>;
}

/**
 * Opciones para enviar mensajes
 */
export interface MessageOptions {
  /** Formato del mensaje (Markdown, HTML) */
  parseMode?: 'Markdown' | 'HTML';
  
  /** Botones inline */
  inlineKeyboard?: InlineButton[][];
  
  /** Deshabilitar preview de links */
  disableWebPagePreview?: boolean;
}

/**
 * Botón inline
 */
export interface InlineButton {
  /** Texto del botón */
  text: string;
  
  /** URL a abrir (si es link) */
  url?: string;
  
  /** Callback data (si es acción) */
  callbackData?: string;
}

/**
 * Handler para mensajes
 */
export type MessageHandler = (message: IncomingMessage) => Promise<void> | void;

/**
 * Handler para comandos
 */
export type CommandHandler = (message: IncomingMessage) => Promise<void> | void;

/**
 * Errores de mensajería
 */
export class MessagingError extends Error {
  constructor(
    message: string,
    public code: MessagingErrorCode,
    public provider: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'MessagingError';
  }
}

export enum MessagingErrorCode {
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_CHAT_ID = 'INVALID_CHAT_ID',
  MESSAGE_TOO_LONG = 'MESSAGE_TOO_LONG',
  NETWORK_ERROR = 'NETWORK_ERROR',
  BOT_BLOCKED = 'BOT_BLOCKED',
  UNKNOWN = 'UNKNOWN',
}
