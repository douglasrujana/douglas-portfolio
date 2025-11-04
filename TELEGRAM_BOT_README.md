# 🤖 Telegram Bot - Douglas Portfolio

Bot de Telegram con IA integrada para automatizar respuestas sobre tu portfolio, CV y proyectos.

## ✨ Características

- ✅ **100% Gratis** - Telegram API sin costos
- 🤖 **IA Integrada** - Respuestas contextuales con Gemini
- 🏗️ **Arquitectura Hexagonal** - Código limpio y mantenible
- 🔄 **Multi-provider Ready** - Fácil agregar WhatsApp, Discord
- 📊 **Lead Tracking** - Registra conversaciones prometedoras
- ⚡ **Respuesta Instantánea** - <1 segundo

## 🚀 Quick Start

### 1. Crear Bot en Telegram

```bash
# 1. Abre Telegram → Busca @BotFather
# 2. Envía: /newbot
# 3. Sigue las instrucciones
# 4. Copia el token
```

### 2. Configurar

```bash
# Copiar ejemplo
cp .env.example .env

# Editar .env
TELEGRAM_BOT_TOKEN=tu_token_aqui
ENABLE_TELEGRAM=true
GEMINI_API_KEY=tu_gemini_key
```

### 3. Instalar y Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar bot
npm run bot:telegram
```

**¡Listo!** Busca tu bot en Telegram y envía `/start`

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `/start` | Mensaje de bienvenida |
| `/cv` | Ver curriculum completo |
| `/projects` | Proyectos destacados |
| `/skills` | Stack técnico |
| `/schedule` | Agendar llamada |
| `/contact` | Información de contacto |
| `/help` | Ayuda |

**Plus:** Escribe cualquier pregunta en lenguaje natural y el bot responderá con IA.

## 🏗️ Arquitectura

```
src/
├── core/
│   └── ports/
│       └── messaging.port.ts          # Interface (Puerto)
│
├── infrastructure/
│   ├── adapters/
│   │   └── messaging/
│   │       ├── telegram-adapter.ts    # Implementación Telegram
│   │       └── messaging-factory.ts   # Factory Pattern
│   └── bots/
│       └── telegram-bot.ts            # Configuración del bot
│
└── application/
    └── use-cases/
        └── handle-telegram-message.use-case.ts  # Lógica de negocio
```

**Ventajas:**
- ✅ Cambiar de Telegram a WhatsApp = 1 línea de código
- ✅ Testeable sin APIs reales
- ✅ Zero vendor lock-in
- ✅ Fácil de mantener

## 🎯 Flujo de Conversación

```
Usuario: "Hola"
Bot: 👋 ¡Hola! Soy el asistente de Douglas Rujana...

Usuario: "¿Cuántos años de experiencia tienes?"
Bot: Douglas tiene 5+ años de experiencia como Full Stack Developer...

Usuario: "Muéstrame tu CV"
Bot: 📄 Aquí está el CV completo [PDF]

Usuario: "¿Estás disponible para freelance?"
Bot: Sí, Douglas está disponible para proyectos freelance...
     ¿Te gustaría agendar una llamada? [Botón: Agendar]
```

## 🔧 Personalización

### Cambiar Respuestas

Edita: `src/application/use-cases/handle-telegram-message.use-case.ts`

```typescript
private async handleCVRequest(message: IncomingMessage): Promise<void> {
  await this.messaging.sendMessage(
    message.chatId,
    `📄 *Tu mensaje personalizado aquí*`,
    { parseMode: 'Markdown' }
  );
}
```

### Agregar Comandos

Edita: `src/infrastructure/bots/telegram-bot.ts`

```typescript
this.messaging.onCommand('nuevo', async (message: IncomingMessage) => {
  await this.messaging.sendMessage(
    message.chatId,
    'Tu respuesta aquí'
  );
});
```

### Modificar Contexto IA

Busca `handleGeneralMessage()` y edita:

```typescript
const context = `Eres el asistente de [TU NOMBRE]...`;
```

## 📊 Analytics & Leads

El bot registra automáticamente:
- ✅ Mensajes recibidos
- ✅ Comandos ejecutados
- ✅ Leads prometedores (menciones de "contratar", "proyecto", etc.)
- ✅ Intenciones detectadas

Logs en consola:
```json
{
  "timestamp": "2025-01-20T10:30:00.000Z",
  "userId": "123456789",
  "userName": "John Doe",
  "message": "¿Estás disponible para un proyecto?",
  "intent": "general",
  "isPromising": true
}
```

## 🚀 Deploy Producción

### Opción 1: VPS (DigitalOcean, AWS)

```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
pm2 start npm --name "telegram-bot" -- run bot:telegram

