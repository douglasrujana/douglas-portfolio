<script>
  // Genera un número aleatorio entre min y max
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Genera un color aleatorio con opacidad
  const randomColor = (opacity = 0.1) => {
    const r = random(100, 200);
    const g = random(100, 200);
    const b = random(100, 200);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Código de ejemplo con sintaxis resaltada
  const codeLines = [
    { text: '// Douglas Rujana - Blog Técnico', color: 'var(--color-gray-400)', indent: 0 },
    { text: 'const transformIdeas = (ideas) => {', color: 'var(--color-accent)', indent: 0 },
    { text: '  return ideas', color: 'var(--color-gray-200)', indent: 2 },
    { text: '    .filter(idea => !idea.isComplex)', color: 'var(--color-gray-400)', indent: 4 },
    { text: '    .map(idea => ({', color: 'var(--color-gray-300)', indent: 4 },
    { text: '      ...idea,', color: 'var(--color-gray-300)', indent: 6 },
    { text: '      impact: calculateImpact(idea)', color: 'var(--color-gray-400)', indent: 6 },
    { text: '    }))', color: 'var(--color-gray-300)', indent: 4 },
    { text: '    .sort((a, b) => b.impact - a.impact);', color: 'var(--color-gray-200)', indent: 4 },
    { text: '};', color: 'var(--color-accent)', indent: 0 },
    { text: '', color: 'var(--color-gray-200)', indent: 0 },
    { text: '// Función lambda de ejemplo', color: 'var(--color-gray-500)', indent: 0 },
    { text: 'const processData = data =>', color: 'var(--color-gray-200)', indent: 0 },
    { text: '  data.reduce((acc, item) => ({\n    ...acc,\n    [item.id]: transformItem(item)\n  }), {});', color: 'var(--color-gray-400)', indent: 2 }
  ];
</script>

<div class="code-background">
  <div class="code-overlay">
    {#each codeLines as line, i}
      <div 
        class="code-line" 
        style="
          color: {line.color}; 
          padding-left: {line.indent * 8}px;
          opacity: {0.4 + (i * 0.05)};
        "
      >
        {line.text}
      </div>
    {/each}
  </div>
</div>

<style>
  .code-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 0;
    opacity: 0.5;
    pointer-events: none;
  }
  
  .code-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) perspective(1000px) rotateX(20deg);
    font-family: 'Fira Code', 'SF Mono', 'Roboto Mono', monospace;
    font-size: 0.85rem;
    line-height: 1.6;
    white-space: pre;
    color: var(--color-gray-400);
    max-width: 90%;
    max-height: 90%;
    overflow: hidden;
  }
  
  .code-line {
    transition: opacity 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .code-overlay {
      font-size: 0.7rem;
      transform: translate(-50%, -50%) perspective(1000px) rotateX(25deg) scale(0.8);
    }
  }
</style>
