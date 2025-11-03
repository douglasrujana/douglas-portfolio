// src/infrastructure/config/env.ts
import { z } from 'zod';

/**
 * Schema de validación para variables de entorno
 * Siguiendo el principio de "fail fast" - si la config es inválida, la app no arranca
 */
const envSchema = z.object({
  // LLM Configuration
  LLM_PROVIDER: z.enum(['gemini', 'openai', 'claude']).default('gemini'),
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  GEMINI_MODEL: z.string().default('gemini-1.5-flash'),

  // Optional OpenAI (preparado para el futuro)
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),

  // Optional Claude (preparado para el futuro)
  CLAUDE_API_KEY: z.string().optional(),
  CLAUDE_MODEL: z.string().default('claude-3-5-sonnet-20241022'),

  // Blog Configuration
  BLOG_STORAGE: z.enum(['filesystem', 'notion', 's3']).default('filesystem'),
  BLOG_POSTS_DIR: z.string().default('./src/content/blog/posts'),

  // WhatsApp Integration (Optional)
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  WHATSAPP_NUMBER: z.string().optional(),

  // Social Media Integration (Optional)
  LINKEDIN_ACCESS_TOKEN: z.string().optional(),
  TWITTER_API_KEY: z.string().optional(),
  TWITTER_API_SECRET: z.string().optional(),
  TWITTER_ACCESS_TOKEN: z.string().optional(),
  TWITTER_ACCESS_SECRET: z.string().optional(),

  // Deployment & Environment
  DEPLOYMENT_TARGET: z.enum(['vercel', 'netlify', 'cloudflare', 'docker']).default('vercel'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SITE_URL: z.string().url().default('http://localhost:4321'),

  // Feature Flags
  ENABLE_CHATBOT: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),
  ENABLE_WHATSAPP: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  ENABLE_CROSS_POSTING: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  // Rate Limiting
  RATE_LIMIT_REQUESTS_PER_MINUTE: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('10'),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('60000'),
});

/**
 * Tipo inferido del schema
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Valida y parsea las variables de entorno
 * @throws {ZodError} Si la validación falla
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    console.error(error);
    throw new Error('Environment validation failed. Check your .env file.');
  }
}

/**
 * Variables de entorno validadas y type-safe
 * Se validan una sola vez al importar este módulo
 */
export const env = validateEnv();

/**
 * Helper para verificar si estamos en producción
 */
export const isProd = env.NODE_ENV === 'production';

/**
 * Helper para verificar si estamos en desarrollo
 */
export const isDev = env.NODE_ENV === 'development';

/**
 * Helper para verificar si estamos en testing
 */
export const isTest = env.NODE_ENV === 'test';

/**
 * Configuración del LLM activo
 */
export const llmConfig = {
  provider: env.LLM_PROVIDER,
  apiKey:
    env.LLM_PROVIDER === 'gemini'
      ? env.GEMINI_API_KEY
      : env.LLM_PROVIDER === 'openai'
        ? env.OPENAI_API_KEY
        : env.CLAUDE_API_KEY,
  model:
    env.LLM_PROVIDER === 'gemini'
      ? env.GEMINI_MODEL
      : env.LLM_PROVIDER === 'openai'
        ? env.OPENAI_MODEL
        : env.CLAUDE_MODEL,
};

/**
 * Configuración de feature flags
 */
export const features = {
  chatbot: env.ENABLE_CHATBOT,
  whatsapp: env.ENABLE_WHATSAPP && !!env.TWILIO_ACCOUNT_SID,
  crossPosting: env.ENABLE_CROSS_POSTING && !!env.LINKEDIN_ACCESS_TOKEN,
};

/**
 * Logs de configuración al iniciar (solo en desarrollo)
 */
if (isDev) {
  console.log('🔧 Environment Configuration:');
  console.log(`  • LLM Provider: ${llmConfig.provider}`);
  console.log(`  • LLM Model: ${llmConfig.model}`);
  console.log(`  • Blog Storage: ${env.BLOG_STORAGE}`);
  console.log(`  • Deployment Target: ${env.DEPLOYMENT_TARGET}`);
  console.log(`  • Features:`);
  console.log(`    - Chatbot: ${features.chatbot ? '✅' : '❌'}`);
  console.log(`    - WhatsApp: ${features.whatsapp ? '✅' : '❌'}`);
  console.log(`    - Cross-posting: ${features.crossPosting ? '✅' : '❌'}`);
}