# Auto-start en reboot
pm2 startup
pm2 save

# Ver logs
pm2 logs telegram-bot
```

### Opción 2: Railway.app (Gratis)

1. Conecta tu repo de GitHub
2. Agrega variables de entorno:
   - `TELEGRAM_BOT_TOKEN`
   - `GEMINI_API_KEY`
   - `ENABLE_TELEGRAM=true`
3. Deploy automático ✅

### Opción 3: Render.com (Gratis)

1. New → Background Worker
2. Conecta repo
3. Start Command: `npm run bot:telegram`
4. Agrega env vars

## 💰 Costos

| Servicio | Costo | Límites |
|----------|-------|---------|
| **Telegram Bot API** | $0 | Ilimitado |
| **Gemini API** | $0 | 15 req/min, 1500/día |
| **Hosting (Railway)** | $0 | 500 hrs/mes |
| **Total** | **$0/mes** | ✅ |

## 🔒 Seguridad

### ⚠️ IMPORTANTE

- ❌ NUNCA subas `.env` a GitHub
- ❌ NUNCA compartas tu token
- ✅ Usa variables de entorno
- ✅ Agrega `.env` al `.gitignore`

### Si tu token se compromete:

```bash
# 1. Ve a @BotFather en Telegram
# 2. Envía: /revoke
# 3. Selecciona tu bot
# 4. Obtén nuevo token
# 5. Actualiza .env
```

## 🐛 Troubleshooting

### Bot no responde

**Checklist:**
- [ ] ¿El script está corriendo?
- [ ] ¿Token correcto en `.env`?
- [ ] ¿Hay errores en consola?
- [ ] ¿Tienes internet?

### Error: 401 Unauthorized

**Solución:** Token inválido
1. Ve a @BotFather
2. `/token` → Selecciona tu bot
3. Copia nuevo token
4. Actualiza `.env`

### Error: 409 Conflict

**Causa:** Bot corriendo en otro lugar

**Solución:**
1. Detén todas las instancias
2. Espera 30 segundos
3. Reinicia

### IA no responde

**Checklist:**
- [ ] ¿Tienes `GEMINI_API_KEY`?
- [ ] ¿La key es válida?
- [ ] ¿Tienes cuota disponible?

Verifica en: https://aistudio.google.com/app/apikey

## 📚 Documentación

- **Quick Start:** `docs/TELEGRAM_BOT_QUICKSTART.md`
- **Setup Completo:** `docs/TELEGRAM_BOT_SETUP.md`
- **Telegram API:** https://core.telegram.org/bots/api
- **Gemini API:** https://ai.google.dev/docs

## 🎯 Próximos Pasos

### Fase 2: Agregar WhatsApp
- Implementar `WhatsAppAdapter`
- Usar Twilio o Baileys
- Mismo use case, diferente adapter

### Fase 3: Analytics Dashboard
- Guardar leads en Notion
- Dashboard de métricas
- Lead scoring automático

### Fase 4: Multi-idioma
- Detectar idioma del usuario
- Respuestas en inglés/español
- Contexto adaptativo

## 🤝 Contribuir

¿Mejoras? ¡Pull requests bienvenidos!

1. Fork el proyecto
2. Crea tu feature branch
3. Commit tus cambios
4. Push al branch
5. Abre un Pull Request

## 📧 Soporte

¿Problemas? Abre un issue en GitHub.

---

**Hecho con ❤️ y arquitectura hexagonal**

🚀 **¡Disfruta tu bot!**
