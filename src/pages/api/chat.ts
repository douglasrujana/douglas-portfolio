/**
 * Chat API Route
 * 
 * Endpoint para el chatbot IA
 * Soporta tanto respuestas completas como streaming
 */

import type { APIRoute } from 'astro';
import { LLMFactory } from '@infrastructure/adapters/llm/llm-factory';
import { getLlmConfigForProfile } from '@infrastructure/config/env';
import {
  GenerateAIResponseUseCase,
  buildPortfolioContext,
  type ChatMessage,
} from '@application/use-cases/chat/GenerateAIResponse';
import { projects } from '@/data/projects';

// Rate limiting simple (en memoria)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60 * 1000; // 1 minuto

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    // Reset o nueva entrada
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

/**
 * POST /api/chat
 * 
 * Body: {
 *   message: string,
 *   conversationHistory?: ChatMessage[],
 *   stream?: boolean
 * }
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    const { allowed, remaining } = checkRateLimit(clientAddress);
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again in a minute.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(
              Math.ceil(
                (requestCounts.get(clientAddress)?.resetTime || Date.now()) /
                  1000
              )
            ),
          },
        }
      );
    }

    // Parse request
    const body = await request.json();
    const { message, conversationHistory, stream = false } = body;

    // Validar mensaje
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Obtener la configuración para el perfil de chat ('fast')
    const chatConfig = getLlmConfigForProfile('fast');
    const llm = LLMFactory.create(chatConfig.provider, { apiKey: chatConfig.apiKey, model: chatConfig.model });

    // Crear use case
    const useCase = new GenerateAIResponseUseCase(llm);

    // Validar pregunta
    const validation = useCase.validateQuestion(message);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: validation.reason }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Construir contexto del portfolio
    const context = buildPortfolioContext({
      projects: projects.map((p) => ({
        title: p.title,
        description: p.description,
        tags: p.tags,
      })),
      skills: [
        'Astro',
        'Svelte',
        'TypeScript',
        'Tailwind',
        'Node.js',
        'Express',
        'PHP',
        'Laravel',
        'MySQL',
        'MongoDB',
        'PostgreSQL',
        'Gemini',
        'Docker',
        'GitHub Actions',
        'Vercel',
      ],
    });

    // Streaming response
    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of useCase.executeStream(
              message,
              context,
              conversationHistory
            )) {
              const data = `data: ${JSON.stringify({ chunk })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
            // Enviar señal de finalización
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            console.error('Streaming error:', error);
            const errorData = `data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`;
            controller.enqueue(encoder.encode(errorData));
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'X-RateLimit-Remaining': String(remaining),
        },
      });
    }

    // Respuesta normal (no streaming)
    const response = await useCase.execute(
      message,
      context,
      conversationHistory
    );

    return new Response(
      JSON.stringify({
        response,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

/**
 * OPTIONS /api/chat
 * Para CORS preflight
 */
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};