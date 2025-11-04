# 🚀 EMPIEZA AQUÍ - Telegram Bot

## ⚡ Setup en 5 Minutos

### 1️⃣ Crear Bot en Telegram (2 min)

1. Abre Telegram
2. Busca: **@BotFather**
3. Envía: `/newbot`
4. Nombre: `Douglas Rujana Assistant`
5. Username: `douglasrujana_bot` (debe terminar en "bot")
6. **Copia el token** que te da (algo como: `1234567890:ABCdef...`)

### 2️⃣ Configurar Variables (1 min)

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Abre `.env` y agrega:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=PEGA_TU_TOKEN_AQUI
TELEGRAM_BOT_USERNAME=tu_bot_username
ENABLE_TELEGRAM=true

# Gemini AI (si no lo tienes, ve a: https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=PEGA_TU_GEMINI_KEY_AQUI

# Opcional - URLs (puedes dejarlas vacías por ahora)
# CV_PDF_URL=https://tu-dominio.com/cv.pdf
# CALENDLY_URL=https://calendly.com/tu-usuario/30min
```

**Notas:**
- `TELEGRAM_BOT_USERNAME`: El username que elegiste (sin @). Ejemplo: `douglasrujana_bot`
- Si no configuras `CV_PDF_URL`, el bot funciona igual pero no envía el PDF (solo texto)
- El icono de Telegram aparecerá automáticamente en tu portfolio (Hero y About)

### 3️⃣ Instalar Dependencias (1 min)

```bash
npm install
```

### 4️⃣ Iniciar Bot (1 min)

```bash
npm run bot:telegram
```

Deberías ver:

```
✅ Telegram bot is running!
📱 Users can find it at: t.me/douglasrujana_bot
💬 Waiting for messages...
```

### 5️⃣ Probar (30 seg)

1. Abre Telegram
2. Busca tu bot: `@douglasrujana_bot`
3. Envía: `/start`

**¡Listo!** 🎉

---

## 🧪 Probar Sin Telegram Real

Si quieres probar la lógica sin enviar mensajes reales:

```bash
npm run bot:test
```

Esto ejecutará conversaciones simuladas en tu terminal.

---

## 📋 Comandos Disponibles

Una vez que el bot esté corriendo, prueba estos comandos en Telegram:

```
/start    → Mensaje de bienvenida
/cv       → Ver curriculum
/projects → Ver proyectos
/skills   → Stack técnico
/schedule → Agendar llamada
/contact  → Información de contacto
/help     → Ayuda
```

**O escribe cualquier pregunta:**
- "¿Cuántos años de experiencia tienes?"
- "¿Trabajas con React?"
- "¿Estás disponible para freelance?"

---

## 🔧 Personalizar

### Cambiar Respuestas

Edita: `src/application/use-cases/handle-telegram-message.use-case.ts`

### Agregar Comandos

Edita: `src/infrastructure/bots/telegram-bot.ts`

### Modificar Contexto IA

Busca `handleGeneralMessage()` en el use case y edita el `context`.

---

## 📚 Documentación Completa

- **Quick Start:** `docs/TELEGRAM_BOT_QUICKSTART.md`
- **Setup Completo:** `docs/TELEGRAM_BOT_SETUP.md`
- **Ejemplos:** `docs/TELEGRAM_BOT_EXAMPLES.md`
- **README:** `TELEGRAM_BOT_README.md`
- **Resumen:** `IMPLEMENTATION_SUMMARY.md`

---

## 🐛 Problemas Comunes

### "TELEGRAM_BOT_TOKEN is not configured"

**Solución:** Verifica que `.env` tenga el token correcto.

### "401 Unauthorized"

**Solución:** Token inválido. Ve a @BotFather → `/token` → Copia nuevo token.

### "409 Conflict"

**Solución:** Bot corriendo en otro lugar. Detén todas las instancias y reinicia.

### Bot no responde

**Checklist:**
- [ ] ¿El script está corriendo?
- [ ] ¿Token correcto en `.env`?
- [ ] ¿Hay errores en consola?

---

## 🚀 Deploy a Producción

### Railway.app (Gratis)

1. Conecta tu repo de GitHub
2. Agrega variables de entorno:
   - `TELEGRAM_BOT_TOKEN`
   - `GEMINI_API_KEY`
   - `ENABLE_TELEGRAM=true`
3. Deploy automático

### VPS (DigitalOcean, AWS)

```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
pm2 start npm --name "telegram-bot" -- run bot:telegram

# Auto-start en reboot
pm2 startup
pm2 save
```

---

## 💰 Costos

**TODO GRATIS:**
- ✅ Telegram Bot API: $0
- ✅ Gemini API: $0 (15 req/min)
- ✅ Hosting Railway: $0 (500 hrs/mes)

**Total: $0/mes** 🎉

---

## 🎯 Próximos Pasos

1. ✅ **Personaliza las respuestas** con tu información
2. ✅ **Agrega tu CV en PDF** (actualiza la URL en el use case)
3. ✅ **Configura Calendly** (actualiza el link)
4. ✅ **Deploy a producción** (Railway o VPS)
5. ✅ **Comparte el link** del bot en tu LinkedIn/portfolio

---

## 🤝 Soporte

¿Problemas? Revisa la documentación completa en `docs/`

**¡Disfruta tu bot!** 🚀🤖

---

## 📊 Arquitectura

Este bot usa **Arquitectura Hexagonal**:

```
Core (Dominio) → Application (Casos de Uso) → Infrastructure (Adapters)
```

**Ventajas:**
- ✅ Cambiar de Telegram a WhatsApp = 1 línea
- ✅ Testeable sin APIs reales
- ✅ Fácil de mantener

Ver más: `IMPLEMENTATION_SUMMARY.md`
