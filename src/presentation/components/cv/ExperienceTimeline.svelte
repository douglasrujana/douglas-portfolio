<script lang="ts">
  /**
   * Experience Timeline Component
   * Timeline vertical con experiencias laborales
   * ATS-friendly con semantic HTML
   */

  import type { Experience } from '../../../data/cv';
  import { formatDateRange, calculateDuration } from '../../../data/cv';

  interface Props {
    experiences: Experience[];
  }

  let { experiences }: Props = $props();

  // Type labels en español
  const typeLabels: Record<string, string> = {
    'full-time': 'Tiempo Completo',
    'part-time': 'Medio Tiempo',
    freelance: 'Freelance',
    contract: 'Contrato',
  };
</script>

<div class="timeline">
  {#each experiences as exp, index}
    <article class="timeline-item" data-aos="fade-up" data-aos-delay={index * 100}>
      <!-- Timeline dot & line -->
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
        {#if index < experiences.length - 1}
          <div class="timeline-line"></div>
        {/if}
      </div>

      <!-- Content -->
      <div class="timeline-content">
        <!-- Header -->
        <header class="experience-header">
          <div class="experience-title-group">
            <h3 class="experience-position">{exp.position}</h3>
            <div class="experience-meta">
              <span class="experience-company">{exp.company}</span>
              <span class="meta-separator">·</span>
              <span class="experience-location">{exp.location}</span>
              <span class="meta-separator">·</span>
              <span class="experience-type">{typeLabels[exp.type]}</span>
            </div>
          </div>
          <div class="experience-dates">
            <time datetime={exp.startDate}>
              {formatDateRange(exp.startDate, exp.endDate)}
            </time>
            <span class="experience-duration">
              {calculateDuration(exp.startDate, exp.endDate)}
            </span>
          </div>
        </header>

        <!-- Description -->
        <p class="experience-description">{exp.description}</p>

        <!-- Achievements -->
        {#if exp.achievements.length > 0}
          <div class="experience-achievements">
            <h4 class="achievements-title">Logros clave:</h4>
            <ul class="achievements-list">
              {#each exp.achievements as achievement}
                <li>{achievement}</li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Technologies -->
        {#if exp.technologies.length > 0}
          <div class="experience-technologies">
            {#each exp.technologies as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .timeline {
    position: relative;
    padding: 0;
  }

  /* Timeline Item */
  .timeline-item {
    position: relative;
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  /* Timeline Marker */
  .timeline-marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .timeline-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 3px solid var(--color-white);
    box-shadow: 0 0 0 3px var(--color-accent-light);
    z-index: 2;
    transition: transform var(--transition-base);
  }

  .timeline-item:hover .timeline-dot {
    transform: scale(1.3);
  }

  .timeline-line {
    width: 2px;
    flex: 1;
    background: var(--color-gray-200);
    margin-top: var(--space-sm);
  }

  /* Content */
  .timeline-content {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    border: 1px solid var(--color-gray-200);
    transition: all var(--transition-base);
  }

  .timeline-item:hover .timeline-content {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
    transform: translateX(4px);
  }

  /* Header */
  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
  }

  .experience-title-group {
    flex: 1;
  }

  .experience-position {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-gray-900);
    margin: 0 0 var(--space-xs);
  }

  .experience-meta {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 0.875rem;
    color: var(--color-gray-600);
    flex-wrap: wrap;
  }

  .experience-company {
    font-weight: 500;
    color: var(--color-gray-900);
  }

  .meta-separator {
    color: var(--color-gray-400);
  }

  .experience-dates {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-xs);
    text-align: right;
    flex-shrink: 0;
  }

  .experience-dates time {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-700);
  }

  .experience-duration {
    font-size: 0.75rem;
    color: var(--color-gray-500);
  }

  /* Description */
  .experience-description {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--color-gray-700);
    margin-bottom: var(--space-md);
  }

  /* Achievements */
  .experience-achievements {
    margin-bottom: var(--space-md);
  }

  .achievements-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-900);
    margin-bottom: var(--space-sm);
  }

  .achievements-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .achievements-list li {
    position: relative;
    padding-left: var(--space-lg);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-gray-700);
    margin-bottom: var(--space-xs);
  }

  .achievements-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 600;
  }

  /* Technologies */
  .experience-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-md);
    padding-top: var(--space-md);
    border-top: 1px solid var(--color-gray-200);
  }

  .tech-tag {
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-gray-100);
    color: var(--color-gray-700);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    transition: all var(--transition-base);
  }

  .tech-tag:hover {
    background: var(--color-accent);
    color: var(--color-white);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .timeline-item {
      grid-template-columns: 24px 1fr;
      gap: var(--space-md);
    }

    .timeline-dot {
      width: 12px;
      height: 12px;
    }

    .experience-header {
      flex-direction: column;
      gap: var(--space-sm);
    }

    .experience-dates {
      align-items: flex-start;
      text-align: left;
    }

    .timeline-content {
      padding: var(--space-md);
    }

    .experience-position {
      font-size: 1.125rem;
    }
  }
</style>
