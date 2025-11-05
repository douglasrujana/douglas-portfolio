<script>
  export let currentPath = '/';
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'CV' },
    { path: '/#projects', label: 'Proyectos' },
    { path: '/#services', label: 'Servicios' },
    { path: '/#contact', label: 'Contacto' },
    { path: '/blog', label: 'Blog' }
  ];
  
  let isEnglish = false;
  
  function toggleLanguage() {
    isEnglish = !isEnglish;
    // TODO: Implement language change logic
  }
  
  // Function to check if a path matches the current path
  function isActive(path) {
    // Handle root path
    if (path === '/' && currentPath === '/') return true;
    // Handle hash links for current page
    if (path.startsWith('#') && currentPath === '/') return false;
    // For other paths, check if currentPath starts with the path (to handle nested routes)
    return path !== '/' && currentPath.startsWith(path.replace('#', ''));
  }
</script>

<nav class="navigation">
  <div class="nav-items">
    {#each navItems as item}
      <a 
        href={item.path}
        class:active={isActive(item.path)}
      >
        {item.label}
      </a>
    {/each}
  </div>
  
  <button 
    class="language-toggle"
    on:click={toggleLanguage}
    aria-label={isEnglish ? 'Cambiar a español' : 'Switch to English'}
  >
    {isEnglish ? 'ES' : 'EN'}
  </button>
</nav>

<style>
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 4rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .nav-items {
    display: flex;
    gap: 2.5rem;
  }
  
  a {
    color: #1d1d1f;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    padding: 0.5rem 0;
  }
  
  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: #1d1d1f;
    transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  
  a:hover::after {
    width: 100%;
  }
  
  a.active {
    font-weight: 600;
  }
  
  a.active::after {
    width: 100%;
    height: 2px;
    background-color: #1d1d1f;
  }
  
  .language-toggle {
    background: none;
    border: 1px solid #d2d2d7;
    border-radius: 20px;
    padding: 0.5rem 1.2rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    font-family: inherit;
  }
  
  .language-toggle:hover {
    background-color: #f5f5f7;
  }
  
  @media (max-width: 768px) {
    .navigation {
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.5rem 2rem;
    }
    
    .nav-items {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
    }
    
    a {
      font-size: 1.2rem;
    }
  }
</style>
