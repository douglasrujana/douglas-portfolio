import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directorio donde se encuentran las pruebas
  testDir: './tests/e2e',
  
  // Tiempo máximo de espera para una prueba (en milisegundos)
  timeout: 30 * 1000,
  
  // Tiempo máximo de espera para las aserciones `expect`
  expect: {
    timeout: 5000,
  },
  
  // Reporter para los resultados de las pruebas
  reporter: [['html', { outputFolder: './tests/e2e/playwright-report' }]],
  
  // Directorio de salida para artefactos de prueba como trazas, screenshots y videos
  outputDir: './tests/e2e/test-results',
  
  // Configuración del servidor web
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },

  // Configuración de los proyectos (navegadores)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Descomenta para probar en otros navegadores
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Opciones de uso global
  use: {
    // URL base para las acciones de navegación (ej. `page.goto('/')`)
    baseURL: 'http://localhost:4321',
    
    // Grabar trazas de las pruebas para depuración
    trace: 'on-first-retry',
    // Capturar screenshot solo en caso de fallo
    screenshot: 'only-on-failure',
    // Grabar video solo en caso de fallo
    video: 'on-first-retry',
  },
});
