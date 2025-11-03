<script lang="ts">
  /**
   * ChatWidget Component
   * 
   * Floating chat widget que impresiona:
   * - Botón flotante minimalista
   * - Modal expandible
   * - Streaming de respuestas (efecto typewriter)
   * - Historial de conversación
   * - Estados de loading elegantes
   * - Animaciones fluidas
   */

  import { nanoid } from 'nanoid';

  interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
  }

  // Estado
  let isOpen = $state(false);
  let messages = $state<Message[]>([]);
  let inputValue = $state('');
  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let messagesContainer: HTMLDivElement;

  // Mensaje de bienvenida
  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'assistant',
    content:
      '¡Hola! 👋 Soy el asistente IA de Douglas. Puedo responder preguntas sobre su experiencia, proyectos, habilidades y disponibilidad. ¿En qué puedo ayudarte?',
    timestamp: new Date(),
  };

  // Inicializar con mensaje de bienvenida
  $effect(() => {
    if (messages.length === 0) {
      messages = [welcomeMessage];
    }
  });

  // Auto-scroll al último mensaje
  $effect(() => {
    if (messagesContainer && messages.length > 0) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  });

  // Toggle widget
  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      // Focus input cuando se abre
      setTimeout(() => {
        const input = document.querySelector('.chat-input') as HTMLInputElement;
        input?.focus();
      }, 300);
    }
  }

  // Enviar mensaje
  async function sendMessage() {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };
    messages = [...messages, userMessage];
    inputValue = '';
    isLoading = true;
    error = null;

    try {
      // Crear mensaje del asistente (vacío, se llenará con streaming)
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      messages = [...messages, assistantMessage];

      // Llamar a la API con streaming
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          conversationHistory: messages
            .filter((m) => m.id !== 'welcome' && !m.isStreaming)
            .slice(-10) // Últimos 10 mensajes
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la respuesta');
      }

      // Procesar streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No se pudo iniciar el streaming');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') {
              // Finalizar streaming
              messages = messages.map((m) =>
                m.id === assistantMessage.id
                  ? { ...m, isStreaming: false }
                  : m
              );
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.chunk) {
                accumulatedText += parsed.chunk;
                // Actualizar mensaje en tiempo real
                messages = messages.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, content: accumulatedText }
                    : m
                );
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      error =
        err instanceof Error
          ? err.message
          : 'Error al procesar tu mensaje. Por favor, intenta de nuevo.';
      
      // Remover el último mensaje del asistente si hubo error
      messages = messages.slice(0, -1);
    } finally {
      isLoading = false;
    }
  }

  // Manejar Enter para enviar
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Sugerencias de preguntas
  const suggestions = [
    '¿Qué proyectos has realizado?',
    '¿Cuál es tu stack tecnológico?',
    '¿Tienes experiencia con IA?',
    '¿Estás disponible para proyectos?',
  ];

  function askSuggestion(suggestion: string) {
    inputValue = suggestion;
    sendMessage();
  }
</script>

<!-- Floating Button -->
<button
  class="chat-button"
  class:open={isOpen}
  onclick={toggleChat}
  aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
