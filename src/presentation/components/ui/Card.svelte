<script lang="ts">
  /**
   * Card Component - Estilo Jony Ive
   * 
   * Card minimalista con hover effect sutil
   * Perfecto para proyectos, posts, testimonios
   */

  interface Props {
    hoverable?: boolean;
    padding?: 'sm' | 'md' | 'lg';
    class?: string;
  }

  let {
    hoverable = true,
    padding = 'lg',
    class: customClass = '',
    children
  }: Props = $props();

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const classes = `card-jony ${paddingClasses[padding]} ${hoverable ? 'card-hoverable' : ''} ${customClass}`;
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style>
  .card-hoverable {
    cursor: pointer;
    transition: 
      box-shadow var(--transition-base),
      transform var(--transition-base);
  }

  .card-hoverable:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }

  .card-hoverable:active {
    transform: translateY(-2px);
  }
</style>
