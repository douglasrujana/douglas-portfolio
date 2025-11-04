/**
 * CV Data Mock
 * 
 * CRUD súper fácil - solo actualiza este archivo
 * Formato ATS-friendly + JSON-LD para SEO
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza los datos mock con los tuyos
 * 2. Guarda el archivo
 * 3. ¡Listo! Se actualiza automáticamente
 */

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // YYYY-MM
  endDate: string | 'present'; // YYYY-MM o 'present'
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'freelance' | 'contract';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string; // YYYY
  endDate: string; // YYYY
  gpa?: string;
  honors?: string[];
  relevant?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string; // YYYY-MM
  expiryDate?: string; // YYYY-MM
  credentialId?: string;
  credentialUrl?: string;
}

export interface Skill {
  category: string;
  skills: Array<{
    name: string;
    level: 1 | 2 | 3 | 4 | 5; // 1=Básico, 5=Experto
    yearsOfExperience?: number;
  }>;
}

export interface Language {
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  text: string;
  date: string; // YYYY-MM
  linkedin?: string;
}

// ========================================
// DATOS MOCK - REEMPLAZA CON TUS DATOS
// ========================================

export const personalInfo: PersonalInfo = {
  name: 'Douglas Rujana',
  title: 'Senior Full Stack Developer + AI Specialist',
  location: 'Guayaquil, Ecuador',
  email: 'douglas.rujana@example.com',
  phone: '+593 99 123 4567',
  website: 'https://douglasrujana.com',
  linkedin: 'https://linkedin.com/in/douglasrujana',
  github: 'https://github.com/douglasrujana',
  summary: `Desarrollador Full Stack con 5+ años de experiencia construyendo aplicaciones escalables y mantenibles. Especializado en arquitecturas limpias (Hexagonal, DDD), integración de IA, y soluciones cloud-native. Apasionado por el código limpio, SOLID principles, y mentoría técnica.`,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Douglas',
};

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tech Innovations Inc.',
    position: 'Senior Full Stack Developer',
    location: 'Remote',
    startDate: '2022-03',
    endDate: 'present',
    type: 'full-time',
    description:
      'Liderando el desarrollo de aplicaciones web modernas con arquitectura hexagonal y microservicios.',
    achievements: [
      'Diseñé e implementé arquitectura hexagonal que redujo el acoplamiento en 60%',
      'Integré IA (Gemini) para automatizar respuestas de soporte, reduciendo tickets en 40%',
      'Mentoría a 3 desarrolladores junior en clean code y SOLID principles',
      'Migré monolito legacy a microservicios con zero downtime',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Astro',
      'Svelte',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Gemini AI',
    ],
  },
  {
    id: 'exp-2',
    company: 'Digital Solutions Agency',
    position: 'Full Stack Developer',
    location: 'Guayaquil, Ecuador',
    startDate: '2020-06',
    endDate: '2022-02',
    type: 'full-time',
    description:
      'Desarrollo de aplicaciones web y e-commerce para clientes corporativos.',
    achievements: [
      'Construí 15+ sitios e-commerce con WooCommerce y custom themes',
      'Implementé sistema de inventario real-time con WebSockets',
      'Reduje tiempo de carga promedio de 4s a 1.2s con optimizaciones',
      'Capacité equipo en Git workflows y CI/CD con GitHub Actions',
    ],
    technologies: [
      'PHP',
      'Laravel',
      'WordPress',
      'MySQL',
      'React',
      'Tailwind CSS',
      'AWS',
    ],
  },
  {
    id: 'exp-3',
    company: 'Freelance',
    position: 'Full Stack Developer',
    location: 'Remote',
    startDate: '2019-01',
    endDate: '2020-05',
    type: 'freelance',
    description:
      'Desarrollo de soluciones web personalizadas para startups y pequeñas empresas.',
    achievements: [
      'Completé 20+ proyectos con 5⭐ rating promedio',
      'Desarrollé MVP para startup que consiguió $500K en funding',
      'Implementé sistema de facturación electrónica integrado con SRI Ecuador',
      'Automaticé procesos manuales, ahorrando 15h/semana a clientes',
    ],
    technologies: [
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Vue.js',
      'Bootstrap',
    ],
  },
];

