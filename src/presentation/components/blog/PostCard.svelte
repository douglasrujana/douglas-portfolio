<script lang="ts">
  /**
   * PostCard Component
   * Card para mostrar preview de un post
   */

  import Card from '../ui/Card.svelte';
  import TechBadge from '../ui/TechBadge.svelte';

  interface Post {
    slug: string;
    data: {
      title: string;
      description: string;
      category: string;
      tags: string[];
      publishedAt: Date;
      coverImage?: string;
      readingTime?: number;
    };
  }

  interface Props {
    post: Post;
    featured?: boolean;
  }

  let { post, featured = false }: Props = $props();

  // Formatear fecha
  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  // Traducir categoría
  const categoryLabels: Record<string, string> = {
    tutorial: 'Tutorial',
    'case-study': 'Caso de Estudio',
    opinion: 'Opinión',
    technical: 'Técnico',
    architecture: 'Arquitectura',
    ai: 'Inteligencia Artificial',
    devops: 'DevOps',
  };
</script>

<a href={`/blog/${post.slug}`} class="post-card-link">
  <Card hoverable={true} padding="md" class={featured ? 'featured-card' : ''}>
    <!-- Cover Image -->
    {#if post.data.coverImage}
      <div class="post-image-wrapper">
        <img
          src={post.data.coverImage}
          alt={post.data.title}
          class="post-image"
          loading="lazy"
        />
        {#if featured}
          <div class="featured-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            Destacado
          </div>
        {/if}
      </div>
    {/if}

    <!-- Content -->
    <div class="post-content">
      <!-- Category & Reading Time -->
      <div class="post-meta">
        <span class="post-category">{categoryLabels[post.data.category]}</span>
        {#if post.data.readingTime}
          <span class="post-meta-separator">·</span>
          <span class="post-reading-time">
            {post.data.readingTime} min lectura
          </span>
        {/if}
      </div>

      <!-- Title -->
      <h3 class="post-title">
        {post.data.title}
      </h3>

      <!-- Description -->
      <p class="post-description">
        {post.data.description}
      </p>

      <!-- Tags -->
      <div class="post-tags">
        {#each post.data.tags.slice(0, 3) as tag}
          <TechBadge label={tag} />
        {/each}
        {#if post.data.tags.length > 3}
          <span class="post-tags-more">
            +{post.data.tags.length - 3}
          </span>
        {/if}
      </div>

      <!-- Footer -->
      <div class="post-footer">
        <time datetime={post.data.publishedAt.toISOString()} class="post-date">
          {formatDate(post.data.publishedAt)}
        </time>
        <span class="post-read-more">
          Leer más
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </div>
  </Card>
</a>

<style>
  .post-card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .featured-card {
    border: 1px solid var(--color-accent);
  }

  /* Image */
  .post-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: var(--space-md);
    background: var(--color-gray-100);
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .post-card-link:hover .post-image {
    transform: scale(1.05);
  }

  .featured-badge {
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-md);
    background: var(--color-accent);
    color: var(--color-white);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
  }

  /* Content */
  .post-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  /* Meta */
  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 0.8125rem;
    color: var(--color-gray-500);
  }

  .post-category {
    color: var(--color-accent);
    font-weight: 500;
  }

  .post-meta-separator {
    color: var(--color-gray-400);
  }

  /* Title */
  .post-title {
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--color-gray-900);
    margin: 0;
    line-height: 1.3;
    transition: color var(--transition-base);
  }

  .post-card-link:hover .post-title {
    color: var(--color-accent);
  }

  /* Description */
  .post-description {
    font-size: 0.9375rem;
    font-weight: 300;
    color: var(--color-gray-600);
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Tags */
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-xs);
    margin-top: var(--space-xs);
  }

  .post-tags-more {
    font-size: 0.75rem;
    color: var(--color-gray-500);
    font-weight: 500;
  }

  /* Footer */
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-sm);
    margin-top: var(--space-sm);
    border-top: 1px solid var(--color-gray-200);
  }

  .post-date {
    font-size: 0.875rem;
    color: var(--color-gray-500);
  }

  .post-read-more {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 0.875rem;
    color: var(--color-gray-700);
    font-weight: 500;
    transition: all var(--transition-base);
  }

  .post-card-link:hover .post-read-more {
    color: var(--color-accent);
    transform: translateX(4px);
  }

  .post-read-more svg {
    transition: transform var(--transition-base);
  }

  .post-card-link:hover .post-read-more svg {
    transform: translateX(2px);
  }
</style>
