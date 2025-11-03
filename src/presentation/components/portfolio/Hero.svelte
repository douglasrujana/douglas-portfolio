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
    email?: string;
  }

  let {
    name = 'Douglas Rujana',
    title = 'Desarrollador Full Stack+AI | QA | DevOps | Cloud-native',
    description = 'Creando experiencias digitales excepcionales mediante código limpio, diseño intuitivo y atención meticulosa al detalle.',
    githubUrl = 'https://github.com/douglasrujana',
    linkedinUrl = 'https://linkedin.com/in/douglasrujana',
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
