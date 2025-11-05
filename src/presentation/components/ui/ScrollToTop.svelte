<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  function scrollToTop(e) {
    e?.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  function handleScroll() {
    // Mostrar solo cuando el scroll esté a más de la mitad de la página
    isVisible = window.scrollY > (document.documentElement.scrollHeight / 2);
  }
  
  // Usar onMount del ciclo de vida de Svelte
  onMount(() => {
    // Agregar el event listener cuando el componente se monta
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificar el estado inicial
    handleScroll();
    
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<button 
  class="scroll-to-top"
  class:visible={isVisible}
  on:click={scrollToTop}
  aria-label="Volver arriba"
>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <path d="M18 15l-6-6-6 6"/>
  </svg>
</button>

<style>
  .scroll-to-top {
    position: fixed;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #000000;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    outline: none;
  }
  
  .scroll-to-top.visible {
    opacity: 0.8;
    visibility: visible;
  }
  
  .scroll-to-top:focus {
    outline: 2px solid rgba(0, 0, 0, 0.3);
    outline-offset: 2px;
  }
  
  .scroll-to-top:hover {
    background: var(--color-gray-800);
    transform: translateY(-50%) translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  .scroll-to-top:active {
    transform: translateY(-50%) translateY(1px);
  }
  
  .scroll-to-top svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    .scroll-to-top {
      right: 16px;
      width: 40px;
      height: 40px;
    }
  }
</style>
