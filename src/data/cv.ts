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
  category?: string;
}

export interface CertificationCategory {
  id: string;
  name: string;
  icon?: string;
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
    id: 'exp-freelance',
    company: 'Profesional independiente',
    position: 'Desarrollador Full Stack & Consultor',
    location: 'Guayaquil, Guayas, Ecuador',
    startDate: '2019-01',
    endDate: 'present',
    type: 'freelance',
    description:
      'Desarrollo de soluciones personalizadas y consultoría técnica para diversos clientes.',
    achievements: [
      'Diseño y desarrollo de soluciones a medida, incluyendo un ERP ligero y aplicaciones turísticas',
      'Implementación de CRM con integraciones a WhatsApp y email marketing para campañas personalizadas',
      'Automatización de flujos de trabajo con N8N y Python, aumentando la eficiencia operativa',
      'Creación de sitios web de reservas con integración a plataformas como Booking, Expedia y Google Hotels',
      'Consultoría y asesoría técnica en programación, Linux, bases de datos y PHP',
      'Entrenamiento y capacitación técnica personalizada',
    ],
    technologies: [
      'PHP',
      'JavaScript',
      'Node.js',
      'Python',
      'N8N',
      'Bases de datos SQL/NoSQL',
      'Linux',
      'APIs de reservas (Booking, Expedia, Google Hotels)',
      'Sistemas de automatización',
      'WhatsApp Business API',
      'Email marketing',
      'Frameworks PHP'
    ],
  },
  {
    id: 'exp-aguas-merida',
    company: 'Aguas de Mérida',
    position: 'Desarrollador Backend',
    location: 'Mérida, Venezuela',
    startDate: '2009-10',
    endDate: '2018-12',
    type: 'full-time',
    description:
      'Responsable del soporte, configuración y operación de sistemas ERP y SCADA para la gestión de aguas.',
    achievements: [
      'Gestión integral del sistema de información ERP (SIGESP)',
      'Desarrollo de mejoras y nuevas funcionalidades según requisitos de usuarios',
      'Administración de bases de datos SQL, PostgreSQL, SQL Server y Oracle',
      'Administración de servidores Linux Debian y Windows Server',
      'Implementación de estrategias de respaldo y recuperación de datos',
      'Configuración y mantenimiento de sistemas SCADA para monitoreo de tanques y surtidores',
      'Documentación técnica y de procedimientos',
    ],
    technologies: [
      'ERP SIGESP',
      'SQL',
      'PostgreSQL',
      'SQL Server',
      'Oracle Database',
      'Linux Debian',
      'Windows Server',
      'SCADA',
      'Sistemas de respaldo',
      'Documentación técnica'
    ],
  },
  {
    id: 'exp-ait-pdvsa',
    company: 'AIT-PDVSA - Edif. 5 de Julio',
    position: 'Analista Programador',
    location: 'Maracaibo, Zulia, Venezuela',
    startDate: '2007-01',
    endDate: '2009-09',
    type: 'full-time',
    description:
      'Desarrollo de sistemas web y gestión de datos en entornos Oracle para la industria petrolera.',
    achievements: [
      'Análisis y programación de sistemas WEB con APIs REST y tecnologías modernas',
      'Diseño y configuración de sistemas Oracle Data Warehouse',
      'Desarrollo de aplicaciones empresariales con Oracle Forms',
      'Programación de extractores de datos en entornos Oracle',
      'Documentación de procedimientos, políticas y manuales de usuario',
    ],
    technologies: [
      'JavaScript',
      'HTML',
      'PHP',
      'AJAX',
      'REST APIs',
      'Linux',
      'Oracle Database',
      'Oracle Forms',
      'Data Warehouse'
    ],
  },
  {
    id: 'exp-fundacte',
    company: 'FUNDACTE - Mérida',
    position: 'Desarrollador Web',
    location: 'Mérida, Venezuela',
    startDate: '2006-01',
    endDate: '2006-12',
    type: 'full-time',
    description:
      'Desarrollo de un sistema WEB tipo ERP (SAID) para el sector público y docencia en tecnologías de software libre.',
    achievements: [
      'Diseño, análisis, modelado, programación, pruebas e implantación de un sistema WEB tipo ERP (SAID) para el sector público',
      'Docente para la Academia de Software Libre en múltiples tecnologías',
      'Implementación de buenas prácticas de desarrollo y pruebas unitarias',
    ],
    technologies: [
      'PHP',
      'JavaScript',
      'AJAX',
      'MySQL',
      'PostgreSQL',
      'Linux',
      'Apache',
      'UML',
      'PHPUnit'
    ],
  },
  {
    id: 'exp-pdvsa',
    company: 'PDVSA Servicios Petroleros, S.A. - Centro de Refinación Paraguana',
    position: 'Desarrollador Web Junior',
    location: 'Falcón, Venezuela',
    startDate: '2005-01',
    endDate: '2005-12',
    type: 'full-time',
    description:
      'Desarrollo de un sistema de información distribuido para la gestión de equipos de radio móvil.',
    achievements: [
      'Programación de un sistema de información distribuido SAMO (Sistema Móvil Operacional) tipo WEB para la gerencia de Telecom',
      'Gestión, asignación, devolución, inventario, reportes y control de los equipos de radio móvil asignados al personal de planta',
      'Documentación de nuevos procedimientos, cambios implementados, políticas e instructivos de uso',
    ],
    technologies: [
      'JavaScript',
      'HTML',
      'PostgreSQL',
      'Linux',
      'Apache',
      'Oracle PL/SQL'
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

// Categorías de certificaciones
export const certificationCategories: CertificationCategory[] = [
  { id: 'all', name: 'Todas', icon: 'star' },
  { id: 'uxui', name: 'UX/UI', icon: 'layout' },
  { id: 'web', name: 'Desarrollo Web', icon: 'code' },
  { id: 'ia', name: 'IA', icon: 'cpu' },
  { id: 'qa', name: 'QA', icon: 'check-circle' },
  { id: 'devsecops', name: 'DevSecOps', icon: 'shield' },
  { id: 'cloud', name: 'Cloud-native', icon: 'cloud' },
  { id: 'database', name: 'BD', icon: 'database' },
  { id: 'sap', name: 'SAP', icon: 'database' },
  { id: 'others', name: 'Otros', icon: 'award' },
];

export const certifications: Certification[] = [
  // BD
  {
    id: 'cert-bd-distribuidas',
    name: 'Aprende Bases de Datos Distribuidas en 14 Días, con Práctica',
    issuer: 'Udemy - Álvaro Chirou, Pablo Tilotta',
    date: '2025-03',
    credentialId: 'UC-7b27b7b3-532e-45ac-8882-4ee4b7446142',
    credentialUrl: 'https://www.udemy.com/certificate/UC-7b27b7b3-532e-45ac-8882-4ee4b7446142/',
    category: 'database',
  },

  // Cloud-native
  {
    id: 'cert-aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner (CLF-C02) [Español]',
    issuer: 'Udemy - Joan Amengual, Stephane Maarek',
    date: '2025-01',
    credentialId: 'UC-c9180e37-1c9e-4f2f-b6d9-e4ef64477292',
    credentialUrl: 'https://www.udemy.com/certificate/UC-c9180e37-1c9e-4f2f-b6d9-e4ef64477292/',
    category: 'cloud',
  },
  {
    id: 'cert-vertex-ai',
    name: 'Vertex AI | Gemini | Generative AI - GCP Machine learning',
    issuer: 'Udemy - Ankit Mistry',
    date: '2025-04',
    credentialId: 'UC-5314769c-9305-40a8-9d7b-bead78170192',
    credentialUrl: 'https://www.udemy.com/certificate/UC-5314769c-9305-40a8-9d7b-bead78170192/',
    category: 'cloud',
  },
  {
    id: 'cert-azure',
    name: 'Microsoft Azure: From Zero to Hero - The Complete Guide',
    issuer: 'Udemy - Memi Lavi',
    date: '2024-06',
    credentialId: 'UC-7a1d93b3-8936-4e8e-a65c-440fea02a311',
    credentialUrl: 'https://www.udemy.com/certificate/UC-7a1d93b3-8936-4e8e-a65c-440fea02a311/',
    category: 'cloud',
  },
  // QA
  {
    id: 'cert-php-testing',
    name: 'Curso de testing para PHP y Laravel - Experto en 100 días',
    issuer: 'Udemy - Zataca Academy',
    date: '2025-05',
    credentialId: 'UC-8fa957e2-8772-4f2d-85ef-33983f6cb8d4',
    credentialUrl: 'https://www.udemy.com/certificate/UC-8fa957e2-8772-4f2d-85ef-33983f6cb8d4/',
    category: 'qa',
  },

  // DevSecOps
  {
    id: 'cert-github-actions',
    name: 'Git GitHub Actions, Buenas Prácticas de Integración Continua',
    issuer: 'Udemy - Carlos Adrian Soto Botero',
    date: '2025-01',
    credentialId: 'UC-1b56ed1a-625c-456a-9049-b544e3156d53',
    credentialUrl: 'https://www.udemy.com/certificate/UC-1b56ed1a-625c-456a-9049-b544e3156d53/',
    category: 'devsecops',
  },
  {
    id: 'cert-devsecops-beginners',
    name: 'DevSecOps for the Absolute Beginners - Hands On Demos',
    issuer: 'Udemy - A Security Guru, Raghu The Security Expert',
    date: '2025-05',
    credentialId: 'UC-aed0c4cf-8770-4ac3-b4ff-90406ded76ad',
    credentialUrl: 'https://www.udemy.com/certificate/UC-aed0c4cf-8770-4ac3-b4ff-90406ded76ad/',
    category: 'devsecops',
  },
  {
    id: 'cert-devops-integral',
    name: 'DevOps Integral Docker, Kubernetes, Jenkins, GitFlow CI CD',
    issuer: 'Udemy - Carlos Adrian Soto Botero',
    date: '2025-03',
    credentialId: 'UC-ac8a75b9-3e7b-4696-add8-72407865c013',
    credentialUrl: 'https://www.udemy.com/certificate/UC-ac8a75b9-3e7b-4696-add8-72407865c013/',
    category: 'devsecops',
  },
  {
    id: 'cert-devops-project',
    name: 'Ultimate DevOps Project Implementation',
    issuer: 'Udemy - Abhishek Veeramallam',
    date: '2025-08',
    credentialId: 'UC-ab568f37-5a4d-4c82-a56a-c0a5ce0efe93',
    credentialUrl: 'https://www.udemy.com/certificate/UC-ab568f37-5a4d-4c82-a56a-c0a5ce0efe93/',
    category: 'devsecops',
  },
  {
    id: 'cert-git',
    name: 'Introduction to Git',
    issuer: 'W3Schools',
    date: '2023-11',
    credentialId: '12345678',
    credentialUrl: 'https://www.w3schools.com/cert/default.asp',
    category: 'devsecops',
  },
  {
    id: 'cert-copilot',
    name: 'Curso GitHub Copilot. Haz que la IA programe por ti',
    issuer: 'Udemy - Ivan AlsiGo',
    date: '2025-06',
    credentialId: 'UC-8ae16b8c-e56b-486b-b3af-34c3cdfa7dce',
    credentialUrl: 'https://www.udemy.com/certificate/UC-8ae16b8c-e56b-486b-b3af-34c3cdfa7dce/',
    category: 'web',
  },
  {
    id: 'cert-ai-coding',
    name: 'The Complete AI Coding Course (2025) - Cursor AI, v0, Vercel',
    issuer: 'Udemy - Brendan AI',
    date: '2025-06',
    credentialId: 'UC-7c873bde-75d9-4b94-aebb-6bbf26f4f64c',
    credentialUrl: 'https://www.udemy.com/certificate/UC-7c873bde-75d9-4b94-aebb-6bbf26f4f64c/',
    category: 'web',
  },
  {
    id: 'cert-wordpress',
    name: 'Curso COMPLETO: de Cero a EXPERTO en WordPress tu WEB al 100',
    issuer: 'Udemy - Carlos Pech',
    date: '2025-07',
    credentialId: 'UC-b5303524-7ef3-47f6-af2b-4a9000759842',
    credentialUrl: 'https://www.udemy.com/certificate/UC-b5303524-7ef3-47f6-af2b-4a9000759842/',
    category: 'web',
  },
  {
    id: 'cert-js-testing',
    name: 'JavaScript Unit Testing - The Practical Guide',
    issuer: 'Udemy - Academind by Maximilian Schwarzmüller',
    date: '2025-01',
    credentialId: 'UC-d7b62a2b-ab18-461a-a6d4-d6ee113e1937',
    credentialUrl: 'https://www.udemy.com/certificate/UC-d7b62a2b-ab18-461a-a6d4-d6ee113e1937/',
    category: 'web',
  },
  {
    id: 'cert-vibe-coding',
    name: 'Vibe Coding - Aprende a Programar de Cero a Experto con IA',
    issuer: 'Udemy - Juan Fernando Urrego',
    date: '2025-07',
    credentialId: 'UC-ae6136c1-1b72-4b8b-a012-1a6f134adffe',
    credentialUrl: 'https://www.udemy.com/certificate/UC-ae6136c1-1b72-4b8b-a012-1a6f134adffe/',
    category: 'web',
  },
  {
    id: 'cert-laravel',
    name: 'Desarrollo web profesional en PHP con Laravel 12 y MySQL',
    issuer: 'Udemy - Juan Carlos Arcila Díaz',
    date: '2025-08',
    credentialId: 'UC-71cfef8d-a183-4478-9b42-4f3ce5392134',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/image/UC-71cfef8d-a183-4478-9b42-4f3ce5392134.jpg',
    category: 'web',
  },
  // IA
  {
    id: 'cert-aws-ai-practitioner',
    name: '[2025] Curso Completo AWS Certified AI Practitioner AIF-C01',
    issuer: 'Udemy - Joan Amengual',
    date: '2025-03',
    credentialId: 'UC-ff3be7f6-a159-436c-8c58-d0f3f41433ea',
    credentialUrl: 'https://www.udemy.com/certificate/UC-ff3be7f6-a159-436c-8c58-d0f3f41433ea/',
    category: 'ia',
  },
  {
    id: 'cert-n8n-ia',
    name: 'n8n: Agentes y automatizaciones de IA (¡sin código!)',
    issuer: 'Udemy - Krystian Wojtarowicz, Damian Danielczyk, DFA Course Academy',
    date: '2025-06',
    credentialId: 'UC-792d6d62-f648-43b8-8052-28ff0fece71e',
    credentialUrl: 'https://www.udemy.com/certificate/UC-792d6d62-f648-43b8-8052-28ff0fece71e/',
    category: 'ia',
  },
  
  // Desarrollo Web
  {
    id: 'cert-php-moderno',
    name: 'Curso de PHP Moderno',
    issuer: 'Udemy - Héctor de León',
    date: '2025-03',
    credentialId: 'UC-5ee10e41-048c-421a-956f-668f0b6135bf',
    credentialUrl: 'https://www.udemy.com/certificate/UC-5ee10e41-048c-421a-956f-668f0b6135bf/',
    category: 'web',
  },
  {
    id: 'cert-php-mvc',
    name: 'Write PHP Like a Pro: Build a PHP MVC Framework From Scratch',
    issuer: 'Udemy - Dave Hollingworth',
    date: '2024-10',
    credentialId: 'UC-fd74c0b7-3adb-4bfa-87c5-61759b1b167c',
    credentialUrl: 'https://www.udemy.com/certificate/UC-fd74c0b7-3adb-4bfa-87c5-61759b1b167c/',
    category: 'web',
  },
  {
    id: 'cert-google-web',
    name: 'Introducción al Desarrollo Web I',
    issuer: 'Google Actívate',
    date: '2020-06',
    credentialId: 'EGJ NGS 9RX',
    category: 'web',
  },
  {
    id: 'cert-3',
    name: 'Clean Architecture & SOLID Principles',
    issuer: 'Udemy',
    date: '2022-11',
    credentialUrl: 'https://udemy.com/certificate/UC-123',
    category: 'web',
  },
  {
    id: 'cert-google-ecommerce',
    name: 'Comercio Electrónico',
    issuer: 'Google Actívate',
    date: '2020-05',
    credentialId: 'UKU CN7 YDJ',
    category: 'web',
  },
  
  // Inglés
  {
    id: 'cert-efset',
    name: 'EF SET English Certificate - B1 Intermediate',
    issuer: 'EF SET',
    date: '2020-07',
    credentialId: '42/100 (B1 Intermediate)',
    credentialUrl: 'https://cert.efset.org/ubsZs7',
    category: 'english',
  },
  
  // SAP
  {
    id: 'cert-sap-mm',
    name: 'SAP EXPERT USER - MATERIAL MANAGEMENT WITH SAP S/4 HANA',
    issuer: 'Nextech',
    date: '2024-04',
    credentialId: '42797-42840-10990',
    credentialUrl: 'https://nextech.pe/validacion-de-certificados/',
    category: 'sap',
  },
  {
    id: 'cert-sap-business-one',
    name: 'Taller: SAP Business One 10.0 for SAP HANA desde Cero',
    issuer: 'Nextech',
    date: '2023-08',
    credentialId: '32772-32771-10990',
    credentialUrl: 'https://nextech.pe/validacion-de-certificados/',
    category: 'sap',
  },
  {
    id: 'cert-sap-erp-hana',
    name: 'Taller: SAP ERP y SAP S/4 HANA desde Cero',
    issuer: 'Nextech',
    date: '2023-08',
    credentialId: '32767-32764-10990',
    credentialUrl: 'https://nextech.pe/validacion-de-certificados/',
    category: 'sap',
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
  if (experiences.length === 0) return 0;
  
  const firstJob = experiences[experiences.length - 1];
  if (!firstJob) return 0;
  
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
