<script lang="ts">
  /**
   * ProjectCard Component
   * Card para mostrar proyectos individuales
   * Features:
   * - Imagen con hover zoom
   * - Tech tags
   * - Links a demo y código
   * - Animaciones sutiles
   */

  import Card from '../ui/Card.svelte';
  import TechBadge from '../ui/TechBadge.svelte';

  interface Project {
    id: string | number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
  }

  interface Props {
    project: Project;
    class?: string;
  }

  let { project, class: customClass = '' }: Props = $props();
</script>

<Card hoverable={true} padding="md" class={customClass}>
  <!-- Image with hover effect -->
  <div class="project-image-wrapper">
    <img 
      src={project.image} 
      alt={project.title}
      class="project-image"
      loading="lazy"
    />
    <div class="image-overlay">
      <div class="overlay-content">
        {#if project.demoUrl || project.githubUrl}
          <div class="quick-actions">
            {#if project.demoUrl}
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="quick-action-btn"
                aria-label="Ver demo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            {/if}
            {#if project.githubUrl}
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="quick-action-btn"
                aria-label="Ver código"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="project-content">
    <h3 class="project-title">
      {project.title}
    </h3>

    <p class="project-description">
      {project.description}
    </p>

    <!-- Tags -->
    {#if project.tags.length > 0}
      <div class="project-tags">
        {#each project.tags as tag}
          <TechBadge label={tag} />
        {/each}
      </div>
    {/if}

    <!-- Links (mobile fallback) -->
    <div class="project-links">
      {#if project.demoUrl}
        <a 
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Demo</span>
        </a>
      {/if}
      {#if project.githubUrl}
        <a 
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Código</span>
        </a>
      {/if}
    </div>
  </div>
</Card>

<style>
  /* Image container */
  .project-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: var(--space-md);
    background: var(--color-gray-100);
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .card-jony:hover .project-image {
    transform: scale(1.05);
  }

  /* Overlay con quick actions */
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-jony:hover .image-overlay {
    opacity: 1;
  }

  .overlay-content {
    transform: translateY(10px);
    transition: transform var(--transition-base);
  }

  .card-jony:hover .overlay-content {
    transform: translateY(0);
  }

  /* Quick actions (visible en hover) */
  .quick-actions {
    display: flex;
    gap: var(--space-md);
  }

  .quick-action-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-white);
    color: var(--color-gray-900);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }

  .quick-action-btn:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
  }

  /* Content */
  .project-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--color-gray-900);
    margin: 0;
  }

  .project-description {
    font-size: 0.9375rem;
    font-weight: 300;
    color: var(--color-gray-600);
    line-height: 1.6;
    margin: 0;
  }

  /* Tags */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  /* Links (visible siempre en mobile) */
  .project-links {
    display: flex;
    gap: var(--space-lg);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--color-gray-200);
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-gray-700);
    transition: color var(--transition-base);
  }

  .project-link:hover {
    color: var(--color-gray-900);
  }

  /* Responsive */
  @media (min-width: 768px) {
    /* En desktop, esconder links de abajo (usamos overlay) */
    .project-links {
      display: none;
    }
  }

  @media (max-width: 767px) {
    /* En mobile, esconder overlay (usamos links de abajo) */
    .image-overlay {
      display: none;
    }
  }
</style>
