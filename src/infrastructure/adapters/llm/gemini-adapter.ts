// src/infrastructure/adapters/llm/GeminiAdapter.ts
import { GoogleGenerativeAI, type GenerateContentStreamResult } from '@google/generative-ai';
import type {
  ILLMProvider,
  LLMOptions,
  LLMResponse,
  ModelInfo,
} from '@core/ports/llm-port-interface';
import { LLMError, LLMErrorCode } from '@core/ports/llm-port-interface';

/**
 * Adapter para Google Gemini
 * 
 * Implementa ILLMProvider para Gemini, permitiendo cambiar a otro LLM
 * sin afectar la lógica de negocio.
 * 
 * Features:
 * - Gemini 1.5 Flash (free tier: 15 req/min, 1M tokens/day)
 * - Streaming para mejor UX
 * - Manejo robusto de errores
 * - Rate limiting awareness
 */
export class GeminiAdapter implements ILLMProvider {
  private client: GoogleGenerativeAI;
  private modelName: string;
  private requestCount = 0;
  private lastResetTime = Date.now();

  constructor(apiKey: string, model = 'gemini-1.5-flash') {
    if (!apiKey || apiKey.trim() === '') {
      throw new LLMError(
        'Gemini API key is required',
        LLMErrorCode.AUTHENTICATION_FAILED,
        'gemini'
      );
    }

    this.client = new GoogleGenerativeAI(apiKey);
    this.modelName = model;
  }

