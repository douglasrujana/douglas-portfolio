// src/core/ports/ILLMProvider.ts

/**
 * Interface para proveedores de LLM (Large Language Models)
 * 
 * Esta interface define el contrato que cualquier proveedor de LLM debe cumplir.
 * Siguiendo el Dependency Inversion Principle (DIP), las capas superiores
 * dependen de esta abstracción, no de implementaciones concretas.
 * 
 * Soporta: Gemini, OpenAI, Claude, y cualquier otro LLM futuro.
 */
export interface ILLMProvider {
  /**
   * Genera una respuesta basada en un prompt
   * @param prompt - El mensaje del usuario
   * @param context - Contexto adicional (opcional)
   * @param options - Opciones de generación (opcional)
   * @returns Respuesta del LLM con metadata
   */
  generateResponse(
    prompt: string,
    context?: string[],
    options?: LLMOptions
  ): Promise<LLMResponse>;

  /**
   * Genera una respuesta en streaming (para UX más fluida)
   * @param prompt - El mensaje del usuario
   * @param context - Contexto adicional (opcional)
   * @param options - Opciones de generación (opcional)
   * @returns AsyncIterable que emite chunks de texto
   */
  generateStream(
    prompt: string,
    context?: string[],
    options?: LLMOptions
  ): AsyncIterable<string>;

  /**
   * Estima el número de tokens en un texto
   * Útil para rate limiting y cálculo de costos
   * @param text - Texto a analizar
   * @returns Número aproximado de tokens
   */
  estimateTokens(text: string): number;

  /**
   * Obtiene información sobre el modelo actual
   * @returns Metadata del modelo
   */
  getModelInfo(): ModelInfo;
}

/**
 * Opciones de configuración para la generación
 */
export interface LLMOptions {
  /**
   * Temperature: controla la aleatoriedad (0 = determinista, 1 = creativo)
   * @default 0.7
   */
  temperature?: number;

  /**
   * Número máximo de tokens a generar
   * @default 1024
   */
  maxTokens?: number;

  /**
   * Top-p sampling: considera solo los tokens con probabilidad acumulada p
   * @default 0.95
   */
  topP?: number;

  /**
   * Secuencias que detienen la generación
   */
    stopSequences?: string[];
    
  // 👇 AÑADE ESTA LÍNEA
  safetySettings?: any[]; // Puedes usar un tipo más específico si lo importas

  /**
   * Penalización por frecuencia (reduce repeticiones)
   * @default 0
   */
  frequencyPenalty?: number;

  /**
   * Penalización por presencia (fomenta nuevos temas)
   * @default 0
   */
  presencePenalty?: number;
}

/**
 * Respuesta del LLM con metadata completa
 */
export interface LLMResponse {
  /**
   * Contenido de texto generado
   */
  content: string;

  /**
   * Tokens utilizados (prompt + completion)
   */
  tokensUsed: number;

  /**
   * Nombre del modelo utilizado
   */
  model: string;

  /**
   * Razón de finalización
   */
  finishReason?: 'stop' | 'length' | 'content_filter' | 'error';

  /**
   * Metadata adicional específica del proveedor
   */
  metadata?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    latencyMs?: number;
    provider?: string;
    [key: string]: unknown;
  };

  /**
   * Timestamp de la generación
   */
  timestamp: Date;
}

/**
 * Información sobre el modelo
 */
export interface ModelInfo {
  /**
   * Nombre del modelo
   */
  name: string;

  /**
   * Proveedor del modelo
   */
  provider: 'gemini' | 'openai' | 'claude' | string;

  /**
   * Límite máximo de tokens de contexto
   */
  contextWindow: number;

  /**
   * Costo por 1M tokens de input (USD)
   */
  costPerMillionInputTokens?: number;

  /**
   * Costo por 1M tokens de output (USD)
   */
  costPerMillionOutputTokens?: number;

  /**
   * Capacidades del modelo
   */
  capabilities: {
    streaming: boolean;
    functionCalling: boolean;
    vision: boolean;
    json: boolean;
  };
}

/**
 * Errores específicos de LLM
 */
export class LLMError extends Error {
  constructor(
    message: string,
    public code: LLMErrorCode,
    public provider: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'LLMError';
  }
}

export enum LLMErrorCode {
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  CONTENT_FILTERED = 'CONTENT_FILTERED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Utility type: Partial LLM Response para streaming
 */
export type StreamChunk = {
  delta: string;
  done: boolean;
};
