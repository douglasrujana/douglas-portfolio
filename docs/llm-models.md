# Modelos Gemini segín caso de uso
🗣 Chat Asistente (preguntas y respuestas)
Alias: `chat-assistant`
Modelo: `gemini-2.0-flash-lite`
Motivo: sin límites, ideal para interacción en tiempo real

📝 Blog generador de contenido
Alias: `blog-writer`
Modelo: `gemini-2.0-flash-lite`
Motivo: alto TPM y RPD, ideal para generación masiva y por lotes

👨‍💻 IA para programación (plugin Continue)
Alias: `dev-helper`
Modelo: `gemini-2.5-pro` (cuando no esté excedido) o `gemini-2.5-flash`
Motivo: mejor rendimiento en codificación y seguimiento de instrucciones

# .env 
GEMINI_CHAT_MODEL=gemini-2.0-flash-lite
GEMINI_BLOG_MODEL=gemini-2.0-flash-lite
GEMINI_DEV_MODEL=gemini-2.5-flash

# Ejemplo de usp en el codigo 
const model = process.env.GEMINI_CHAT_MODEL // para el asistente

# Archivos involucrados
/.env
src/pages/api/chat.ts
src/application/use-cases/chat/GenerateAIResponse.ts
src/core/ports/llm-port-interface.ts
src/infrastructure/adapters/llm/gemini-adapter.ts
src/infrastructure/adapters/llm/llm-factory.ts
src/infrastructure/config/env.ts