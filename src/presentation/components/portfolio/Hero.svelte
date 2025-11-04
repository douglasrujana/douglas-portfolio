<script lang="ts">
  /**
   * Hero Component - Landing principal
   * Estilo Jony Ive: Minimalista, elegante, centrado
   */

  import Button from '../ui/Button.svelte';
  
  interface Props {
    name?: string;
    title?: string;
    description?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    telegramUrl?: string;
    whatsappUrl?: string;
    email?: string;
  }

  let {
    name = 'Douglas Rujana',
    title = 'Desarrollador Full Stack+AI | QA | DevOps | Cloud-native',
    description = 'Creando experiencias digitales excepcionales mediante código limpio, diseño intuitivo y atención meticulosa al detalle.',
    githubUrl = 'https://github.com/douglasrujana',
    linkedinUrl = 'https://linkedin.com/in/douglasrujana',
    telegramUrl = undefined,
    whatsappUrl = undefined,
    email = 'douglas@example.com'
  }: Props = $props();
</script>

<section class="hero-section">
  <div class="hero-container">
    <!-- Avatar Circle con icono -->
    <div class="avatar-wrapper fade-in-jony" style="animation-delay: 0.1s;">
      <div class="avatar-circle">
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
    </div>

    <!-- Name -->
    <h1 class="hero-name fade-in-jony" style="animation-delay: 0.2s;">
      {name}
    </h1>

    <!-- Title -->
    <p class="hero-title fade-in-jony" style="animation-delay: 0.3s;">
      {title}
    </p>

    <!-- Description -->
    <p class="hero-description fade-in-jony" style="animation-delay: 0.4s;">
      {description}
    </p>

    <!-- Social Links -->
    <div class="social-links fade-in-jony" style="animation-delay: 0.5s;">
      {#if githubUrl}
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="social-link"
          aria-label="GitHub"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      {/if}

      {#if linkedinUrl}
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="social-link"
          aria-label="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      {/if}

      {#if telegramUrl}
        <a 
          href={telegramUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="social-link"
          aria-label="Telegram Bot"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
      {/if}

      {#if whatsappUrl}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="social-link"
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      {/if}

      {#if email}
        <a 
          href="mailto:{email}"
          class="social-link"
          aria-label="Email"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      {/if}
    </div>

    <!-- CTA Buttons -->
    <div class="cta-buttons fade-in-jony" style="animation-delay: 0.6s;">
      <Button variant="primary" size="lg" href="#projects">
        Ver Proyectos
      </Button>
      <Button variant="ghost" size="lg" href="#contact">
        Contactar
      </Button>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator fade-in-jony" style="animation-delay: 0.8s;">
      <div class="scroll-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl) var(--space-lg);
    position: relative;
  }

  .hero-container {
    max-width: 800px;
    text-align: center;
  }

  /* Avatar Circle */
  .avatar-wrapper {
    margin-bottom: var(--space-xl);
  }

  .avatar-circle {
    width: 128px;
    height: 128px;
    margin: 0 auto;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-600);
  }

  /* Typography */
  .hero-name {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 300;
    letter-spacing: -0.03em;
    margin-bottom: var(--space-lg);
    color: var(--color-gray-900);
  }

  .hero-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 300;
    color: var(--color-gray-600);
    margin-bottom: var(--space-xl);
    line-height: 1.5;
  }

  .hero-description {
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 300;
    color: var(--color-gray-700);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto var(--space-xl);
  }

  /* Social Links */
  .social-links {
    display: flex;
    justify-content: center;
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
  }

  .social-link {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-700);
    transition: 
      background-color var(--transition-base),
      color var(--transition-base),
      transform var(--transition-base);
  }

  .social-link:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
    transform: translateY(-2px);
  }

  .social-link:active {
    transform: scale(0.95);
  }

  /* CTA Buttons */
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  /* Scroll Indicator */
  .scroll-indicator {
    position: absolute;
    bottom: var(--space-xl);
    left: 50%;
    transform: translateX(-50%);
  }

  .scroll-icon {
    color: var(--color-gray-400);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-section {
      padding: var(--space-lg) var(--space-md);
    }

    .avatar-circle {
      width: 96px;
      height: 96px;
    }

    .avatar-circle svg {
      width: 32px;
      height: 32px;
    }

    .social-links {
      gap: var(--space-md);
    }

    .social-link {
      width: 40px;
      height: 40px;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
