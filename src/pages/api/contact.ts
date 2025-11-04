// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { z } from 'zod';
import { ResendAdapter } from '@infrastructure/adapters/email/resend-adapter';
import { HubSpotAdapter } from '@infrastructure/adapters/crm/hubspot-adapter';
import { LLMFactory } from '@infrastructure/adapters/llm/llm-factory';
import { HandleContactFormUseCase } from '@application/use-cases/handle-contact-form.use-case';
import { env } from '@infrastructure/config/env';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const email = new ResendAdapter(env.RESEND_API_KEY);
    const crm = env.HUBSPOT_API_KEY ? new HubSpotAdapter(env.HUBSPOT_API_KEY) : null;
    const llm = LLMFactory.create('gemini', {
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_CHAT_MODEL,
    });

    const useCase = new HandleContactFormUseCase(email, crm, llm);
    await useCase.execute(data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 });
  }
};
