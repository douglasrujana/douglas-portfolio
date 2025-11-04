// src/infrastructure/config/env.ts

// Carga las variables de entorno desde el archivo .env al inicio.
// Esto asegura que process.env esté poblado antes de que Zod intente validarlo.
import 'dotenv/config';
import { z } from 'zod';

/**
 * Schema de validación para variables de entorno
 * Siguiendo el principio de "fail fast" - si la config es inválida, la app no arranca
 */
const envSchema = z.object({
  // LLM Configuration
  LLM_PROVIDER: z.enum(['gemini', 'openai', 'claude']).default('gemini'),
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  // --- Modelos por Caso de Uso ---
  GEMINI_CHAT_MODEL: z.string().default('gemini-2.0-flash-lite'),
  GEMINI_BLOG_MODEL: z.string().default('gemini-2.0-flash-lite'),
  GEMINI_DEV_MODEL: z.string().default('gemini-2.5-flash'),

  // Optional OpenAI (preparado para el futuro)
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),

  // Optional Claude (preparado para el futuro)
  CLAUDE_API_KEY: z.string().optional(),
  CLAUDE_MODEL: z.string().default('claude-3-5-sonnet-20241022'),

  // Blog Configuration
  BLOG_STORAGE: z.enum(['filesystem', 'notion', 's3']).default('filesystem'),
  BLOG_POSTS_DIR: z.string().default('./src/content/blog/posts'),

  // Messaging Integration (Optional)
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_BOT_USERNAME: z.string().optional(),
  WHATSAPP_NUMBER: z.string().optional(),
  
  // Email & CRM (Optional)
  RESEND_API_KEY: z.string().optional(),
  HUBSPOT_API_KEY: z.string().optional(),
  
  // CV & Portfolio URLs (Optional)
  CV_PDF_URL: z.string().url().optional(),
  CALENDLY_URL: z.string().url().optional(),
  
  // WhatsApp Bot Integration (Optional - for Twilio)
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),

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
  ENABLE_TELEGRAM: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
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
 * Define los perfiles de capacidad de los modelos de IA.
 */
export type ModelProfile = 'fast' | 'powerful' | 'dev';

/**
 * Obtiene la configuración del LLM para un perfil de capacidad específico.
 * Esta función centraliza la lógica de selección de modelos.
 * @param profile El perfil de capacidad requerido ('fast' o 'powerful').
 * @returns La configuración de proveedor, clave de API y modelo.
 * @throws Si el perfil solicitado no está configurado.
 */
export function getLlmConfigForProfile(profile: ModelProfile): {
  provider: 'gemini' | 'openai' | 'claude';
  apiKey: string;
  model: string;
} {
  let model: string;
  // Por ahora, asumimos Gemini, pero esta lógica puede expandirse.
  const provider = env.LLM_PROVIDER;
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(`API key for provider '${provider}' is not configured.`);
  }

  switch (profile) {
    case 'fast':
      model = env.GEMINI_CHAT_MODEL;
      break;
    case 'powerful':
      model = env.GEMINI_BLOG_MODEL;
      break;
    case 'dev':
      model = env.GEMINI_DEV_MODEL;
      break;
    default:
      // Esto previene errores en tiempo de compilación si se pasa un perfil inválido.
      const exhaustiveCheck: never = profile; // eslint-disable-line @typescript-eslint/no-unused-vars
      throw new Error(`Invalid model profile requested: ${exhaustiveCheck}`);
  }

  return { provider, apiKey, model };
}

/**
 * Configuración de feature flags
 */
export const features = {
  chatbot: env.ENABLE_CHATBOT,
  telegram: env.ENABLE_TELEGRAM && !!env.TELEGRAM_BOT_TOKEN,
  whatsapp: env.ENABLE_WHATSAPP && !!env.TWILIO_ACCOUNT_SID,
  crossPosting: env.ENABLE_CROSS_POSTING && !!env.LINKEDIN_ACCESS_TOKEN,
};

/**
 * Logs de configuración al iniciar (solo en desarrollo)
 */
if (isDev) {
  console.log('🔧 Environment Configuration:');
  console.log(`  • Primary LLM Provider: ${env.LLM_PROVIDER}`);
  console.log(`  • Chat Model (fast): ${env.GEMINI_CHAT_MODEL}`);
  console.log(`  • Blog Model (powerful): ${env.GEMINI_BLOG_MODEL}`);
  console.log(`  • Dev Model (dev): ${env.GEMINI_DEV_MODEL}`);
  console.log(`  • Blog Storage: ${env.BLOG_STORAGE}`);
  console.log(`  • Deployment Target: ${env.DEPLOYMENT_TARGET}`);
  console.log(`  • Features:`);
  console.log(`    - Chatbot: ${features.chatbot ? '✅' : '❌'}`);
  console.log(`    - Telegram: ${features.telegram ? '✅' : '❌'}`);
  console.log(`    - WhatsApp: ${features.whatsapp ? '✅' : '❌'}`);
  console.log(`    - Cross-posting: ${features.crossPosting ? '✅' : '❌'}`);
}
