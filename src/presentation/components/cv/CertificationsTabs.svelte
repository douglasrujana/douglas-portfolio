<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { certifications, certificationCategories, type Certification } from '../../../data/cv';
  
  // Agrupar certificaciones por categoría
  let activeTab = 'all';
  
  // Incluimos 'Todas' como primer elemento del array de pestañas
  let tabs = [
    { id: 'all', name: 'Todas', icon: 'grid' },
    ...certificationCategories.filter(cat => cat.id !== 'all') // Aseguramos que no haya duplicados
  ];
  
  // Filtrar certificaciones por categoría
  $: filteredCerts = activeTab === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeTab);
  
  // Ordenar certificaciones por fecha (más reciente primero)
  $: sortedCerts = [...filteredCerts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Manejar el scroll horizontal en móviles
  let tabsContainer: HTMLElement;
  
  onMount(() => {
    if (window.innerWidth < 768) {
      tabsContainer.scrollLeft = 0;
    }
  });
  
  // Formatear fecha
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  }
  
  // Obtener icono de categoría
  function getCategoryIcon(categoryId: string): string {
    const category = certificationCategories.find(c => c.id === categoryId);
    return category?.icon || 'award';
  }
</script>

<div class="certifications-container">
  <!-- Pestañas de navegación -->
  <div class="tabs-container" bind:this={tabsContainer}>
    <div class="tabs-scroll">
      {#each tabs as tab}
        <button
          class="tab-button {activeTab === tab.id ? 'active' : ''}"
          on:click={() => activeTab = tab.id}
          aria-label={`Mostrar certificaciones de ${tab.name}`}
        >
          <span class="tab-icon">
            {#if tab.icon === 'cloud'}
              <!-- Cloud icon (kept as is) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
              </svg>
            {:else if tab.icon === 'code'}
              <!-- Development icon (kept as is) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            {:else if tab.icon === 'layout'}
              <!-- UX/UI icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            {:else if tab.icon === 'check-circle'}
              <!-- Modern QA icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"></path>
                <path d="M8 12l3 3 5-6"></path>
              </svg>
            {:else if tab.icon === 'shield'}
              <!-- Modern DevSecOps icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L3 5v6.09a9 9 0 0 0 5 8.07l4 2.26 4-2.26a9 9 0 0 0 5-8.07V5l-9-3z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            {:else if tab.icon === 'globe'}
              <!-- Modern English/Language icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            {:else if tab.icon === 'database'}
              <!-- SAP icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 5c0 1.1-3.1 2.2-7 2.2S7 6.1 7 5m14 5c0 1.1-3.1 2.2-7 2.2S7 11.1 7 10m14 5c0 1.1-3.1 2.2-7 2.2S7 16.1 7 15m14 5c0 1.1-3.1 2.2-7 2.2S7 21.1 7 20"></path>
                <path d="M3 5v14c0 1.1 1.8 2 4 2h6c2.2 0 4-.9 4-2V5c0-1.1-1.8-2-4-2H7c-2.2 0-4 .9-4 2z"></path>
              </svg>
            {:else}
              <!-- Modern Others/Award icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23l5-3 5 3-1.21-9.12"></polyline>
              </svg>
            {/if}
          </span>
          <span class="tab-text">{tab.name}</span>
          <span class="tab-indicator"></span>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Contenido de las pestañas -->
  <div class="certifications-grid" in:fade={{ duration: 200 }}>
    {#each sortedCerts as cert}
      <div class="certification-card" transition:fade>
        <div class="cert-header">
          <div class="cert-icon">
            {#if cert.category === 'cloud'}
              <!-- Cloud icon (kept as is) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
              </svg>
            {:else if cert.category === 'web'}
              <!-- Web Development icon (kept as is) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            {:else if cert.category === 'uxui'}
              <!-- UX/UI icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            {:else if cert.category === 'qa'}
              <!-- Modern QA icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"></path>
                <path d="M8 12l3 3 5-6"></path>
              </svg>
            {:else if cert.category === 'devsecops'}
              <!-- Modern DevSecOps icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L3 5v6.09a9 9 0 0 0 5 8.07l4 2.26 4-2.26a9 9 0 0 0 5-8.07V5l-9-3z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            {:else if cert.category === 'english'}
              <!-- Modern English/Language icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            {:else if cert.category === 'sap'}
              <!-- SAP icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 5c0 1.1-3.1 2.2-7 2.2S7 6.1 7 5m14 5c0 1.1-3.1 2.2-7 2.2S7 11.1 7 10m14 5c0 1.1-3.1 2.2-7 2.2S7 16.1 7 15m14 5c0 1.1-3.1 2.2-7 2.2S7 21.1 7 20"></path>
                <path d="M3 5v14c0 1.1 1.8 2 4 2h6c2.2 0 4-.9 4-2V5c0-1.1-1.8-2-4-2H7c-2.2 0-4 .9-4 2z"></path>
              </svg>
            {:else}
              <!-- Modern Others/Award icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23l5-3 5 3-1.21-9.12"></polyline>
              </svg>
            {/if}
          </div>
          <div class="cert-title">
            <h3>{cert.name}</h3>
            <p class="issuer">{cert.issuer}</p>
          </div>
        </div>
        
        <div class="cert-details">
          <div class="detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formatDate(cert.date)}</span>
          </div>
          
          {#if cert.expiryDate}
            <div class="detail">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Vence: {formatDate(cert.expiryDate)}</span>
            </div>
          {/if}
        </div>
        
        {#if cert.credentialId || cert.credentialUrl}
          <div class="cert-actions">
            {#if cert.credentialId}
              <div class="credential-id">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>ID: {cert.credentialId}</span>
              </div>
            {/if}
            
            {#if cert.credentialUrl}
              <a 
                href={cert.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                class="verify-btn"
                aria-label="Verificar certificado"
              >
                Verificar
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <div class="no-results">
        <p>No hay certificados en esta categoría.</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .certifications-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Estilos para las pestañas */
  .tabs-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    margin-bottom: 2rem;
    padding-bottom: 8px;
  }
  
  .tabs-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .tabs-scroll {
    display: inline-flex;
    gap: 0.5rem;
    padding-bottom: 4px;
  }
  
  .tab-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 50px;
    background: transparent;
    color: var(--color-gray-600);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    position: relative;
  }
  
  .tab-button:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
  }
  
  .tab-button.active {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .tab-button.active .tab-indicator {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--color-primary);
    border-radius: 2px;
  }
  
  .tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tab-text {
    line-height: 1;
  }
  
  /* Estilos para la cuadrícula de certificaciones */
  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  /* Estilos para las tarjetas de certificación */
  .certification-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid var(--color-gray-100);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  
  .certification-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .cert-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .cert-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--color-primary-50);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .cert-title h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
  }
  
  .issuer {
    font-size: 0.85rem;
    color: var(--color-gray-500);
    margin: 0;
  }
  
  .cert-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
    padding: 1rem 0;
    border-top: 1px solid var(--color-gray-100);
    border-bottom: 1px solid var(--color-gray-100);
  }
  
  .detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-gray-600);
  }
  
  .cert-actions {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
  }
  
  .credential-id {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-gray-500);
    background: var(--color-gray-50);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-family: monospace;
  }
  
  .verify-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .verify-btn:hover {
    color: var(--color-primary-600);
  }
  
  .verify-btn svg {
    transition: transform 0.2s ease;
  }
  
  .verify-btn:hover svg {
    transform: translateX(2px);
  }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: var(--color-gray-500);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .certifications-grid {
      grid-template-columns: 1fr;
    }
    
    .tabs-scroll {
      padding: 0 1rem 8px 0;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .certifications-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
