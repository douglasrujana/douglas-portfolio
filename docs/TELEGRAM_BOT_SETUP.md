# 🤖 Telegram Bot - Guía de Configuración

## 📋 Tabla de Contenidos
1. [Crear el Bot en Telegram](#1-crear-el-bot-en-telegram)
2. [Configurar Variables de Entorno](#2-configurar-variables-de-entorno)
3. [Ejecutar el Bot](#3-ejecutar-el-bot)
4. [Probar el Bot](#4-probar-el-bot)
5. [Comandos Disponibles](#5-comandos-disponibles)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Crear el Bot en Telegram

### Paso 1: Abrir BotFather
1. Abre Telegram en tu teléfono o desktop
2. Busca: `@BotFather`
3. Inicia conversación con `/start`

### Paso 2: Crear el Bot
```
Tú: /newbot

BotFather: Alright, a new bot. How are we going to call it? 
           Please choose a name for your bot.

Tú: Douglas Rujana Assistant

BotFather: Good. Now let's choose a username for your bot. 
           It must end in `bot`. Like this, for example: TetrisBot or tetris_bot.

Tú: douglasrujana_bot

BotFather: Done! Congratulations on your new bot. You will find it at 
           t.me/douglasrujana_bot. You can now add a description...

           Use this token to access the HTTP API:
           1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890

           Keep your token secure and store it safely, it can be used by 
           anyone to control your bot.
```

### Paso 3: Copiar el Token
**⚠️ IMPORTANTE:** Guarda el token que te dio BotFather. Lo necesitarás en el siguiente paso.

Ejemplo de token:
```
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
```

### Paso 4: Configurar el Bot (Opcional)
```bash
# Agregar descripción
/setdescription
# Luego escribe: "Asistente personal de Douglas Rujana - Full Stack + AI Developer"

# Agregar foto de perfil
/setuserpic
# Sube una foto

# Configurar comandos (para autocompletado)
/setcommands
# Luego pega:
start - Mensaje de bienvenida
cv - Ver curriculum completo
projects - Proyectos destacados
skills - Stack técnico
schedule - Agendar llamada
contact - Información de contacto
help - Ayuda
```

---

## 2. Configurar Variables de Entorno

### Paso 1: Copiar .env.example
```bash
cp .env.example .env
```

### Paso 2: Editar .env
Abre el archivo `.env` y agrega tu token de Telegram:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
ENABLE_TELEGRAM=true

# Gemini API (necesario para respuestas con IA)
GEMINI_API_KEY=tu_api_key_de_gemini
```

### Paso 3: Obtener Gemini API Key (si no la tienes)
1. Ve a: https://aistudio.google.com/app/apikey
2. Click en "Create API Key"
3. Copia la key y pégala en `.env`

---

## 3. Ejecutar el Bot

### Opción 1: Modo Desarrollo (Recomendado)
```bash
npm run bot:telegram
```

Verás algo como:
```
🚀 Starting Telegram Bot...

🔧 Environment Configuration:
  • Primary LLM Provider: gemini
  • Chat Model (fast): gemini-2.0-flash-lite
  • Features:
    - Chatbot: ✅
    - Telegram: ✅
    - WhatsApp: ❌

🤖 Telegram bot started
✅ Telegram bot is running!
📱 Users can find it at: t.me/douglasrujana_bot
💬 Waiting for messages...
```

### Opción 2: Modo Producción (con PM2)
```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
pm2 start npm --name "telegram-bot" -- run bot:telegram

# Ver logs
pm2 logs telegram-bot

# Detener bot
pm2 stop telegram-bot

# Reiniciar bot
pm2 restart telegram-bot
```

---

## 4. Probar el Bot

### Paso 1: Buscar tu Bot
1. Abre Telegram
2. Busca: `@douglasrujana_bot` (o el nombre que elegiste)
3. Click en "Start" o envía `/start`

### Paso 2: Probar Comandos
```
/start    → Mensaje de bienvenida
/cv       → Ver curriculum
/projects → Ver proyectos
/skills   → Stack técnico
/help     → Ayuda
```

### Paso 3: Probar IA
Escribe cualquier pregunta en lenguaje natural:
```
"¿Cuántos años de experiencia tienes?"
"¿Trabajas con React?"
"¿Estás disponible para freelance?"
```

El bot responderá usando Gemini AI 🤖

---

## 5. Comandos Disponibles

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `/start` | Mensaje de bienvenida con opciones | `/start` |
| `/cv` | Envía el CV en PDF | `/cv` |
| `/projects` | Muestra proyectos destacados | `/projects` |
| `/skills` | Lista el stack técnico | `/skills` |
| `/schedule` | Link para agendar llamada | `/schedule` |
| `/contact` | Información de contacto | `/contact` |
| `/help` | Ayuda y comandos disponibles | `/help` |

**Además:** Puedes escribir cualquier pregunta en lenguaje natural y el bot responderá con IA.

---

## 6. Troubleshooting

### Error: "TELEGRAM_BOT_TOKEN is not configured"
**Solución:** Verifica que tu `.env` tenga el token correcto:
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
ENABLE_TELEGRAM=true
```

### Error: "401 Unauthorized"
**Causa:** Token inválido o revocado.

**Solución:**
1. Ve a @BotFather en Telegram
2. Envía `/token`
3. Selecciona tu bot
4. Copia el nuevo token
5. Actualiza `.env`

### Error: "409 Conflict: terminated by other getUpdates request"
**Causa:** El bot está corriendo en otro lugar (otra terminal, servidor, etc.)

**Solución:**
1. Detén todas las instancias del bot
2. Espera 30 segundos
3. Vuelve a iniciar

### El bot no responde
**Checklist:**
- [ ] ¿El script está corriendo? (`npm run bot:telegram`)
- [ ] ¿Hay errores en la consola?
- [ ] ¿El token es correcto?
- [ ] ¿Tienes internet?
- [ ] ¿El bot está bloqueado? (revisa en Telegram)

### Respuestas de IA no funcionan
**Checklist:**
- [ ] ¿Tienes `GEMINI_API_KEY` en `.env`?
- [ ] ¿La API key es válida?
- [ ] ¿Tienes cuota disponible en Gemini?

**Verificar cuota:**
https://aistudio.google.com/app/apikey

---

## 🎯 Próximos Pasos

### Personalizar Respuestas
Edita: `src/application/use-cases/handle-telegram-message.use-case.ts`

### Agregar Más Comandos
Edita: `src/infrastructure/bots/telegram-bot.ts`

### Cambiar el Contexto de IA
Busca la función `handleGeneralMessage()` y modifica el `context`.

### Agregar Analytics
Implementa logging en `logLead()` para guardar en base de datos o Notion.

---

## 📊 Métricas y Logs

El bot registra automáticamente:
- Mensajes recibidos
- Comandos ejecutados
- Leads prometedores
- Errores

Revisa los logs en la consola:
```bash
📨 Message from John Doe (@johndoe): ¿Cuántos años de experiencia tienes?
📊 New lead: {
  "timestamp": "2025-01-20T10:30:00.000Z",
  "userId": "123456789",
  "userName": "John Doe",
  "username": "johndoe",
  "message": "¿Cuántos años de experiencia tienes?",
  "intent": "general",
  "isPromising": false
}
```

---

## 🔒 Seguridad

### ⚠️ NUNCA compartas tu token
- No lo subas a GitHub
- No lo pongas en código
- Usa variables de entorno

### Agregar .env al .gitignore
```bash
echo ".env" >> .gitignore
```

### Rotar token si se compromete
1. Ve a @BotFather
2. `/revoke`
3. Selecciona tu bot
4. Obtén nuevo token

---

## 💰 Costos

**Telegram Bot API:** ✅ **100% GRATIS**
- Sin límites de mensajes
- Sin límites de usuarios
- Sin costos ocultos

**Gemini API:** ✅ **GRATIS** (con límites)
- 15 requests/minuto
- 1500 requests/día
- Suficiente para uso personal

**Total:** **$0/mes** 🎉

---

## 🚀 Deploy en Producción

### Opción 1: VPS (DigitalOcean, AWS, etc.)
```bash
# Clonar repo
git clone https://github.com/tu-usuario/douglas-portfolio.git
cd douglas-portfolio

# Instalar dependencias
npm install

# Configurar .env
nano .env

# Iniciar con PM2
pm2 start npm --name "telegram-bot" -- run bot:telegram
pm2 save
pm2 startup
```

### Opción 2: Railway.app (Gratis)
1. Conecta tu repo de GitHub
2. Agrega variables de entorno
3. Deploy automático

### Opción 3: Render.com (Gratis)
1. Conecta tu repo
2. Tipo: Background Worker
3. Start Command: `npm run bot:telegram`

---

## 📚 Recursos

- [Telegram Bot API Docs](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Gemini API Docs](https://ai.google.dev/docs)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

---

## 🤝 Soporte

¿Problemas? Abre un issue en GitHub o contacta a Douglas.

**¡Disfruta tu bot!** 🎉
