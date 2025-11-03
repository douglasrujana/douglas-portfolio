<script lang="ts">
  /**
   * Button Component - Estilo Jony Ive
   * 
   * Variantes:
   * - primary: Botón principal (fondo oscuro)
   * - secondary: Botón secundario (fondo gris)
   * - ghost: Botón transparente
   * 
   * Tamaños:
   * - sm: Pequeño
   * - md: Mediano (default)
   * - lg: Grande
   */
  
  type ButtonVariant = 'primary' | 'secondary' | 'ghost';
  type ButtonSize = 'sm' | 'md' | 'lg';
  type ButtonType = 'button' | 'submit' | 'reset';

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
    href?: string;
    target?: string;
    class?: string;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    href,
    target,
    class: customClass = '',
    onclick,
    children
  }: Props = $props();

  const baseClasses = 'btn-jony';
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${customClass}`;
</script>

{#if href}
  <a
    {href}
    {target}
    class={classes}
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-disabled={disabled}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    onclick={onclick}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  /* Los estilos base vienen de jony-ive.css */
  /* Aquí solo ajustes específicos del componente si son necesarios */
  
  a[role="button"] {
    text-decoration: none;
    display: inline-flex;
  }

  a[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.4;
  }
</style>
