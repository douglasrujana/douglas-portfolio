// tests/ia/test-profiles.ts
import { LLMFactory } from '@/infrastructure/adapters/llm/llm-factory';
import { getLlmConfigForProfile, type ModelProfile } from '@/infrastructure/config/env';

async function testProfile(profile: ModelProfile) {
  console.log(`\n🧪 Probando perfil: '${profile}'`);
  
  try {
    // 1. Obtener la configuración para el perfil
    const config = getLlmConfigForProfile(profile);
    console.log(`   - Modelo seleccionado: ${config.model}`);

    // 2. Crear una instancia del LLM con esa configuración
    const llm = LLMFactory.create(config.provider, {
      apiKey: config.apiKey,
      model: config.model,
    });

    // 3. Realizar una pregunta simple para verificar que funciona
    const question = `Confirma que estás usando el modelo ${config.model} y dime para qué perfil estás configurado.`;
    const response = await llm.generateResponse(question, undefined, {
      temperature: 0.1,
      maxTokens: 100,
    });

    console.log(`   - ✅ Respuesta del modelo: "${response.content.trim()}"`);
  } catch (error) {
    console.error(`   - ❌ Error probando el perfil '${profile}':`, error instanceof Error ? error.message : error);
  }
}

async function runAllProfileTests() {
  console.log('================================================');
  console.log('🤖 Ejecutando pruebas de perfiles de modelo...');
  console.log('================================================');
  await testProfile('fast');
  await testProfile('powerful');
  await testProfile('dev');
}

runAllProfileTests();