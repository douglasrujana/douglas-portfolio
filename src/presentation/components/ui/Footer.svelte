<script>
  export let currentYear = new Date().getFullYear();
  export let showTechCredits = true;
  export let socialLinks = {
    github: 'https://github.com/douglasrujana',
    linkedin: 'https://linkedin.com/in/douglasrujana',
    telegram: null,
    whatsapp: null,
    email: 'tu@email.com'
  };

  // Si las variables de entorno están disponibles, actualizamos los enlaces
  if (import.meta.env.VITE_TELEGRAM_BOT_USERNAME) {
    socialLinks.telegram = `https://t.me/${import.meta.env.VITE_TELEGRAM_BOT_USERNAME}`;
  }
  
  if (import.meta.env.VITE_WHATSAPP_NUMBER) {
    socialLinks.whatsapp = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hola%20Douglas,%20vi%20tu%20portfolio`;
  }
</script>

<footer class="footer">
  <div class="container-jony">
    <div class="footer-content">
      <p class="footer-text">
        © {currentYear} <strong>Douglas Rujana</strong>. Diseñado con atención al detalle.
      </p>
      
      {#if showTechCredits}
        <p class="footer-tech">
          Construido con 
          <a href="https://astro.build" target="_blank" rel="noopener">Astro</a>,
          <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
          y arquitectura hexagonal.
        </p>
      {/if}
      
      <div class="footer-links">
        {#if socialLinks.github}
          <a href={socialLinks.github} target="_blank" rel="noopener">GitHub</a>
          <span class="footer-separator">·</span>
        {/if}
        
        {#if socialLinks.linkedin}
          <a href={socialLinks.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <span class="footer-separator">·</span>
        {/if}
        
        {#if socialLinks.telegram}
          <a href={socialLinks.telegram} target="_blank" rel="noopener">Telegram</a>
          <span class="footer-separator">·</span>
        {/if}
        
        {#if socialLinks.whatsapp}
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
          <span class="footer-separator">·</span>
        {/if}
        
        {#if socialLinks.email}
          <a href={`mailto:${socialLinks.email}`}>Email</a>
        {/if}
      </div>
      
      <div class="footer-links" style="margin-top: 0.5rem;">
        <a href="/privacy-policy" class="privacy-link">Política de Privacidad</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: var(--space-xl) 0;
    border-top: 1px solid var(--color-gray-200);
  }
  
  .footer-content {
    text-align: center;
  }
  
  .footer-text,
  .footer-tech {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-gray-500);
    margin-bottom: var(--space-sm);
  }
  
  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: var(--space-sm);
  }
  
  .footer-links a {
    font-size: 0.875rem;
    color: var(--color-gray-600);
    transition: color var(--transition-base);
  }
  
  .footer-links a:hover {
    color: var(--color-gray-900);
  }
  
  .footer-separator {
    color: var(--color-gray-400);
    margin: 0 0.5rem;
  }
  
  .dark .footer {
    border-top-color: var(--color-gray-800);
  }
  
  .dark .footer-links a {
    color: var(--color-gray-400);
  }
  
  .dark .footer-links a:hover {
    color: var(--color-white);
  }
  
  .dark .footer-separator {
    color: var(--color-gray-600);
  }
  
  .privacy-link {
    font-size: 0.8125rem;
    color: var(--color-gray-500);
  }
  
  .dark .privacy-link {
    color: var(--color-gray-400);
  }
  
  .privacy-link:hover {
    color: var(--color-gray-700);
    text-decoration: underline;
  }
  
  .dark .privacy-link:hover {
    color: var(--color-gray-200);
  }
</style>
