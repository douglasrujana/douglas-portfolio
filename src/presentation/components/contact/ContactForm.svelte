<script lang="ts">
  let name = '';
  let email = '';
  let company = '';
  let message = '';
  let loading = false;
  let success = false;
  let error = '';

  function validateForm(): boolean {
    if (name.length < 2) {
      error = 'Nombre debe tener al menos 2 caracteres';
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = 'Email inválido';
      return false;
    }
    if (message.length < 10) {
      error = 'Mensaje debe tener al menos 10 caracteres';
      return false;
    }
    return true;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';

    if (!validateForm()) return;

    loading = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });

      if (response.ok) {
        success = true;
        name = email = company = message = '';
      } else {
        error = 'Error al enviar. Intenta de nuevo.';
      }
    } catch (err) {
      error = 'Error de conexión.';
    } finally {
      loading = false;
    }
  }
</script>

<section class="contact-section">
  <div class="contact-container">
    <h2 class="contact-title">Trabajemos Juntos</h2>
    <p class="contact-description">
      ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudar.
    </p>

    {#if success}
      <div class="success-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3>¡Mensaje enviado!</h3>
        <p>Te responderé pronto. Revisa tu email.</p>
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="contact-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            id="name"
            type="text"
            bind:value={name}
            required
            minlength="2"
            placeholder="Tu nombre"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div class="form-group">
          <label for="company">Empresa (opcional)</label>
          <input
            id="company"
            type="text"
            bind:value={company}
            placeholder="Tu empresa"
          />
        </div>

        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea
            id="message"
            bind:value={message}
            required
            minlength="10"
            rows="5"
            placeholder="Cuéntame sobre tu proyecto... (mínimo 10 caracteres)"
          ></textarea>
        </div>

        {#if error}
          <p class="error-message">{error}</p>
        {/if}

        <button type="submit" disabled={loading} class="submit-button">
          {loading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  .contact-section {
    padding: var(--space-2xl) var(--space-lg);
    background: var(--color-gray-50);
  }

  .contact-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-title {
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: var(--space-md);
  }

  .contact-description {
    text-align: center;
    color: var(--color-gray-600);
    margin-bottom: var(--space-xl);
  }

  .contact-form {
    background: var(--color-white);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .form-group {
    margin-bottom: var(--space-lg);
  }

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: var(--space-xs);
    color: var(--color-gray-700);
  }

  input, textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: border-color var(--transition-base);
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .submit-button {
    width: 100%;
    padding: var(--space-md);
    background: var(--color-gray-900);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .submit-button:hover:not(:disabled) {
    background: var(--color-gray-800);
    transform: translateY(-2px);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success-message {
    text-align: center;
    padding: var(--space-2xl);
    background: var(--color-white);
    border-radius: var(--radius-lg);
  }

  .success-message svg {
    color: var(--color-accent);
    margin-bottom: var(--space-md);
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-bottom: var(--space-md);
  }
</style>
