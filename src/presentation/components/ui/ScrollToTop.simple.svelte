<script>
  // Componente simplificado sin onMount
  let isVisible = false;
  
  // Función para manejar el clic
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Función para manejar el scroll
  function handleScroll() {
    if (typeof window !== 'undefined') {
      // Mostrar el botón después de desplazarse un 10% de la página
      const scrollThreshold = document.documentElement.scrollHeight * 0.1;
      isVisible = window.scrollY > scrollThreshold;
    }
  }
  
  // Inicializar el event listener después de que el componente se monte
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    // Verificar el estado inicial
    handleScroll();
  }
</script>

<button 
  class="scroll-to-top"
  class:visible={isVisible}
  on:click={handleClick}
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
    right: 1.5rem;
    bottom: 50%;
    transform: translateY(50%) translateZ(0);
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 
      opacity 0.25s ease,
      visibility 0.25s ease,
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    will-change: transform, opacity;
  }
  
  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .scroll-to-top:hover {
    background: #ffffff;
    transform: translateY(calc(50% - 2px)) translateZ(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .scroll-to-top:active {
    transform: translateY(50%) translateZ(0) scale(0.96);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .scroll-to-top:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  .scroll-to-top svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }
  
  .scroll-to-top:hover svg {
    transform: translateY(-1px);
  }
  
  .scroll-to-top:active svg {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .scroll-to-top {
      right: 16px;
      width: 40px;
      height: 40px;
    }
  }
</style>
