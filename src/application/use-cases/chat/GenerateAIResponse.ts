/**
 * Generate AI Response Use Case
 * 
 * Orquesta la generación de respuestas del chatbot:
 * 1. Construye contexto del portfolio
 * 2. Genera respuesta con el LLM
 * 3. Maneja errores elegantemente
 * 
 * Siguiendo DIP: Depende de abstracciones (ILLMProvider)
 */

import type { ILLMProvider } from '@core/ports/ILLMProvider';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  personalInfo: string;
  projects: string;
  skills: string;
  blogPosts?: string;
}

export class GenerateAIResponseUseCase {
  constructor(private llmProvider: ILLMProvider) {}

  /**
   * Genera una respuesta basada en el mensaje del usuario
   * Con contexto completo del portfolio
   */
  async execute(
    userMessage: string,
    context: ChatContext,
    conversationHistory?: ChatMessage[]
  ): Promise<string> {
    try {
      // Construir prompt del sistema con contexto
      const systemPrompt = this.buildSystemPrompt(context);

      // Construir prompt completo con historial
      const fullPrompt = this.buildFullPrompt(
        systemPrompt,
        userMessage,
        conversationHistory
      );

      // Generar respuesta
      const response = await this.llmProvider.generateResponse(
        fullPrompt,
        [systemPrompt],
        {
          temperature: 0.7,
          maxTokens: 512,
        }
      );

      return response.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.getFallbackResponse(error);
    }
  }

  /**
   * Genera respuesta en streaming (para efecto typewriter)
   */
  async *executeStream(
    userMessage: string,
    context: ChatContext,
    conversationHistory?: ChatMessage[]
  ): AsyncIterable<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      const fullPrompt = this.buildFullPrompt(
        systemPrompt,
        userMessage,
        conversationHistory
      );

      // Stream de respuesta
      for await (const chunk of this.llmProvider.generateStream(
        fullPrompt,
        [systemPrompt],
        {
          temperature: 0.7,
          maxTokens: 512,
        }
      )) {
        yield chunk;
      }
    } catch (error) {
      console.error('Error in streaming response:', error);
      yield this.getFallbackResponse(error);
    }
  }

  /**
   * Construye el prompt del sistema con contexto del portfolio
   */
  private buildSystemPrompt(context: ChatContext): string {
    return `Eres un asistente virtual del portfolio de Douglas Rujana, un desarrollador Full Stack+AI especializado en arquitecturas limpias y soluciones cloud-native.

INFORMACIÓN DEL CANDIDATO:
${context.personalInfo}

PROYECTOS DESTACADOS:
${context.projects}

STACK TECNOLÓGICO:
${context.skills}

${context.blogPosts ? `ARTÍCULOS DEL BLOG:\n${context.blogPosts}` : ''}

INSTRUCCIONES:
- Responde preguntas sobre la experiencia, proyectos, habilidades y disponibilidad de Douglas
- Sé profesional pero conversacional
- Si no sabes algo, sé honesto y sugiere contactarlo directamente
- Mantén respuestas concisas (2-3 párrafos máximo)
- Si preguntan por contacto, proporciona el email: tu@email.com
- Resalta la experiencia en arquitectura hexagonal, clean code y IA
- Menciona que está abierto a oportunidades remotas y proyectos interesantes

PERSONALIDAD:
- Técnico pero accesible
- Entusiasta de la arquitectura limpia
- Pragmático y orientado a resultados
- Colaborativo y mentor

IDIOMA:
- Responde en el mismo idioma que la pregunta
- Español por defecto`;
  }

  /**
   * Construye el prompt completo incluyendo historial
   */
  private buildFullPrompt(
    systemPrompt: string,
    userMessage: string,
    conversationHistory?: ChatMessage[]
  ): string {
    let prompt = '';

    // Agregar historial reciente (últimos 5 mensajes)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-5);
      prompt += 'CONVERSACIÓN PREVIA:\n';
      recentHistory.forEach((msg) => {
        if (msg.role === 'user') {
          prompt += `Usuario: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Asistente: ${msg.content}\n`;
        }
      });
      prompt += '\n';
    }

    // Mensaje actual
    prompt += `Usuario: ${userMessage}\nAsistente:`;

    return prompt;
  }

  /**
   * Respuesta de fallback en caso de error
   */
  private getFallbackResponse(error: unknown): string {
    const isRateLimit =
      error instanceof Error && error.message.includes('rate limit');

    if (isRateLimit) {
      return '⏱️ Estoy procesando muchas consultas en este momento. Por favor, intenta de nuevo en unos segundos o contáctame directamente en tu@email.com';
    }

    return '🤔 Disculpa, estoy teniendo dificultades técnicas en este momento. Por favor, contáctame directamente en tu@email.com o intenta de nuevo en un momento.';
  }

  /**
   * Valida si una pregunta es apropiada
   */
  validateQuestion(question: string): {
    isValid: boolean;
    reason?: string;
  } {
    // Muy corto
    if (question.trim().length < 3) {
      return {
        isValid: false,
        reason: 'La pregunta es demasiado corta',
      };
    }

    // Muy largo
    if (question.length > 500) {
      return {
        isValid: false,
        reason: 'La pregunta es demasiado larga (máx 500 caracteres)',
      };
    }

    // Spam detection básico
    const spamPatterns = [
      /viagra/i,
      /casino/i,
      /crypto.*wallet/i,
      /buy.*followers/i,
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(question)) {
        return {
          isValid: false,
          reason: 'La pregunta contiene contenido no apropiado',
        };
      }
    }

    return { isValid: true };
  }
}

/**
 * Helper para construir contexto del portfolio
 */
export function buildPortfolioContext(data: {
  projects: Array<{ title: string; description: string; tags: string[] }>;
  skills: string[];
  blogPosts?: Array<{ title: string; description: string }>;
}): ChatContext {
  // Personal info
  const personalInfo = `
Nombre: Douglas Rujana
Rol: Desarrollador Full Stack + AI | QA | DevOps | Cloud-native
Especialización: Arquitecturas hexagonales, Clean Code, SOLID principles
Ubicación: Disponible para trabajo remoto
Experiencia: 5+ años en desarrollo web y arquitectura de software
Enfoque: Construcción de aplicaciones escalables y mantenibles con IA integrada
  `.trim();

  // Projects
  const projects = data.projects
    .slice(0, 5) // Top 5 proyectos
    .map(
      (p, i) =>
        `${i + 1}. ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`
    )
    .join('\n');

  // Skills
  const skills = `
Frontend: ${data.skills.filter((s) => ['Astro', 'Svelte', 'React', 'TypeScript', 'Tailwind'].includes(s)).join(', ')}
Backend: ${data.skills.filter((s) => ['Node.js', 'Express', 'PHP', 'Laravel'].includes(s)).join(', ')}
Database: ${data.skills.filter((s) => ['MySQL', 'MongoDB', 'PostgreSQL'].includes(s)).join(', ')}
AI & DevOps: ${data.skills.filter((s) => ['Gemini', 'Docker', 'GitHub Actions'].includes(s)).join(', ')}
Arquitectura: Hexagonal Architecture, SOLID, Clean Code, DDD, Microservices
  `.trim();

  // Blog posts (opcional)
  const blogPosts = data.blogPosts
    ? data.blogPosts
        .slice(0, 3)
        .map((p, i) => `${i + 1}. "${p.title}": ${p.description}`)
        .join('\n')
    : undefined;

  return {
    personalInfo,
    projects,
    skills,
    blogPosts,
  };
}