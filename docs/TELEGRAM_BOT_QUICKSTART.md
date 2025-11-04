# 🚀 Telegram Bot - Quick Start (5 minutos)

## 1️⃣ Crear Bot en Telegram

1. Abre Telegram → Busca `@BotFather`
2. Envía: `/newbot`
3. Nombre: `Douglas Rujana Assistant`
4. Username: `douglasrujana_bot`
5. **Copia el token** que te da

## 2️⃣ Configurar .env

```bash
# Copia el ejemplo
cp .env.example .env

# Edita .env y agrega:
TELEGRAM_BOT_TOKEN=tu_token_aqui
ENABLE_TELEGRAM=true
GEMINI_API_KEY=tu_gemini_key_aqui
```

## 3️⃣ Instalar Dependencias

```bash
npm install
```

## 4️⃣ Iniciar Bot

```bash
npm run bot:telegram
```

Verás:
```
✅ Telegram bot is running!
📱 Users can find it at: t.me/douglasrujana_bot
💬 Waiting for messages...
```

## 5️⃣ Probar

1. Abre Telegram
2. Busca tu bot: `@douglasrujana_bot`
3. Envía: `/start`

**¡Listo!** 🎉

---

## Comandos Disponibles

```
/start    - Bienvenida
/cv       - Ver CV
/projects - Proyectos
/skills   - Stack técnico
/help     - Ayuda
```

O escribe cualquier pregunta: *"¿Cuántos años de experiencia tienes?"*

---

## Troubleshooting

**Error: Token not configured**
→ Verifica que `.env` tenga `TELEGRAM_BOT_TOKEN`

**Error: 401 Unauthorized**
→ Token inválido, genera uno nuevo en @BotFather

**Bot no responde**
→ Verifica que el script esté corriendo

---

## Personalizar

**Cambiar respuestas:**
`src/application/use-cases/handle-telegram-message.use-case.ts`

**Agregar comandos:**
`src/infrastructure/bots/telegram-bot.ts`

**Modificar contexto IA:**
Busca `handleGeneralMessage()` y edita el `context`

---

## Deploy Producción

**Opción 1: VPS**
```bash
pm2 start npm --name "telegram-bot" -- run bot:telegram
```

**Opción 2: Railway.app** (Gratis)
- Conecta GitHub
- Agrega env vars
- Deploy

---

**Documentación completa:** `docs/TELEGRAM_BOT_SETUP.md`
