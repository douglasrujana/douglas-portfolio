<script lang="ts">
  import Card from '../ui/Card.svelte';
  import Button from '../ui/Button.svelte';
  import TechBadge from '../ui/TechBadge.svelte';

  export let project: {
    id: string | number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
  };

  export let customClass = '';
</script>

<Card hoverable={true} padding="md" class={`card-jony h-full flex flex-col ${customClass}`}>
  <!-- Imagen del proyecto -->
  <div class="relative overflow-hidden rounded-t-lg bg-gray-100 aspect-video">
    <img 
      src={project.image} 
      alt={project.title}
      class="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  <!-- Contenido -->
  <div class="flex-1 p-6 flex flex-col">
    <h3 class="text-xl font-medium text-gray-900 mb-2">
      {project.title}
    </h3>

    <p class="text-gray-600 mb-4 flex-1">
      {project.description}
    </p>

    <!-- Etiquetas de tecnologías -->
    {#if project.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each project.tags as tag}
          <TechBadge label={tag} />
        {/each}
      </div>
    {/if}

    <!-- Botones de acción -->
    <div class="flex gap-3 pt-2 border-t border-gray-100">
      {#if project.demoUrl}
        <Button variant="ghost" size="sm" href={project.demoUrl} target="_blank">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Demo
        </Button>
      {/if}
      {#if project.githubUrl}
        <Button variant="ghost" size="sm" href={project.githubUrl} target="_blank">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Código
        </Button>
      {/if}
    </div>
  </div>
</Card>

<style>
  /* Image container */
  .project-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    overflow: hidden;
    border-radius: var(--radius-md);
    background-color: var(--color-gray-100);
  }

  .project-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform; /* Optimización para animaciones */
    backface-visibility: hidden; /* Mejora el rendimiento en algunas GPU */
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  /* Card hover effects */
  .project-card:hover .project-image {
    transform: scale(1.02);
    transition: transform 0.3s ease-out;
  }

  .project-card:hover .image-overlay {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .project-card:hover .overlay-content {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
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
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.project-card):hover .image-overlay {
    opacity: 1;
  }

  .overlay-content {
    transform: translateY(10px);
    transition: transform var(--transition-base);
  }

  :global(.project-card):hover .overlay-content {
    transform: translateY(0);
  }

  /* Quick actions (visible en hover) */
  .quick-actions {
    display: flex;
    gap: var(--space-md);
  }

  .quick-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    color: white;
    transition: all 0.2s ease;
  }

  .quick-action-btn:hover {
    background: var(--color-primary);
    transform: translateY(-2px);
  }

  .quick-action-btn svg {
    width: 24px;
    height: 24px;
  }

  /* Content */
  .project-content {
    padding: var(--space-md) 0 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0 0 var(--space-sm);
    line-height: 1.3;
  }

  .project-description {
    color: var(--color-gray-600);
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 0 0 var(--space-md);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 4.8em; /* Aprox. 3 líneas de texto */
  }

  /* Tags */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: auto;
    padding-top: var(--space-sm);
    min-height: 32px; /* Altura mínima para los tags */
  }

  /* Action Buttons */
  .project-actions {
    display: flex;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    flex-wrap: wrap;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
    border: 1px solid transparent;
  }

  .demo-btn {
    background-color: var(--color-primary);
    color: white;
  }

  .demo-btn:hover {
    background-color: var(--color-primary-dark);
  }
  
  .code-btn {
    background-color: transparent;
    border-color: var(--color-gray-300);
    color: var(--color-gray-700);
  }

  .code-btn:hover {
    background-color: var(--color-gray-100);
  }

  /* Links (visible siempre en mobile) */
  .project-links {
    display: none;
    margin-top: var(--space-md);
    gap: var(--space-md);
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .project-link:hover {
    color: var(--color-primary-dark);
  }

  .project-link svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  .project-link:hover svg {
    transform: translateX(2px);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .project-actions {
      display: none;
    }

    .project-links {
      display: flex;
      flex-direction: column;
    }

    .project-link {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-gray-200);
    }
  }
</style>
