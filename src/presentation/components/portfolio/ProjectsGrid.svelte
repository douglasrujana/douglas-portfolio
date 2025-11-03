<script lang="ts">
  /**
   * ProjectsGrid Component
   * Grid de proyectos con filtering interactivo
   * 
   * Features:
   * - Filter por tecnología
   * - Animaciones de entrada
   * - Responsive grid
   * - Estado "Todos"
   */

  import ProjectCard from './ProjectCard.svelte';
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
    projects: Project[];
    class?: string;
  }

  let { projects, class: customClass = '' }: Props = $props();

  // Estado del filtro activo
  let activeFilter = $state<string>('all');

  // Extraer todas las tecnologías únicas
  const allTags = $derived(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  // Proyectos filtrados
  const filteredProjects = $derived(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter(project => 
      project.tags.includes(activeFilter)
    );
  });

    // Handler del filtro
  function handleFilterChange(filter: string) {
    activeFilter = filter;
  }
</script>

<div class="projects-section {customClass}">
  <!-- Filter Pills -->
  <div class="filter-container fade-in-jony" style="animation-delay: 0.1s;">
    <TechBadge 
      label="Todos"
      active={activeFilter === 'all'}
      clickable={true}
      onclick={() => handleFilterChange('all')}
    />
    {#each allTags() as tag}
      <TechBadge 
        label={tag}
        active={activeFilter === tag}
        clickable={true}
        onclick={() => handleFilterChange(tag)}
      />
    {/each}
  </div>

  <!-- Projects Count -->
  <div class="projects-count fade-in-jony" style="animation-delay: 0.2s;">
    {filteredProjects().length} 
    {filteredProjects().length === 1 ? 'proyecto' : 'proyectos'}
    {#if activeFilter !== 'all'}
      <span class="filter-indicator">con {activeFilter}</span>
    {/if}
  </div>

  <!-- Projects Grid -->
  {#if filteredProjects().length > 0}
    <div class="projects-grid">
      {#each filteredProjects() as project, index}
        <div 
          class="project-item fade-in-jony"
          style="animation-delay: {0.3 + (index * 0.1)}s;"
        >
          <ProjectCard {project} />
        </div>
      {/each}
    </div>
  {:else}
    <div class="empty-state fade-in-jony" style="animation-delay: 0.3s;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <p>No hay proyectos con esta tecnología</p>
      <button 
        class="btn-jony btn-ghost"
        onclick={() => handleFilterChange('all')}
      >
        Ver todos los proyectos
      </button>
    </div>
  {/if}
</div>

<style>
  .projects-section {
    width: 100%;
  }

  /* Filter container */
  .filter-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
  }

  /* Projects count */
  .projects-count {
    text-align: center;
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-gray-500);
    margin-bottom: var(--space-lg);
  }

  .filter-indicator {
    color: var(--color-gray-900);
    font-weight: 400;
  }

  /* Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: var(--space-2xl) var(--space-lg);
    color: var(--color-gray-500);
  }

  .empty-state svg {
    margin: 0 auto var(--space-lg);
    opacity: 0.3;
  }

  .empty-state p {
    font-size: 1.125rem;
    font-weight: 300;
    margin-bottom: var(--space-lg);
  }

    /* Animations */
  /* Responsive */
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
