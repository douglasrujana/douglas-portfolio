import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Test', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de inicio antes de cada prueba
    await page.goto('/');
  });

  test('should display the correct page title', async ({ page }) => {
    // Verificar que el título de la página sea el esperado
    await expect(page).toHaveTitle(/Douglas Rujana - Full Stack Developer & AI Specialist/);
  });

  test('should render the Hero component with the correct name', async ({ page }) => {
    // Buscar el nombre principal en un elemento <h1>
    // Esto verifica que el componente Hero se está renderizando
    const heroName = page.locator('h1');
    await expect(heroName).toBeVisible();
    await expect(heroName).toHaveText('Douglas Rujana');
  });

  test('should display the hero title (subtitle)', async ({ page }) => {
    // Verificar que el subtítulo del Hero esté visible
    const heroTitle = page.locator('p.hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Desarrollador Full Stack+AI');
  });

  test('should have visible social links in the Hero component', async ({ page }) => {
    // Verificar que los enlaces a redes sociales están presentes y visibles
    const githubLink = page.locator('a[aria-label="GitHub"]');
    const linkedinLink = page.locator('a[aria-label="LinkedIn"]');
    
    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
  });

  test('should have visible CTA buttons in the Hero component', async ({ page }) => {
    // Verificar que los botones de llamada a la acción existen
    const projectsButton = page.locator('a:has-text("Ver Proyectos")');
    const contactButton = page.locator('a:has-text("Contactar")');

    await expect(projectsButton).toBeVisible();
    await expect(contactButton).toBeVisible();
  });

});