>
  {#if isOpen}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  {:else}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  {/if}
  
  {#if !isOpen}
    <span class="chat-badge">AI</span>
  {/if}
</button>

<!-- Chat Modal -->
{#if isOpen}
  <div class="chat-modal">
    <!-- Header -->
    <div class="chat-header">
      <div class="chat-header-content">
        <div class="chat-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <div class="chat-header-info">
          <h3>Asistente IA de Douglas</h3>
          <span class="chat-status">
            <span class="status-dot"></span>
            En línea
          </span>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="chat-messages" bind:this={messagesContainer}>
      {#each messages as message (message.id)}
        <div class="message message-{message.role}">
          <div class="message-bubble">
            <p>{message.content}</p>
            {#if message.isStreaming}
              <span class="typing-cursor">▋</span>
            {/if}
          </div>
        </div>
      {/each}

      {#if isLoading && messages[messages.length - 1]?.role === 'user'}
        <div class="message message-assistant">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      {/if}

      {#if error}
        <div class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      {/if}

      {#if messages.length === 1}
        <div class="suggestions">
          <p class="suggestions-title">Preguntas sugeridas:</p>
          {#each suggestions as suggestion}
            <button
              class="suggestion-button"
              onclick={() => askSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Input -->
    <div class="chat-input-container">
      <textarea
        class="chat-input"
        placeholder="Pregúntame lo que quieras..."
        bind:value={inputValue}
        onkeydown={handleKeydown}
        rows="1"
        disabled={isLoading}
      ></textarea>
      <button
        class="send-button"
        onclick={sendMessage}
        disabled={isLoading || !inputValue.trim()}
        aria-label="Enviar mensaje"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>

    <!-- Footer -->
    <div class="chat-footer">
      Powered by Gemini AI
    </div>
  </div>
{/if}

<style>
  /* Floating Button */
  .chat-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--color-gray-900);
    color: var(--color-white);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: all var(--transition-base);
    z-index: 1000;
  }

  .chat-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .chat-button:active {
    transform: scale(0.95);
  }

  .chat-button.open {
    background: var(--color-gray-700);
  }

  .chat-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 0.625rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* Chat Modal */
  .chat-modal {
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    width: 400px;
    max-width: calc(100vw - 3rem);
    height: 600px;
    max-height: calc(100vh - 10rem);
    background: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    z-index: 999;
    animation: slideUp var(--transition-base);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Header */
  .chat-header {
    padding: var(--space-lg);
    border-bottom: 1px solid var(--color-gray-200);
    background: var(--color-gray-50);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .chat-header-content {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .chat-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-gray-900);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chat-header-info h3 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-gray-900);
    margin: 0 0 4px;
  }

  .chat-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--color-gray-600);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Messages */
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .message {
    display: flex;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message-user {
    justify-content: flex-end;
  }

  .message-assistant {
    justify-content: flex-start;
  }

  .message-bubble {
    max-width: 80%;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .message-user .message-bubble {
    background: var(--color-gray-900);
    color: var(--color-white);
    border-bottom-right-radius: 4px;
  }

  .message-assistant .message-bubble {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
    border-bottom-left-radius: 4px;
  }

  .message-bubble p {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .typing-cursor {
    display: inline-block;
    animation: blink 1s infinite;
    margin-left: 2px;
  }

  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-gray-100);
    border-radius: var(--radius-md);
    width: fit-content;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-gray-500);
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .typing-indicator span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  /* Error Message */
  .error-message {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: #fee;
    color: #c33;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
  }

  /* Suggestions */
  .suggestions {
    margin-top: var(--space-md);
  }

  .suggestions-title {
    font-size: 0.875rem;
    color: var(--color-gray-600);
    margin-bottom: var(--space-sm);
  }

  .suggestion-button {
    display: block;
    width: 100%;
    text-align: left;
    padding: var(--space-sm) var(--space-md);
    margin-bottom: var(--space-xs);
    background: var(--color-gray-50);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    color: var(--color-gray-700);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .suggestion-button:hover {
    background: var(--color-gray-100);
    border-color: var(--color-gray-300);
  }

  /* Input */
  .chat-input-container {
    display: flex;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    border-top: 1px solid var(--color-gray-200);
  }

  .chat-input {
    flex: 1;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    font-family: var(--font-system);
    font-size: 0.9375rem;
    resize: none;
    max-height: 100px;
    transition: border-color var(--transition-base);
  }

  .chat-input:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .chat-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .send-button {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-gray-900);
    color: var(--color-white);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }

  .send-button:hover:not(:disabled) {
    background: var(--color-gray-800);
    transform: scale(1.05);
  }

  .send-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Footer */
  .chat-footer {
    padding: var(--space-sm);
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-gray-500);
    border-top: 1px solid var(--color-gray-200);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .chat-modal {
      width: calc(100vw - 2rem);
      height: calc(100vh - 8rem);
      right: 1rem;
      bottom: 5rem;
    }

    .chat-button {
      bottom: 1rem;
      right: 1rem;
    }
  }
</style>