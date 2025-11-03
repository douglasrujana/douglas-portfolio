# 🚀 Douglas Rujana - Portfolio Personal

Portfolio profesional construido con arquitectura hexagonal, Astro, SvelteKit y Gemini AI.

## 🎯 Características

- ✨ **Diseño Jony Ive**: Minimalismo elegante y atemporal
- 🏗️ **Arquitectura Hexagonal**: SOLID, Clean Code, Zero Vendor Lock-in
- 🤖 **IA Integrada**: Chatbot con Gemini (free tier)
- 📝 **Blog Potente**: Auto-publicación multi-canal
- 📱 **WhatsApp Bot**: Respuestas automáticas
- 🎨 **SvelteKit**: Componentes reactivos ultra-rápidos
- ⚡ **Astro**: Rendimiento excepcional con SSG
- 🔄 **Adaptadores**: Cambia de LLM en 2 líneas de código
- 🐳 **Multi-deployment**: Vercel, Netlify, Cloudflare, Docker

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Cuenta de Google Cloud (para Gemini API - gratis)

## 🛠️ Instalación

### 1. Clonar o ejecutar el script de setup

```bash
# Si tienes el script setup.sh
chmod +x setup.sh
./setup.sh
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y agrega tu API key de Gemini:

```env
# Obligatorio
GEMINI_API_KEY=tu_api_key_aqui

# Opcional (para features avanzadas)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
WHATSAPP_NUMBER=
```

### 3. Obtener API Key de Gemini (GRATIS)

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea un proyecto (si no tienes uno)
3. Genera una API key
4. Copia y pega en tu `.env`

**Free Tier incluye:**
- 15 requests/minuto
- 1 millón de tokens/día
- ¡Suficiente para tu portfolio!

### 4. Instalar dependencias

```bash
npm install
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) 🎉

## 📁 Estructura del Proyecto

```
douglas-portfolio/
├── src/
│   ├── core/                      # DOMAIN LAYER (lógica de negocio pura)
│   │   ├── entities/              # Entidades del dominio
│   │   ├── value-objects/         # Value Objects
│   │   └── ports/                 # Interfaces (contratos)
│   │       └── ILLMProvider.ts    # ✅ Creado
│   │
│   ├── application/               # APPLICATION LAYER (use cases)
│   │   ├── use-cases/
│   │   │   ├── chat/
│   │   │   ├── blog/
│   │   │   └── whatsapp/
│   │   └── dto/
│   │
│   ├── infrastructure/            # INFRASTRUCTURE LAYER (adapters)
│   │   ├── adapters/
│   │   │   ├── llm/
│   │   │   │   ├── GeminiAdapter.ts   # ✅ Creado
│   │   │   │   └── LLMFactory.ts      # ✅ Creado
│   │   │   ├── blog/
│   │   │   ├── notifications/
│   │   │   └── social/
│   │   ├── config/
│   │   │   └── env.ts             # ✅ Creado
│   │   └── utils/
│   │
│   ├── presentation/              # PRESENTATION LAYER (UI)
│   │   ├── components/            # Componentes Svelte
│   │   └── islands/               # Astro Islands
│   │
│   ├── pages/                     # Rutas de Astro
│   ├── content/                   # Content Collections
│   └── styles/
│       └── jony-ive.css           # ✅ Creado
│
├── tests/
├── docs/
└── scripts/
```

## 🎨 Design System

El proyecto usa un Design System inspirado en Jony Ive:

### Colores

```css
--color-white: #ffffff
--color-gray-900: #171717
--color-accent: #007AFF (iOS Blue)
```

### Componentes Disponibles

```css
.btn-jony          /* Botón base */
.btn-primary       /* Botón primario */
.btn-secondary     /* Botón secundario */
.btn-ghost         /* Botón fantasma */
.card-jony         /* Card minimalista */
.input-jony        /* Input field */
.badge-jony        /* Tag/Badge */
```

### Uso en Svelte

```svelte
<button class="btn-jony btn-primary">
  Click me
</button>
```

## 🤖 Uso del LLM (Gemini)

### Ejemplo básico

```typescript
import { LLMFactory } from '@infrastructure/adapters/llm/LLMFactory';
import { env } from '@infrastructure/config/env';

// Crear instancia
const llm = LLMFactory.create('gemini', {
  apiKey: env.GEMINI_API_KEY,
  model: 'gemini-1.5-flash'
});

// Generar respuesta
const response = await llm.generateResponse(
  "¿Qué hace Douglas?",
  ["Douglas es desarrollador Full Stack", "Especialista en IA"],
  { temperature: 0.7, maxTokens: 512 }
);

console.log(response.content);
```

### Cambiar a otro LLM

```typescript
// Cambia 'gemini' por 'openai' o 'claude'
const llm = LLMFactory.create('openai', {
  apiKey: env.OPENAI_API_KEY,
  model: 'gpt-4o-mini'
});

// ¡Todo lo demás funciona igual!
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
npm run lint:fix     # Fix automático
npm run format       # Format código
npm run test         # Tests
npm run test:ui      # Tests con UI
npm run type-check   # Verificar tipos
```

## 🚀 Deployment

### Vercel (recomendado)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### Docker (self-hosting)

```bash
docker build -t douglas-portfolio .
docker run -p 4321:4321 douglas-portfolio
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Con UI
npm run test:ui

# Con coverage
npm run test:coverage
```

## 📚 Próximos Pasos

### Sprint 1: Componentes Base (Esta semana)
- [ ] Button.svelte
- [ ] Card.svelte
- [ ] Input.svelte
- [ ] Hero section

### Sprint 2: Blog System (Semana 2)
- [ ] Content Collections
- [ ] Blog listing page
- [ ] Post template
- [ ] Reading progress

### Sprint 3: IA Features (Semana 3)
- [ ] ChatWidget.svelte
- [ ] API route para chat
- [ ] WhatsApp webhook
- [ ] Rate limiting

### Sprint 4: Cross-posting (Semana 4)
- [ ] LinkedIn adapter
- [ ] Twitter adapter
- [ ] Auto-publish script
- [ ] Analytics

## 🎓 Recursos

- [Astro Docs](https://docs.astro.build)
- [Svelte Docs](https://svelte.dev/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

## 📄 Licencia

MIT © Douglas Rujana

## 🤝 Contribuir

Este es un proyecto personal, pero sugerencias son bienvenidas!

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Douglas Rujana - [@douglasrujana](https://linkedin.com/in/douglasrujana)

---

**Hecho con ❤️ y arquitectura limpia**
