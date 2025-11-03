<script lang="ts">
  /**
   * TechBadge Component
   * Badge para mostrar tecnologías/tags
   * Estilo Jony Ive: minimalista pero interactivo
   */

  interface Props {
    label: string;
    active?: boolean;
    clickable?: boolean;
    onclick?: () => void;
    class?: string;
  }

  let {
    label,
    active = false,
    clickable = false,
    onclick,
    class: customClass = ''
  }: Props = $props();

  const baseClasses = 'badge-jony';
  const activeClass = active ? 'badge-active' : '';
  const clickableClass = clickable ? 'badge-clickable' : '';
  const classes = `${baseClasses} ${activeClass} ${clickableClass} ${customClass}`;
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
    padding: 0.375rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--color-gray-700);
    background: var(--color-gray-100);
    border-radius: var(--radius-full);
    white-space: nowrap;
    transition: all var(--transition-base);
    border: none;
    font-family: var(--font-system);
  }

  .badge-clickable {
    cursor: pointer;
  }

  .badge-clickable:hover {
    background: var(--color-gray-200);
    transform: translateY(-1px);
  }

  .badge-active {
    background: var(--color-gray-900);
    color: var(--color-white);
  }

  .badge-active:hover {
    background: var(--color-gray-800);
  }

  .badge-clickable:active {
    transform: scale(0.97);
  }
</style>
