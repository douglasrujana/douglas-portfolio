// test-llm.ts
import 'dotenv/config'; // Carga automáticamente el .env
import { LLMFactory } from '@/infrastructure/adapters/llm/llm-factory';
import {
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

console.log(`API Key cargada: ${process.env.GEMINI_API_KEY ? 'Sí, termina en ' + process.env.GEMINI_API_KEY.slice(-4) : 'No'}`);

const llm = LLMFactory.create('gemini', {
  apiKey: process.env.GEMINI_API_KEY!,
  model: 'gemini-2.5-flash'
});

const question = "Hola, ¿cómo funciona la arquitectura hexagonal?";

// 👇 DEFINE LA CONFIGURACIÓN DE SEGURIDAD
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const response = await llm.generateResponse(
  question,
  undefined,
  { temperature: 0.7, maxTokens: 10000, safetySettings }
);

// ✅ Salida estructurada
console.log("🧠 Pregunta:");
console.log(question);
console.log("\n📘 Respuesta:");
console.log(response.content);
console.log(`\n📊 Tokens usados: ${response.tokensUsed}`);
