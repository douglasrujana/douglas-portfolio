/**
 * Blog Utility Functions
 * 
 * Funciones helper para manipular posts, calcular reading time,
 * formatear fechas, etc.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Calcula el tiempo de lectura estimado
 * Basado en 200 palabras por minuto (promedio en español)
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Formatea una fecha a español
 */
export function formatDate(date: Date, format: 'long' | 'short' = 'long'): string {
  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return new Intl.DateTimeFormat('es-ES', options).format(date);
}

/**
 * Obtiene todos los posts publicados (no drafts)
 * Ordenados por fecha descendente
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}

/**
 * Obtiene posts destacados
 */
export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true && data.featured === true;
  });

  const sorted = posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Obtiene posts por categoría
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true && data.category === category;
  });

  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}

/**
 * Obtiene posts por tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true && data.tags.includes(tag);
  });

  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}

/**
 * Obtiene todos los tags únicos de posts publicados
 */
export async function getAllTags(): Promise<
  Array<{ tag: string; count: number }>
> {
  const posts = await getPublishedPosts();
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Obtiene todas las categorías únicas con conteo
 */
export async function getAllCategories(): Promise<
  Array<{ category: string; count: number }>
> {
  const posts = await getPublishedPosts();
  const categoryCount = new Map<string, number>();

  posts.forEach((post) => {
    const category = post.data.category;
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });

  return Array.from(categoryCount.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Obtiene posts relacionados basados en tags
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const currentTags = currentPost.data.tags;

  // Calcular score de similitud
  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const commonTags = post.data.tags.filter((tag) =>
        currentTags.includes(tag)
      );
      return {
        post,
        score: commonTags.length,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, limit).map(({ post }) => post);
}

/**
 * Obtiene posts de una serie
 */
export async function getSeriesPosts(seriesName: string): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return (
      data.draft !== true &&
      data.series?.name === seriesName
    );
  });

  return posts.sort((a, b) => {
    const orderA = a.data.series?.order ?? 0;
    const orderB = b.data.series?.order ?? 0;
    return orderA - orderB;
  });
}

/**
 * Genera slug desde título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Remove consecutive -
    .trim();
}

/**
 * Extrae texto plano del contenido MDX
 * (para calcular reading time)
 */
export function extractPlainText(markdown: string): string {
  // Remove code blocks
  let text = markdown.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  text = text.replace(/`[^`]+`/g, '');
  // Remove images
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');
  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, '');
  // Remove markdown formatting
  text = text.replace(/[*_~#>]/g, '');
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

/**
 * Genera excerpt del post (primeros 160 caracteres)
 */
export function generateExcerpt(text: string, maxLength = 160): string {
  const plain = extractPlainText(text);
  if (plain.length <= maxLength) return plain;
  return plain.substring(0, maxLength).trim() + '...';
}

/**
 * Valida si un post debe ser publicado en una plataforma
 */
export function shouldCrossPost(
  post: BlogPost,
  platform: 'linkedin' | 'twitter' | 'facebook' | 'devto'
): boolean {
  return post.data.crosspost?.[platform] ?? false;
}
