# 💬 Telegram Bot - Ejemplos de Conversación

## 📋 Índice
1. [Conversación Básica](#conversación-básica)
2. [Solicitud de CV](#solicitud-de-cv)
3. [Consulta de Proyectos](#consulta-de-proyectos)
4. [Lead Prometedor](#lead-prometedor)
5. [Preguntas Técnicas](#preguntas-técnicas)

---

## Conversación Básica

### Ejemplo 1: Primera Interacción

```
👤 Usuario: /start

🤖 Bot:
👋 ¡Hola Usuario!

Soy el asistente de Douglas Rujana

Full Stack + AI Developer
5+ años de experiencia

Comandos disponibles:
/cv - Ver curriculum completo
/projects - Proyectos destacados
/skills - Stack técnico
/schedule - Agendar llamada
/contact - Información de contacto
/help - Ver esta ayuda

O simplemente escribe tu pregunta y te responderé con IA 🤖

[Botones]
📄 Ver CV | 🚀 Proyectos
📅 Agendar Llamada
```

---

## Solicitud de CV

### Ejemplo 2: Usuario Pide CV

```
👤 Usuario: Quiero ver tu CV

🤖 Bot:
📄 CV de Douglas Rujana

Full Stack + AI Developer
5+ años de experiencia

Highlights:
✅ Arquitectura Hexagonal & Clean Code
✅ TypeScript, Node.js, Laravel, Python
✅ IA Integration (Gemini, OpenAI)
✅ Cloud-native (AWS, Docker, K8s)
✅ DevOps & CI/CD

Te envío el PDF completo...

[Envía PDF: cv-douglas-rujana.pdf]

🤖 Bot:
¿Te gustaría ver proyectos destacados o agendar una llamada?

[Botones]
🚀 Ver Proyectos | 📅 Agendar Llamada
```

### Ejemplo 3: Comando /cv

```
👤 Usuario: /cv

🤖 Bot:
[Mismo comportamiento que arriba]
```

---

## Consulta de Proyectos

### Ejemplo 4: Ver Proyectos

```
👤 Usuario: Muéstrame tus proyectos

🤖 Bot:
🚀 Proyectos Destacados

1. AI Chat System
• Gemini + Astro + Svelte
• Real-time streaming
• Context-aware responses
• Rate limiting built-in
🔗 Ver demo

2. Blog Platform con IA
• MDX + Cross-posting automation
• SEO optimized
• ATS-friendly CV integration
🔗 Ver blog

3. E-commerce Laravel
• Arquitectura hexagonal
• Microservices migration
• 15+ deployments exitosos
🔗 Case study

4. Este Bot de Telegram
• Arquitectura limpia
• Multi-provider ready
• IA integration
🔗 Ver código
```

---

## Lead Prometedor

### Ejemplo 5: Reclutador Interesado

```
👤 Usuario: Hola, soy reclutador de TechCorp. Estamos buscando 
           un Full Stack Developer para un proyecto de 6 meses.

🤖 Bot:
¡Hola! Gracias por contactar. Douglas es Full Stack + AI Developer 
con 5+ años de experiencia, especializado en:

• Arquitectura Hexagonal y Clean Code
• TypeScript, Node.js, Laravel, Python
• Integración de IA (Gemini, OpenAI)
• Cloud-native (AWS, Docker, K8s)

Está disponible para proyectos freelance y posiciones full-time remotas.

¿Te gustaría ver el CV completo o agendar una llamada?

[Botones]
📄 Ver CV | 📅 Agendar

[Backend Log]
📊 New lead: {
  "isPromising": true,
  "intent": "general",
  "keywords": ["reclutador", "proyecto"]
}
```

### Ejemplo 6: Consulta de Disponibilidad

```
👤 Usuario: ¿Estás disponible para freelance?

🤖 Bot:
Sí, Douglas está disponible para proyectos freelance y posiciones 
full-time remotas.

Especialidades:
• Desarrollo Full Stack (Frontend + Backend)
• Integración de IA en aplicaciones
• Arquitectura de software escalable
• DevOps y automatización

El rango salarial depende del proyecto y la posición. 
¿Te gustaría agendar una llamada para discutir los detalles?

[Botones]
📅 Agendar Llamada | 📧 Enviar Email
```

---

## Preguntas Técnicas

### Ejemplo 7: Consulta de Stack

```
👤 Usuario: ¿Trabajas con React?

🤖 Bot:
Sí, Douglas trabaja con React y otras tecnologías frontend modernas.

Stack Frontend:
• Astro, Svelte, React
• Tailwind CSS, CSS-in-JS
• SSR, SSG, SPA

También tiene experiencia con:
• TypeScript (preferido)
• State management (Zustand, Redux)
• Testing (Vitest, Playwright)

¿Te gustaría ver proyectos específicos con React o conocer 
más sobre su stack técnico completo?

[Botones]
🚀 Ver Proyectos | 💻 Stack Completo
```

### Ejemplo 8: Comando /skills

```
👤 Usuario: /skills

🤖 Bot:
💻 Stack Técnico

Backend:
• Node.js, TypeScript, Laravel, Python
• Arquitectura Hexagonal, DDD, SOLID
• REST APIs, GraphQL, gRPC

Frontend:
• Astro, Svelte, React
• Tailwind CSS, CSS-in-JS
• SSR, SSG, SPA

IA & ML:
• Gemini AI, OpenAI, Claude
• LangChain, Vector DBs
• Prompt Engineering

DevOps & Cloud:
• Docker, Kubernetes
• AWS, Vercel, Cloudflare
• CI/CD (GitHub Actions)

Databases:
• PostgreSQL, MySQL, MongoDB
• Redis, Elasticsearch

¿Quieres saber más sobre alguna tecnología específica?
```

---

## Agendar Llamada

### Ejemplo 9: Solicitud de Reunión

```
👤 Usuario: Me gustaría agendar una llamada

🤖 Bot:
📅 Agendar una Llamada

Perfecto! Puedes agendar una llamada de 30 minutos para:
• Discutir oportunidades laborales
• Revisar proyectos en detalle
• Consultoría técnica
• Colaboraciones

Elige un horario que te convenga:

[Botones]
📅 Ver Disponibilidad | 📧 Enviar Email
```

### Ejemplo 10: Comando /schedule

```
👤 Usuario: /schedule

🤖 Bot:
[Mismo comportamiento que arriba]
```

---

## Contacto Directo

### Ejemplo 11: Comando /contact

```
👤 Usuario: /contact

🤖 Bot:
📧 Contacto Directo

Douglas Rujana
Full Stack + AI Developer

📧 Email: douglas@example.com
💼 LinkedIn: linkedin.com/in/douglasrujana
🐙 GitHub: github.com/douglasrujana
🌐 Portfolio: douglasrujana.com
📅 Calendly: calendly.com/douglas/30min

Ubicación: Ecuador 🇪🇨
Zona Horaria: GMT-5 (ECT)

Disponibilidad:
✅ Proyectos freelance
✅ Posiciones full-time remotas
✅ Consultoría técnica

¿Prefieres agendar una llamada?

[Botones]
📅 Agendar Llamada | 📧 Enviar Email | 💼 Ver LinkedIn
```

---

## Preguntas con IA

### Ejemplo 12: Pregunta Abierta

```
👤 Usuario: ¿Cuántos años de experiencia tienes?

🤖 Bot:
Douglas tiene más de 5 años de experiencia como Full Stack Developer, 
trabajando en proyectos que van desde startups hasta empresas 
establecidas.

Su experiencia incluye:
• Desarrollo de aplicaciones web escalables
• Integración de IA en productos
• Arquitectura de software (Hexagonal, DDD)
• DevOps y automatización

Ha trabajado con tecnologías como TypeScript, Node.js, Laravel, 
Python, y frameworks modernos como Astro, Svelte y React.

¿Te gustaría ver su CV completo o conocer proyectos específicos?

[Botones]
📄 Ver CV | 🚀 Ver Proyectos
```

### Ejemplo 13: Pregunta Específica

```
👤 Usuario: ¿Tienes experiencia con microservicios?

🤖 Bot:
Sí, Douglas tiene experiencia diseñando e implementando arquitecturas 
de microservicios.

Experiencia relevante:
• Migración de monolito a microservicios en e-commerce Laravel
• Implementación de comunicación entre servicios (REST, gRPC)
• Orquestación con Docker y Kubernetes
• CI/CD para múltiples servicios

También aplica principios de:
• Domain-Driven Design (DDD)
• Arquitectura Hexagonal
• Event-driven architecture

¿Te gustaría ver un caso de estudio específico?
```

---

## Ayuda

### Ejemplo 14: Comando /help

```
👤 Usuario: /help

🤖 Bot:
🤖 Ayuda - Bot de Douglas Rujana

Comandos:
/start - Mensaje de bienvenida
/cv - Ver curriculum
/projects - Ver proyectos
/skills - Stack técnico
/schedule - Agendar llamada
/contact - Contacto directo

Uso:
• Usa los comandos para acceso rápido
• O escribe cualquier pregunta en lenguaje natural
• El bot usa IA para responder contextualmente

Ejemplos:
"¿Cuántos años de experiencia tienes?"
"¿Trabajas con React?"
"¿Estás disponible para freelance?"

¿En qué puedo ayudarte?
```

---

## Casos Edge

### Ejemplo 15: Mensaje Confuso

```
👤 Usuario: asdfghjkl

🤖 Bot:
No estoy seguro de entender tu mensaje. 

¿Podrías reformular tu pregunta? O usa uno de estos comandos:

/cv - Ver curriculum
/projects - Ver proyectos
/help - Ver ayuda

También puedes escribir preguntas como:
• "¿Cuántos años de experiencia tienes?"
• "¿Qué tecnologías manejas?"
• "¿Estás disponible para proyectos?"
```

### Ejemplo 16: Error de IA

```
👤 Usuario: [Pregunta muy compleja]

🤖 Bot:
Disculpa, estoy teniendo problemas para generar una respuesta. 
¿Puedes reformular tu pregunta?

Mientras tanto, puedes:
• Ver el CV completo: /cv
• Ver proyectos: /projects
• Contactar directamente: /contact
```

---

## 📊 Métricas de Conversación

### Tiempos de Respuesta Típicos:

- **Comandos simples:** <1 segundo
- **Respuestas con IA:** 2-5 segundos
- **Envío de archivos:** 1-3 segundos

### Tasa de Conversión Esperada:

- **Engagement inicial:** 90%+ (responden al /start)
- **Solicitan CV:** 40-50%
- **Agendan llamada:** 15-20%
- **Leads calificados:** 10-15%

---

## 🎯 Tips para Mejores Conversaciones

### Para el Bot:
1. ✅ Respuestas concisas (max 300 palabras)
2. ✅ Usar emojis para claridad
3. ✅ Ofrecer siguiente paso claro
4. ✅ Botones para acciones rápidas

### Para Personalizar:
1. Edita `handle-telegram-message.use-case.ts`
2. Modifica el contexto de IA
3. Agrega más comandos
4. Personaliza respuestas

---

**¿Quieres probar el bot?**

```bash
npm run bot:test
```

Esto ejecutará conversaciones simuladas sin necesidad de Telegram real.
