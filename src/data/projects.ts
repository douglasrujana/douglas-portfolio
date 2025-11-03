/**
 * Projects Data
 * 
 * Centraliza la información de todos tus proyectos
 * Mantén este archivo actualizado con tus proyectos reales
 */

export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean; // Para destacar proyectos importantes
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'Plataforma completa de comercio electrónico con pasarela de pagos integrada, gestión de inventario y panel de administración.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['Laravel', 'PHP', 'MySQL', 'Stripe'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/douglasrujana/ecommerce',
    featured: true,
  },
  {
    id: 2,
    title: 'WooCommerce Store',
    description:
      'Tienda personalizada con integraciones de inventario y CRM. Sistema de cupones y programa de lealtad.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    tags: ['WooCommerce', 'PHP', 'WordPress', 'MySQL'],
    demoUrl: 'https://store.example.com',
    githubUrl: 'https://github.com/douglasrujana/woocommerce-store',
    featured: true,
  },
  {
    id: 3,
    title: 'Dashboard Analítico',
    description:
      'Panel de análisis en tiempo real con visualización de datos, reportes automáticos y alertas personalizadas.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Astro', 'JavaScript', 'API', 'Chart.js'],
    demoUrl: 'https://analytics.example.com',
    githubUrl: 'https://github.com/douglasrujana/analytics-dashboard',
  },
  {
    id: 4,
    title: 'REST API Backend',
    description:
      'API robusta con autenticación JWT, documentación Swagger y rate limiting. Escalable y optimizada.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    tags: ['Express', 'Node.js', 'MongoDB', 'JWT'],
    demoUrl: 'https://api.example.com/docs',
    githubUrl: 'https://github.com/douglasrujana/rest-api',
    featured: true,
  },
  {
    id: 5,
    title: 'Landing Page Interactiva',
    description:
      'Sitio web con animaciones fluidas, diseño responsive y optimización SEO. Lighthouse score 100.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    demoUrl: 'https://landing.example.com',
    githubUrl: 'https://github.com/douglasrujana/landing-page',
  },
  {
    id: 6,
    title: 'Blog Técnico',
    description:
      'Blog optimizado con sistema de búsqueda, categorías y RSS. Markdown support y syntax highlighting.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    tags: ['Astro', 'Markdown', 'SEO', 'TypeScript'],
    demoUrl: 'https://blog.example.com',
    githubUrl: 'https://github.com/douglasrujana/tech-blog',
  },
  {
    id: 7,
    title: 'Google Clone',
    description: 'Clone funcional del buscador Google con API de búsqueda integrada y diseño pixel-perfect.',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=600&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    demoUrl: 'https://google-clone-psi-henna.vercel.app/',
    githubUrl: 'https://github.com/douglasrujana/google-clone',
  },
  {
    id: 8,
    title: 'Chat App con IA',
    description:
      'Aplicación de chat en tiempo real con integración de IA para respuestas automáticas inteligentes.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop',
    tags: ['Svelte', 'WebSocket', 'Gemini', 'Node.js'],
    demoUrl: 'https://chat.example.com',
    githubUrl: 'https://github.com/douglasrujana/ai-chat',
    featured: true,
  },
];

/**
 * Obtiene proyectos destacados
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured === true);
}

/**
 * Obtiene proyectos por tecnología
 */
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

/**
 * Obtiene un proyecto por ID
 */
export function getProjectById(id: string | number): Project | undefined {
  return projects.find((p) => p.id.toString() === id.toString());
}

/**
 * Obtiene todas las tecnologías únicas
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