  /**
   * Genera una respuesta completa utilizando la lógica de streaming internamente
   * para evitar problemas con maxTokens y obtener siempre el resultado final.
   */
  public async generateResponse(
    prompt: string,
    context?: string[],
    options?: LLMOptions
  ): Promise<LLMResponse> {
    const startTime = Date.now();
    let fullText = "";

    try {
      this.checkRateLimit();

      const model = this.client.getGenerativeModel({ model: this.modelName });
      
      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 8000,
        topP: options?.topP ?? 0.95,
        stopSequences: options?.stopSequences,
      };

      const fullPrompt = this.buildPromptWithContext(prompt, context);
      
      const streamResult = await model.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig,
      });

      for await (const chunk of streamResult.stream) {
        const text = chunk.text();
        if (text) {
          fullText += text;
        }
      }
      
      const response = await streamResult.response;
      const usage = response.usageMetadata;
      const latency = Date.now() - startTime;

      return {
        content: fullText,
        tokensUsed: usage?.totalTokenCount ?? this.estimateTokens(fullText),
        model: this.modelName,
        finishReason: this.mapFinishReason(response.candidates?.[0]?.finishReason),
        metadata: {
          // ==========================================================
          // =====      AQUÍ ESTABA EL ÚLTIMO ERROR CORREGIDO      =====
          // Era promptTokenCount, no promptTokens
          promptTokens: usage?.promptTokenCount,
          // ==========================================================
          completionTokens: usage?.candidatesTokenCount,
          totalTokens: usage?.totalTokenCount,
          latencyMs: latency,
          provider: 'gemini',
        },
        timestamp: new Date(),
      };

    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * Genera una respuesta en streaming
   */
  async *generateStream(
    prompt: string,
    context?: string[],
    options?: LLMOptions
  ): AsyncIterable<string> {
    try {
      this.checkRateLimit();

      const model = this.client.getGenerativeModel({ model: this.modelName });
      const fullPrompt = this.buildPromptWithContext(prompt, context);

      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 1024,
        topP: options?.topP ?? 0.95,
        stopSequences: options?.stopSequences,
      };

      const result: GenerateContentStreamResult = await model.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig,
      });

      // Streamear chunks
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Estima tokens (aproximación para Gemini)
   * Gemini usa aproximadamente 1 token ≈ 4 caracteres para inglés
   * y 1 token ≈ 2-3 caracteres para español
   */
  estimateTokens(text: string): number {
    // Usar 3 caracteres por token como promedio
    return Math.ceil(text.length / 3);
  }

  /**
   * Obtiene información del modelo
   */
  getModelInfo(): ModelInfo {
    const modelConfigs: Record<string, ModelInfo> = {
      'gemini-1.5-flash': {
        name: 'Gemini 1.5 Flash',
        provider: 'gemini',
        contextWindow: 1_000_000, // 1M tokens
        costPerMillionInputTokens: 0, // Free tier
        costPerMillionOutputTokens: 0, // Free tier
        capabilities: {
          streaming: true,
          functionCalling: true,
          vision: true,
          json: true,
        },
      },
      'gemini-1.5-pro': {
        name: 'Gemini 1.5 Pro',
        provider: 'gemini',
        contextWindow: 2_000_000, // 2M tokens
        costPerMillionInputTokens: 1.25,
        costPerMillionOutputTokens: 5.0,
        capabilities: {
          streaming: true,
          functionCalling: true,
          vision: true,
          json: true,
        },
      },
    };

    return (
      modelConfigs[this.modelName] ?? {
        name: this.modelName,
        provider: 'gemini',
        contextWindow: 1_000_000,
        capabilities: {
          streaming: true,
          functionCalling: false,
          vision: false,
          json: false,
        },
      }
    );
  }

  // ========== MÉTODOS PRIVADOS ==========

  /**
   * Construye el prompt con contexto adicional
   */
  private buildPromptWithContext(prompt: string, context?: string[]): string {
    if (!context || context.length === 0) {
      return prompt;
    }

    return `Context:\n${context.join('\n\n')}\n\nUser Query: ${prompt}`;
  }

  /**
   * Mapea el finishReason de Gemini a nuestro tipo
   */
  private mapFinishReason(
    reason?: string
  ): 'stop' | 'length' | 'content_filter' | 'error' | undefined {
    const mapping: Record<string, 'stop' | 'length' | 'content_filter' | 'error'> = {
      STOP: 'stop',
      MAX_TOKENS: 'length',
      SAFETY: 'content_filter',
      RECITATION: 'content_filter',
      OTHER: 'error',
    };

    return reason ? mapping[reason] : undefined;
  }

  /**
   * Verifica rate limiting (15 req/min para free tier)
   */
  private checkRateLimit(): void {
    const now = Date.now();
    const oneMinute = 60 * 1000;

    // Reset contador cada minuto
    if (now - this.lastResetTime > oneMinute) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }

    // Incrementar contador
    this.requestCount++;

    // Verificar límite (15 req/min para Gemini free tier)
    if (this.requestCount > 15) {
      throw new LLMError(
        'Rate limit exceeded. Gemini free tier: 15 requests per minute.',
        LLMErrorCode.RATE_LIMIT_EXCEEDED,
        'gemini'
      );
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: unknown): LLMError {
    if (error instanceof LLMError) {
      return error;
    }

    // Error de autenticación
    if (
      error instanceof Error &&
      (error.message.includes('API key') || error.message.includes('401'))
    ) {
      return new LLMError(
        'Invalid Gemini API key',
        LLMErrorCode.AUTHENTICATION_FAILED,
        'gemini',
        error
      );
    }

    // Error de rate limit
    if (error instanceof Error && error.message.includes('429')) {
      return new LLMError(
        'Gemini rate limit exceeded',
        LLMErrorCode.RATE_LIMIT_EXCEEDED,
        'gemini',
        error
      );
    }

    // Error de red
    if (error instanceof Error && error.message.includes('fetch')) {
      return new LLMError(
        'Network error connecting to Gemini',
        LLMErrorCode.NETWORK_ERROR,
        'gemini',
        error
      );
    }

    // Error genérico
    return new LLMError(
      error instanceof Error ? error.message : 'Unknown error',
      LLMErrorCode.UNKNOWN,
      'gemini',
      error
    );
  }
}
