// src/infrastructure/adapters/messaging/messaging-factory.ts
import type { IMessagingProvider } from '@core/ports/messaging.port';
import { TelegramAdapter } from './telegram-adapter';

/**
 * Tipos de proveedores de mensajería soportados
 */
export type MessagingProviderType = 'telegram' | 'whatsapp' | 'discord';

/**
 * Configuración para crear un proveedor de mensajería
 */
export interface MessagingProviderConfig {
  token: string;
  polling?: boolean;
  webhook?: string;
}

/**
 * Factory para crear instancias de proveedores de mensajería
 * 
 * Implementa el patrón Factory para:
 * - Centralizar la creación de adapters
 * - Facilitar el cambio entre proveedores
 * - Validar configuración antes de crear instancias
 */
export class MessagingFactory {
  /**
   * Crea una instancia de proveedor de mensajería
   */
  static create(
    provider: MessagingProviderType,
    config: MessagingProviderConfig
  ): IMessagingProvider {
    if (!config.token || config.token.trim() === '') {
      throw new Error(`Token is required for ${provider}`);
    }

    switch (provider) {
      case 'telegram':
        return this.createTelegram(config);

      case 'whatsapp':
        return this.createWhatsApp(config);

      case 'discord':
        return this.createDiscord(config);

      default:
        throw new Error(`Unknown messaging provider: ${provider}`);
    }
  }

  /**
   * Crea una instancia de TelegramAdapter
   */
  private static createTelegram(config: MessagingProviderConfig): IMessagingProvider {
    return new TelegramAdapter(config.token, {
      polling: config.polling ?? true,
      webhook: config.webhook,
    });
  }

  /**
   * Crea una instancia de WhatsAppAdapter
   * TODO: Implementar cuando sea necesario
   */
  private static createWhatsApp(config: MessagingProviderConfig): IMessagingProvider {
    throw new Error(
      'WhatsApp adapter not implemented yet. To use WhatsApp, implement WhatsAppAdapter.'
    );
  }

  /**
   * Crea una instancia de DiscordAdapter
   * TODO: Implementar cuando sea necesario
   */
  private static createDiscord(config: MessagingProviderConfig): IMessagingProvider {
    throw new Error(
      'Discord adapter not implemented yet. To use Discord, implement DiscordAdapter.'
    );
  }

  /**
   * Lista todos los proveedores disponibles
   */
  static listAvailableProviders(): {
    id: MessagingProviderType;
    name: string;
    implemented: boolean;
    free: boolean;
  }[] {
    return [
      {
        id: 'telegram',
        name: 'Telegram Bot',
        implemented: true,
        free: true,
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        implemented: false,
        free: false,
      },
      {
        id: 'discord',
        name: 'Discord Bot',
        implemented: false,
        free: true,
      },
    ];
  }
}
