<script lang="ts">
  /**
   * TechBadge Component
   * Badge para mostrar tecnologías/tags
   * Estilo Jony Ive: minimalista pero interactivo
   */

  // Definir las props usando $props()
  const { 
    label, 
    active = false, 
    clickable = false, 
    onclick,
    className = '' 
  } = $props<{
    label: string;
    active?: boolean;
    clickable?: boolean;
    onclick?: () => void;
    className?: string;
  }>();

  // Clase base
  let classes = $state('');
  
  // Actualizar clases cuando cambien las props
  $effect(() => {
    classes = [
      'badge-jony',
      clickable ? 'badge-clickable' : '',
      active ? 'badge-active' : '',
      className
    ].filter(Boolean).join(' ').trim();
    
    console.log(`TechBadge [${label}]:`, { 
      active, 
      label, 
      clickable,
      classes
    });
  });
</script>

{#if clickable && onclick}
  <button
    type="button"
    class={classes}
    onclick={onclick}
  >
    {label}
  </button>
{:else}
  <span class={classes}>
    {label}
  </span>
{/if}

<style>
  .badge-jony {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-gray-700);
    background: var(--color-gray-100);
    border-radius: var(--radius-full);
    white-space: nowrap;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    font-family: var(--font-system);
    margin: 0.25rem;
  }

  .badge-clickable {
    cursor: pointer;
    background: var(--color-gray-50);
    border-color: var(--color-gray-200);
  }

  .badge-clickable:hover {
    background: var(--color-gray-100);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .badge-clickable:active {
    transform: translateY(0);
    box-shadow: none;
  }

  .badge-active {
    background: var(--color-gray-900) !important;
    color: var(--color-white) !important;
    border-color: var(--color-gray-900) !important;
  }

  .badge-active:hover {
    background: var(--color-gray-800) !important;
    transform: none !important;
  }
</style>
