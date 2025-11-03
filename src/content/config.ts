/**
 * Content Collections Configuration
 * 
 * Define el schema para posts de blog con validación TypeScript
 * Astro usa Zod para validación en build time
 */

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Metadata básica
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    author: z.string().default('Douglas Rujana'),
    
    // Dates
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    
    // Categorización
    category: z.enum([
      'tutorial',
      'case-study',
      'opinion',
      'technical',
      'architecture',
      'ai',
      'devops',
    ]),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
    
    // Estado
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    
    // SEO & Social
    coverImage: z.string().url().optional(),
    coverImageAlt: z.string().optional(),
    ogImage: z.string().url().optional(),
    canonicalURL: z.string().url().optional(),
    
    // Reading time (calculado automáticamente, pero se puede override)
    readingTime: z.number().optional(),
    
    // Cross-posting settings
    crosspost: z
      .object({
        linkedin: z.boolean().default(true),
        twitter: z.boolean().default(true),
        facebook: z.boolean().default(false),
        devto: z.boolean().default(false),
      })
      .default({}),
    
    // Series (para posts relacionados)
    series: z
      .object({
        name: z.string(),
        order: z.number(),
      })
      .optional(),
    
    // Table of Contents
    showToc: z.boolean().default(true),
  }),
});

export const collections = {
  blog: blogCollection,
};
