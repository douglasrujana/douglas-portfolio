// src/infrastructure/adapters/llm/LLMFactory.ts
import type { ILLMProvider } from '@core/ports/llm-port-interface';
import { GeminiAdapter } from './gemini-adapter';
// import { OpenAIAdapter } from './OpenAIAdapter';  // Preparado para futuro
// import { ClaudeAdapter } from './ClaudeAdapter';  // Preparado para futuro

/**
 * Tipos de proveedores de LLM soportados
 */
export type LLMProviderType = 'gemini' | 'openai' | 'claude';

/**
 * Configuración para crear un proveedor de LLM
 */
export interface LLMProviderConfig {
  apiKey: string;
  model?: string;
  organizationId?: string; // Para OpenAI
  baseURL?: string; // Para self-hosted
}

/**
 * Factory para crear instancias de proveedores de LLM
 * 
 * Implementa el patrón Factory para:
 * - Centralizar la creación de adapters
 * - Facilitar el cambio entre proveedores
 * - Validar configuración antes de crear instancias
 * 
 * Uso:
 * ```typescript
 * const llm = LLMFactory.create('gemini', {
 *   apiKey: env.GEMINI_API_KEY,
 *   model: 'gemini-1.5-flash'
 * });
 * ```
 */
export class LLMFactory {
  /**
   * Crea una instancia de proveedor de LLM
   * 
   * @param provider - Tipo de proveedor ('gemini', 'openai', 'claude')
   * @param config - Configuración del proveedor
   * @returns Instancia de ILLMProvider
   * @throws Error si el proveedor no es soportado o la config es inválida
   */
  static create(provider: LLMProviderType, config: LLMProviderConfig): ILLMProvider {
    // Validar API key
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new Error(`API key is required for ${provider}`);
    }

    switch (provider) {
      case 'gemini':
        return this.createGemini(config);

      case 'openai':
        return this.createOpenAI(config);

      case 'claude':
        return this.createClaude(config);

      default:
        throw new Error(`Unknown LLM provider: ${provider}`);
    }
  }

  /**
   * Crea una instancia de GeminiAdapter
   */
  private static createGemini(config: LLMProviderConfig): ILLMProvider {
    const model = config.model ?? 'gemini-1.5-flash';
    return new GeminiAdapter(config.apiKey, model);
  }

  /**
   * Crea una instancia de OpenAIAdapter
   * TODO: Implementar cuando sea necesario
   */
  private static createOpenAI(config: LLMProviderConfig): ILLMProvider {
    throw new Error(
      'OpenAI adapter not implemented yet. To use OpenAI, implement OpenAIAdapter in ./OpenAIAdapter.ts'
    );

    // Implementación futura:
    // const model = config.model ?? 'gpt-4o-mini';
    // return new OpenAIAdapter(config.apiKey, model, {
    //   organizationId: config.organizationId,
    //   baseURL: config.baseURL,
    // });
  }

  /**
   * Crea una instancia de ClaudeAdapter
   * TODO: Implementar cuando sea necesario
   */
  private static createClaude(config: LLMProviderConfig): ILLMProvider {
    throw new Error(
      'Claude adapter not implemented yet. To use Claude, implement ClaudeAdapter in ./ClaudeAdapter.ts'
    );

    // Implementación futura:
    // const model = config.model ?? 'claude-3-5-sonnet-20241022';
    // return new ClaudeAdapter(config.apiKey, model, {
    //   baseURL: config.baseURL,
    // });
  }

  /**
   * Crea un proveedor basado en variables de entorno
   * Helper para uso común en la aplicación
   * 
   * @param env - Variables de entorno validadas
   * @returns Instancia de ILLMProvider configurada
   */
  static createFromEnv(env: {
    LLM_PROVIDER: LLMProviderType;
    GEMINI_API_KEY?: string;
    GEMINI_MODEL?: string;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    CLAUDE_API_KEY?: string;
    CLAUDE_MODEL?: string;
  }): ILLMProvider {
    switch (env.LLM_PROVIDER) {
      case 'gemini':
        return this.create('gemini', {
          apiKey: env.GEMINI_API_KEY!,
          model: env.GEMINI_MODEL,
        });

      case 'openai':
        return this.create('openai', {
          apiKey: env.OPENAI_API_KEY!,
          model: env.OPENAI_MODEL,
        });

      case 'claude':
        return this.create('claude', {
          apiKey: env.CLAUDE_API_KEY!,
          model: env.CLAUDE_MODEL,
        });

      default:
        throw new Error(`Unknown LLM provider: ${env.LLM_PROVIDER}`);
    }
  }

  /**
   * Lista todos los proveedores disponibles
   * Útil para UI de configuración
   */
  static listAvailableProviders(): {
    id: LLMProviderType;
    name: string;
    implemented: boolean;
    freeTier: boolean;
  }[] {
    return [
      {
        id: 'gemini',
        name: 'Google Gemini',
        implemented: true,
        freeTier: true,
      },
      {
        id: 'openai',
        name: 'OpenAI GPT',
        implemented: false,
        freeTier: false,
      },
      {
        id: 'claude',
        name: 'Anthropic Claude',
        implemented: false,
        freeTier: false,
      },
    ];
  }
}

/**
 * Helper para crear una instancia singleton del LLM
 * Útil para reutilizar la misma instancia en toda la app
 */
let cachedLLM: ILLMProvider | null = null;

export function getLLM(
  provider: LLMProviderType,
  config: LLMProviderConfig,
  forceNew = false
): ILLMProvider {
  if (!cachedLLM || forceNew) {
    cachedLLM = LLMFactory.create(provider, config);
  }
  return cachedLLM;
}

/**
 * Limpia el cache del LLM
 * Útil para testing o cambio de configuración
 */
export function clearLLMCache(): void {
  cachedLLM = null;
}
