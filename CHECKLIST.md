# ✅ Checklist - Telegram Bot Setup

## 📋 Pre-requisitos

- [ ] Node.js instalado (v18+)
- [ ] npm instalado (v9+)
- [ ] Cuenta de Telegram
- [ ] Cuenta de Google (para Gemini API)

---

## 🤖 Paso 1: Crear Bot en Telegram

- [ ] Abrir Telegram
- [ ] Buscar `@BotFather`
- [ ] Enviar `/newbot`
- [ ] Elegir nombre: `Douglas Rujana Assistant`
- [ ] Elegir username: `douglasrujana_bot`
- [ ] **Copiar token** (guardarlo en lugar seguro)

**Token ejemplo:** `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

---

## 🔑 Paso 2: Obtener Gemini API Key

- [ ] Ir a: https://aistudio.google.com/app/apikey
- [ ] Click en "Create API Key"
- [ ] **Copiar API key** (guardarlo en lugar seguro)

---

## ⚙️ Paso 3: Configurar Proyecto

- [ ] Copiar `.env.example` a `.env`
  ```bash
  cp .env.example .env
  ```

- [ ] Editar `.env` y agregar:
  ```env
  TELEGRAM_BOT_TOKEN=tu_token_aqui
  ENABLE_TELEGRAM=true
  GEMINI_API_KEY=tu_gemini_key_aqui
  ```

- [ ] Verificar que `.env` esté en `.gitignore`

---

## 📦 Paso 4: Instalar Dependencias

- [ ] Ejecutar:
  ```bash
  npm install
  ```

- [ ] Verificar que se instaló `node-telegram-bot-api`

---

## 🚀 Paso 5: Iniciar Bot

- [ ] Ejecutar:
  ```bash
  npm run bot:telegram
  ```

- [ ] Verificar que aparezca:
  ```
  ✅ Telegram bot is running!
  📱 Users can find it at: t.me/douglasrujana_bot
  💬 Waiting for messages...
  ```

---

## 🧪 Paso 6: Probar Bot

### Opción A: Telegram Real

- [ ] Abrir Telegram
- [ ] Buscar tu bot: `@douglasrujana_bot`
- [ ] Enviar `/start`
- [ ] Verificar que responda con mensaje de bienvenida
- [ ] Probar comandos:
  - [ ] `/cv`
  - [ ] `/projects`
  - [ ] `/skills`
  - [ ] `/help`
- [ ] Probar pregunta con IA: "¿Cuántos años de experiencia tienes?"

### Opción B: Tests Locales

- [ ] Ejecutar:
  ```bash
  npm run bot:test
  ```
- [ ] Verificar que se ejecuten 6 tests sin errores

---

## 🎨 Paso 7: Personalizar (Opcional)

### Información Personal

- [ ] Editar `src/data/cv.ts` con tu información
- [ ] Actualizar URLs en `handle-telegram-message.use-case.ts`:
  - [ ] URL del CV en PDF
  - [ ] Link de Calendly
  - [ ] Email de contacto
  - [ ] Links de LinkedIn/GitHub

### Comandos

- [ ] Revisar comandos en `src/infrastructure/bots/telegram-bot.ts`
- [ ] Agregar comandos personalizados (opcional)

### Contexto IA

- [ ] Editar contexto en `handleGeneralMessage()` del use case
- [ ] Personalizar respuestas según tu perfil

---

## 🚀 Paso 8: Deploy a Producción (Opcional)

### Railway.app (Recomendado - Gratis)

- [ ] Crear cuenta en Railway.app
- [ ] Conectar repositorio de GitHub
- [ ] Agregar variables de entorno:
  - [ ] `TELEGRAM_BOT_TOKEN`
  - [ ] `GEMINI_API_KEY`
  - [ ] `ENABLE_TELEGRAM=true`
  - [ ] `NODE_ENV=production`
- [ ] Deploy automático
- [ ] Verificar logs

### VPS (Alternativa)

- [ ] Conectar a VPS via SSH
- [ ] Clonar repositorio
- [ ] Instalar dependencias
- [ ] Configurar `.env`
- [ ] Instalar PM2: `npm install -g pm2`
- [ ] Iniciar bot: `pm2 start npm --name "telegram-bot" -- run bot:telegram`
- [ ] Configurar auto-start: `pm2 startup` y `pm2 save`

---

## 📊 Paso 9: Monitoreo

- [ ] Verificar que el bot responde en Telegram
- [ ] Revisar logs en consola/PM2
- [ ] Probar todos los comandos
- [ ] Verificar respuestas de IA
- [ ] Confirmar que se registran leads

---

## 🎯 Paso 10: Promoción

- [ ] Agregar link del bot en tu portfolio
- [ ] Compartir en LinkedIn
- [ ] Agregar en tu CV
- [ ] Mencionar en README de GitHub
- [ ] Agregar badge en tu perfil

**Link del bot:** `https://t.me/douglasrujana_bot`

---

## 🔒 Seguridad

- [ ] Verificar que `.env` NO esté en Git
- [ ] No compartir token públicamente
- [ ] Usar variables de entorno en producción
- [ ] Configurar rate limiting (ya incluido)

---

## 📚 Documentación Revisada

- [ ] Leer `START_HERE.md`
- [ ] Revisar `TELEGRAM_BOT_README.md`
- [ ] Consultar `docs/TELEGRAM_BOT_SETUP.md` si hay problemas
- [ ] Ver ejemplos en `docs/TELEGRAM_BOT_EXAMPLES.md`

---

## ✅ Verificación Final

- [ ] Bot responde a `/start`
- [ ] Bot responde a comandos
- [ ] Bot responde con IA a preguntas
- [ ] Bot envía documentos (CV)
- [ ] Botones inline funcionan
- [ ] Logs se registran correctamente
- [ ] No hay errores en consola
- [ ] Bot funciona 24/7 (si está en producción)

---

## 🎉 ¡Completado!

Si marcaste todas las casillas, **¡tu bot está listo!** 🚀

### Próximos Pasos:

1. **Personaliza** las respuestas con tu información
2. **Comparte** el link del bot
3. **Monitorea** las conversaciones
4. **Itera** basándote en feedback

---

## 🐛 Troubleshooting

Si algo no funciona, revisa:

1. **Logs en consola** - ¿Hay errores?
2. **Variables de entorno** - ¿Token correcto?
3. **Documentación** - `docs/TELEGRAM_BOT_SETUP.md`
4. **Tests** - `npm run bot:test`

---

## 📞 Soporte

¿Problemas? Revisa la documentación completa en `docs/`

**¡Disfruta tu bot!** 🤖✨
