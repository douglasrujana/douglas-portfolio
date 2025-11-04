// tests/telegram/test-bot.ts
/**
 * Script de prueba para el bot de Telegram
 * 
 * Este script simula mensajes entrantes para probar la lógica
 * sin necesidad de enviar mensajes reales por Telegram.
 */

import 'dotenv/config';
import { HandleTelegramMessageUseCase } from '@application/use-cases/handle-telegram-message.use-case';
import { LLMFactory } from '@infrastructure/adapters/llm/llm-factory';
import type { IMessagingProvider, IncomingMessage } from '@core/ports/messaging.port';

// Mock del messaging provider para testing
class MockMessagingProvider implements IMessagingProvider {
  async sendMessage(chatId: string, message: string, options?: any): Promise<void> {
    console.log('\n📤 Bot Response:');
    console.log('─'.repeat(50));
    console.log(message);
    console.log('─'.repeat(50));
    
    if (options?.inlineKeyboard) {
      console.log('\n🔘 Buttons:');
      options.inlineKeyboard.forEach((row: any[]) => {
        row.forEach((btn: any) => {
          console.log(`  • ${btn.text} ${btn.url ? `(${btn.url})` : ''}`);
        });
      });
    }
  }

  async sendDocument(chatId: string, fileUrl: string, caption?: string): Promise<void> {
    console.log('\n📄 Sending document:');
    console.log(`  URL: ${fileUrl}`);
    console.log(`  Caption: ${caption}`);
  }

  async sendPhoto(chatId: string, imageUrl: string, caption?: string): Promise<void> {
    console.log('\n🖼️ Sending photo:');
    console.log(`  URL: ${imageUrl}`);
    console.log(`  Caption: ${caption}`);
  }

  async start(): Promise<void> {}
  async stop(): Promise<void> {}
  onMessage(handler: any): void {}
  onCommand(command: string, handler: any): void {}
}

// Función helper para crear mensajes de prueba
function createTestMessage(text: string): IncomingMessage {
  return {
    messageId: '123',
    chatId: '456',
    userId: '789',
    userName: 'Test User',
    userUsername: 'testuser',
    text,
    timestamp: new Date(),
  };
}

// Tests
async function runTests() {
  console.log('🧪 Testing Telegram Bot\n');

  // Crear instancias
  const messaging = new MockMessagingProvider();
  const llm = LLMFactory.create('gemini', {
    apiKey: process.env.GEMINI_API_KEY!,
    model: 'gemini-2.0-flash-lite',
  });

  const useCase = new HandleTelegramMessageUseCase(messaging, llm);

  // Test 1: Solicitud de CV
  console.log('\n' + '='.repeat(60));
  console.log('TEST 1: Solicitud de CV');
  console.log('='.repeat(60));
  console.log('📨 User: "Quiero ver tu CV"');
  await useCase.execute(createTestMessage('Quiero ver tu CV'));

  // Esperar un poco entre tests
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Test 2: Solicitud de proyectos
  console.log('\n' + '='.repeat(60));
  console.log('TEST 2: Solicitud de Proyectos');
  console.log('='.repeat(60));
  console.log('📨 User: "Muéstrame tus proyectos"');
  await useCase.execute(createTestMessage('Muéstrame tus proyectos'));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Test 3: Solicitud de skills
  console.log('\n' + '='.repeat(60));
  console.log('TEST 3: Solicitud de Skills');
  console.log('='.repeat(60));
  console.log('📨 User: "¿Qué tecnologías manejas?"');
  await useCase.execute(createTestMessage('¿Qué tecnologías manejas?'));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Test 4: Agendar llamada
  console.log('\n' + '='.repeat(60));
  console.log('TEST 4: Agendar Llamada');
  console.log('='.repeat(60));
  console.log('📨 User: "Quiero agendar una reunión"');
  await useCase.execute(createTestMessage('Quiero agendar una reunión'));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Test 5: Pregunta general con IA
  console.log('\n' + '='.repeat(60));
  console.log('TEST 5: Pregunta General (IA)');
  console.log('='.repeat(60));
  console.log('📨 User: "¿Cuántos años de experiencia tienes?"');
  await useCase.execute(createTestMessage('¿Cuántos años de experiencia tienes?'));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Test 6: Lead prometedor
  console.log('\n' + '='.repeat(60));
  console.log('TEST 6: Lead Prometedor');
  console.log('='.repeat(60));
  console.log('📨 User: "Estamos buscando contratar un desarrollador full stack"');
  await useCase.execute(
    createTestMessage('Estamos buscando contratar un desarrollador full stack')
  );

  console.log('\n' + '='.repeat(60));
  console.log('✅ Tests completados!');
  console.log('='.repeat(60));
}

// Ejecutar tests
runTests().catch((error) => {
  console.error('❌ Error en tests:', error);
  process.exit(1);
});
