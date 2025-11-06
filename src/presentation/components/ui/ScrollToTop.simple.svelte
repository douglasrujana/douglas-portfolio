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
    right: 2rem; /* Mismo margen derecho que el botón de chat */
    bottom: 8rem; /* Posicionado por encima del botón de chat */
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--color-gray-900); /* Mismo color que el botón de chat */
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition: all var(--transition-base);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Un nivel por debajo del chat (1000) */
  }

  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .scroll-to-top:hover {
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .scroll-to-top:active {
    transform: scale(0.95);
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
      right: 1.5rem;
      bottom: 7rem;
      width: 50px;
      height: 50px;
    }
  }
</style>
