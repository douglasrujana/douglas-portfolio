// tests/ia/test-stream.ts
import 'dotenv/config';
import { LLMFactory } from '@/infrastructure/adapters/llm/llm-factory';

const llm = LLMFactory.create('gemini', {
  apiKey: process.env.GEMINI_API_KEY!,
  model: 'gemini-2.5-flash'
});

const question = "Hola, ¿cómo funciona la arquitectura hexagonal?";

async function runStreamTest() {
  console.log("🧠 Pregunta:");
  console.log(question);
  console.log("\n📘 Respuesta (en streaming):");

  try {
    // Obtenemos el generador iterable de tu adaptador
    const stream = llm.generateStream(question, undefined, { maxTokens: 8000 });
    
    // Leemos cada trozo de texto a medida que llega
    for await (const chunk of stream) {
      // process.stdout.write escribe en la consola sin añadir un salto de línea
      process.stdout.write(chunk);
    }
    
    console.log('\n\n✅ Stream finalizado.');

  } catch (error) {
    console.error("\n\n❌ Error durante el streaming:", error);
  }
}

runStreamTest();