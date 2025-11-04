<script lang="ts">
  /**
   * Skills Grid Component
   * Grid de skills por categoría con progress bars
   * ATS-friendly con texto legible
   */

  import type { Skill } from '../../../data/cv';

  interface Props {
    skills: Skill[];
  }

  let { skills }: Props = $props();

  // Level labels
  const levelLabels = ['Básico', 'Intermedio', 'Competente', 'Avanzado', 'Experto'];

  // Get level percentage
  function getLevelPercentage(level: number): number {
    return (level / 5) * 100;
  }

  // Get level color
  function getLevelColor(level: number): string {
    if (level >= 4) return '#10b981'; // Green
    if (level >= 3) return '#3b82f6'; // Blue
    return '#6b7280'; // Gray
  }
</script>

<div class="skills-grid">
  {#each skills as category, index}
    <div class="skill-category" data-aos="fade-up" data-aos-delay={index * 100}>
      <h3 class="category-title">{category.category}</h3>
      <div class="skills-list">
        {#each category.skills as skill}
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{skill.name}</span>
              <span class="skill-level" style="color: {getLevelColor(skill.level)}">
                {levelLabels[skill.level - 1]}
              </span>
            </div>
            <div class="skill-bar-container">
              <div
                class="skill-bar"
                style="width: {getLevelPercentage(skill.level)}%; background-color: {getLevelColor(skill.level)}"
              ></div>
            </div>
            {#if skill.yearsOfExperience}
              <span class="skill-experience">
                {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'año' : 'años'} de experiencia
              </span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-xl);
  }

  /* Category */
  .skill-category {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    border: 1px solid var(--color-gray-200);
    transition: all var(--transition-base);
  }

  .skill-category:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }

  .category-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-gray-900);
    margin: 0 0 var(--space-lg);
    padding-bottom: var(--space-sm);
    border-bottom: 2px solid var(--color-accent);
  }

  /* Skills List */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  /* Skill Item */
  .skill-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xs);
  }

  .skill-name {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-gray-900);
  }

  .skill-level {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Progress Bar */
  .skill-bar-container {
    width: 100%;
    height: 8px;
    background: var(--color-gray-100);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .skill-bar {
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Experience */
  .skill-experience {
    font-size: 0.75rem;
    color: var(--color-gray-500);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
