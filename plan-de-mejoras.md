# Plan de Mejoras para el Proyecto `douglas-portfolio`

## 1. Objetivo

El propósito de este documento es establecer una hoja de ruta estratégica para la mejora continua del proyecto `douglas-portfolio`. El plan se enfoca en elevar la calidad técnica, el rendimiento, la experiencia de usuario (UX) y la mantenibilidad del código, asegurando que el portafolio no solo sea una muestra de trabajo, sino también un ejemplo de buenas prácticas de desarrollo.

---

## 2. Áreas de Enfoque y Recomendaciones

A continuación, se detallan las áreas clave de mejora con acciones específicas recomendadas.

### 2.1. Calidad del Código y Mantenibilidad

*   **Refactorización de Componentes:**
    *   **Acción:** Auditar los componentes Svelte y Astro para identificar lógica compleja o repetitiva.
    *   **Recomendación:** Extraer la lógica de negocio a funciones o *stores* de Svelte reutilizables. Utilizar `props` de Astro para pasar datos de manera más explícita y evitar la dependencia del estado global cuando no sea necesario.

*   **Linting y Formateo Estricto:**
    *   **Acción:** Fortalecer las reglas de ESLint y Prettier.
    *   **Recomendación:** Añadir plugins como `eslint-plugin-astro` y `eslint-plugin-svelte` para un análisis más profundo. Configurar un `stylelint` para el CSS de Tailwind para mantener la consistencia.

*   **Documentación Interna:**
    *   **Acción:** Documentar componentes complejos y funciones críticas.
    *   **Recomendación:** Usar comentarios JSDoc en funciones TypeScript y en las `props` de los componentes Astro/Svelte para habilitar el autocompletado y la descripción en el editor de código.

### 2.2. Rendimiento Web (Core Web Vitals)

*   **Optimización de Imágenes:**
    *   **Acción:** Automatizar la compresión y el uso de formatos modernos.
    *   **Recomendación:** Utilizar el componente `<Image>` de Astro (`astro:assets`) para generar automáticamente formatos optimizados (WebP, AVIF), redimensionar imágenes y aplicar `loading="lazy"` por defecto.

*   **Reducción de JavaScript del Lado del Cliente:**
    *   **Acción:** Auditar el uso de componentes interactivos.
    *   **Recomendación:** Asegurarse de que los componentes Svelte solo se carguen cuando sean visibles en pantalla usando la directiva `client:visible`. Esto es crucial para mantener el enfoque "cero JS por defecto" de Astro.

*   **Transiciones de Vista (View Transitions):**
    *   **Acción:** Mejorar la fluidez de la navegación entre páginas.
    *   **Recomendación:** Implementar las View Transitions de Astro. Es una mejora de alto impacto y bajo esfuerzo que simula una Single-Page Application (SPA) sin la complejidad asociada.

### 2.3. Experiencia de Usuario (UX) y Accesibilidad (a11y)

*   **Feedback Interactivo en Formularios:**
    *   **Acción:** Mejorar la respuesta del formulario de contacto.
    *   **Recomendación:** Implementar el envío asíncrono (AJAX/Fetch) en el lado del cliente para dar feedback instantáneo (éxito, error, enviando) sin recargar la página.

*   **Accesibilidad:**
    *   **Acción:** Realizar una auditoría de accesibilidad.
    *   **Recomendación:** Verificar el contraste de colores, el uso de atributos `aria-*` en componentes interactivos, el orden lógico del foco (tabulación) y que todas las imágenes tengan texto alternativo descriptivo.

*   **Modo Oscuro/Claro:**
    *   **Acción:** Ofrecer una opción de tema visual.
    *   **Recomendación:** Implementar un selector de tema que guarde la preferencia del usuario en `localStorage`. Usar variables CSS y la clase `dark` de Tailwind para gestionar los estilos.

### 2.4. SEO y Contenido

*   **Datos Estructurados (Schema.org):**
    *   **Acción:** Mejorar cómo los motores de búsqueda entienden tu contenido.
    *   **Recomendación:** Añadir JSON-LD a las páginas de blog y al layout principal para describir el contenido (artículos, persona, etc.). Esto mejora la apariencia en los resultados de búsqueda (rich snippets).

*   **Metadatos Dinámicos:**
    *   **Acción:** Asegurar que cada página tenga metadatos únicos para redes sociales.
    *   **Recomendación:** En el `Layout.astro`, generar dinámicamente las etiquetas `og:title`, `og:description`, `og:image` y `twitter:card` basadas en el frontmatter de cada post del blog.

### 2.5. DevOps y Flujo de Trabajo

*   **Integración Continua / Despliegue Continuo (CI/CD):**
    *   **Acción:** Automatizar el proceso de testing y despliegue.
    *   **Recomendación:** Configurar un pipeline con GitHub Actions que se active en cada `push` a la rama principal. El pipeline debería instalar dependencias, ejecutar linters, correr tests y, si todo pasa, desplegar automáticamente a tu proveedor de hosting (Vercel, Netlify, etc.).

*   **Testing Automatizado:**
    *   **Acción:** Introducir pruebas para prevenir regresiones.
    *   **Recomendación:**
        *   **Unitarias:** Usar `Vitest` para probar la lógica de negocio en funciones TypeScript y componentes Svelte.
        *   **End-to-End (E2E):** Usar `Playwright` para simular interacciones de usuario en flujos críticos (ej: enviar un formulario, navegar a un post).

---

## 3. Metodología de Priorización

Se recomienda utilizar una matriz de **Impacto vs. Esfuerzo** para decidir el orden de implementación:

1.  **Quick Wins (Alto Impacto, Bajo Esfuerzo):**
    *   Implementar View Transitions.
    *   Optimizar imágenes con `astro:assets`.
    *   Fortalecer reglas de linting.

2.  **Inversiones Estratégicas (Alto Impacto, Alto Esfuerzo):**
    *   Configurar un pipeline de CI/CD completo.
    *   Implementar una suite de tests (unitarios y E2E).
    *   Refactorizar componentes complejos.

3.  **Mejoras Incrementales (Bajo Impacto, Bajo Esfuerzo):**
    *   Añadir feedback al formulario de contacto.
    *   Implementar modo oscuro.

4.  **A Considerar a Futuro (Bajo Impacto, Alto Esfuerzo):**
    *   Tareas que no aportan un valor inmediato significativo pero que pueden ser útiles a largo plazo.

---

## 4. Plan de Ejecución Sugerido

*   **Fase 1 (Fundamentos):** Enfocarse en los "Quick Wins". Configurar `astro:assets`, añadir View Transitions y ajustar las reglas de linting.
*   **Fase 2 (Experiencia y Automatización):** Implementar el pipeline de CI/CD básico y mejorar la UX del formulario.
*   **Fase 3 (Robustez y Calidad):** Introducir tests automatizados y comenzar la refactorización de componentes clave.
*   **Fase 4 (Pulido y Contenido):** Añadir modo oscuro, datos estructurados (Schema.org) y realizar una auditoría completa de accesibilidad.