export const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'Universidad de Guayaquil',
    degree: 'Ingeniería',
    field: 'Ingeniería en Sistemas Computacionales',
    location: 'Guayaquil, Ecuador',
    startDate: '2015',
    endDate: '2020',
    gpa: '8.5/10',
    honors: ['Graduado con honores', 'Mejor proyecto de tesis'],
    relevant: [
      'Estructuras de Datos y Algoritmos',
      'Diseño de Software',
      'Bases de Datos',
      'Arquitectura de Software',
      'Inteligencia Artificial',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023-08',
    expiryDate: '2026-08',
    credentialId: 'AWS-SAA-123456',
    credentialUrl: 'https://aws.amazon.com/verification',
  },
  {
    id: 'cert-2',
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2023-05',
    expiryDate: '2025-05',
    credentialId: 'GCP-PD-789012',
  },
  {
    id: 'cert-3',
    name: 'Clean Architecture & SOLID Principles',
    issuer: 'Udemy',
    date: '2022-11',
    credentialUrl: 'https://udemy.com/certificate/UC-123',
  },
  {
    id: 'cert-4',
    name: 'Advanced TypeScript',
    issuer: 'Frontend Masters',
    date: '2023-02',
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'TypeScript', level: 5, yearsOfExperience: 4 },
      { name: 'JavaScript', level: 5, yearsOfExperience: 6 },
      { name: 'Astro', level: 5, yearsOfExperience: 2 },
      { name: 'Svelte', level: 4, yearsOfExperience: 2 },
      { name: 'React', level: 4, yearsOfExperience: 4 },
      { name: 'Tailwind CSS', level: 5, yearsOfExperience: 3 },
      { name: 'HTML5/CSS3', level: 5, yearsOfExperience: 6 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 5, yearsOfExperience: 5 },
      { name: 'Express', level: 5, yearsOfExperience: 5 },
      { name: 'PHP', level: 4, yearsOfExperience: 4 },
      { name: 'Laravel', level: 4, yearsOfExperience: 3 },
      { name: 'Python', level: 3, yearsOfExperience: 2 },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 4, yearsOfExperience: 4 },
      { name: 'MySQL', level: 5, yearsOfExperience: 5 },
      { name: 'MongoDB', level: 4, yearsOfExperience: 4 },
      { name: 'Redis', level: 3, yearsOfExperience: 2 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 4, yearsOfExperience: 3 },
      { name: 'Kubernetes', level: 3, yearsOfExperience: 2 },
      { name: 'AWS', level: 4, yearsOfExperience: 3 },
      { name: 'GitHub Actions', level: 5, yearsOfExperience: 3 },
      { name: 'Vercel', level: 5, yearsOfExperience: 2 },
    ],
  },
  {
    category: 'AI & Tools',
    skills: [
      { name: 'Gemini AI', level: 5, yearsOfExperience: 1 },
      { name: 'OpenAI APIs', level: 4, yearsOfExperience: 2 },
      { name: 'LangChain', level: 3, yearsOfExperience: 1 },
      { name: 'Git', level: 5, yearsOfExperience: 6 },
    ],
  },
  {
    category: 'Architecture & Patterns',
    skills: [
      { name: 'Hexagonal Architecture', level: 5, yearsOfExperience: 3 },
      { name: 'SOLID Principles', level: 5, yearsOfExperience: 4 },
      { name: 'Design Patterns', level: 4, yearsOfExperience: 4 },
      { name: 'DDD', level: 4, yearsOfExperience: 2 },
      { name: 'Microservices', level: 4, yearsOfExperience: 3 },
      { name: 'REST APIs', level: 5, yearsOfExperience: 5 },
      { name: 'GraphQL', level: 3, yearsOfExperience: 2 },
    ],
  },
];

export const languages: Language[] = [
  { name: 'Español', proficiency: 'native' },
  { name: 'Inglés', proficiency: 'professional' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'María González',
    position: 'CTO',
    company: 'Tech Innovations Inc.',
    text: 'Douglas es uno de los mejores desarrolladores con los que he trabajado. Su capacidad para diseñar arquitecturas limpias y su atención al detalle son excepcionales. Siempre entrega código de calidad y a tiempo.',
    date: '2024-01',
    linkedin: 'https://linkedin.com/in/mariagonzalez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: 'test-2',
    name: 'Carlos Mendoza',
    position: 'Product Manager',
    company: 'Digital Solutions Agency',
    text: 'Trabajar con Douglas fue una experiencia increíble. No solo es técnicamente brillante, sino que también entiende el negocio y propone soluciones prácticas. Su experiencia con e-commerce nos ahorró meses de desarrollo.',
    date: '2023-06',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
  {
    id: 'test-3',
    name: 'Ana Rodríguez',
    position: 'Founder',
    company: 'StartupXYZ',
    text: 'Douglas construyó nuestro MVP en tiempo récord con calidad excepcional. Su conocimiento de arquitectura limpia nos permitió escalar sin problemas cuando conseguimos inversión. ¡Altamente recomendado!',
    date: '2023-03',
    linkedin: 'https://linkedin.com/in/anarodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calcula años de experiencia total
 */
export function getTotalYearsOfExperience(): number {
  const firstJob = experiences[experiences.length - 1];
  const startDate = new Date(firstJob.startDate + '-01');
  const now = new Date();
  const years = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(years);
}

/**
 * Formatea rango de fechas
 */
export function formatDateRange(start: string, end: string | 'present'): string {
  const startDate = new Date(start + '-01');
  const startFormatted = startDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
  });

  if (end === 'present') {
    return `${startFormatted} - Presente`;
  }

  const endDate = new Date(end + '-01');
  const endFormatted = endDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
  });

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Calcula duración en meses
 */
export function calculateDuration(start: string, end: string | 'present'): string {
  const startDate = new Date(start + '-01');
  const endDate = end === 'present' ? new Date() : new Date(end + '-01');

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  return `${years} ${years === 1 ? 'año' : 'años'} ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
}

/**
 * Obtiene todas las tecnologías únicas de experiencias
 */
export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => techs.add(tech));
  });
  return Array.from(techs).sort();
}

/**
 * Genera JSON-LD para SEO (Schema.org)
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: personalInfo.website,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.split(',')[0],
      addressCountry: 'EC',
    },
    sameAs: [personalInfo.linkedin, personalInfo.github],
    alumniOf: education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
    })),
    knowsAbout: getAllTechnologies(),
  };
}
