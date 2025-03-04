// Simple Custom Chat Widget for GeneRuss
(function() {
  // Create the global createChat function
  window.createChat = function(config) {
    console.log("✅ Custom chat initialized with config:", config);
    
    // Default configuration
    const defaultConfig = {
      botName: "GeneRuss AI",
      chatTitle: "Need help or have questions?",
      theme: {
        primary: "#00FFBD",
        textOnPrimary: "#000",
        userMessage: {
          background: "#444",
          text: "#fff"
        },
        botMessage: {
          background: "#222",
          text: "#fff"
        }
      },
      buttonPosition: "bottom-right",
      webhookUrl: null, // This will be provided by the user
      apiKey: null, // Optional API key for authentication
    };
    
    // Merge passed config with defaults
    const mergedConfig = {...defaultConfig, ...config};
    
    // Create and append style
    const style = document.createElement('style');
    style.textContent = `
      .genruss-chat-button {
        position: fixed;
        ${mergedConfig.buttonPosition === "bottom-right" ? "bottom: 20px; right: 20px;" : "bottom: 20px; left: 20px;"}
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-color: ${mergedConfig.theme.primary};
        color: ${mergedConfig.theme.textOnPrimary};
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
      }
      
      .genruss-chat-button:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      .genruss-chat-container {
        position: fixed;
        ${mergedConfig.buttonPosition === "bottom-right" ? "bottom: 90px; right: 20px;" : "bottom: 90px; left: 20px;"}
        width: 350px;
        height: 500px;
        border-radius: 10px;
        background-color: #121212;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 9998;
        transform: scale(0);
        transform-origin: bottom right;
        transition: all 0.3s ease;
      }
      
      .genruss-chat-container.active {
        transform: scale(1);
      }
      
      .genruss-chat-header {
        background-color: ${mergedConfig.theme.primary};
        color: ${mergedConfig.theme.textOnPrimary};
        padding: 15px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .genruss-chat-close {
        cursor: pointer;
        font-size: 18px;
      }
      
      .genruss-chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .genruss-message {
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 80%;
        word-break: break-word;
      }
      
      .genruss-bot-message {
        background-color: ${mergedConfig.theme.botMessage.background};
        color: ${mergedConfig.theme.botMessage.text};
        align-self: flex-start;
      }
      
      .genruss-user-message {
        background-color: ${mergedConfig.theme.userMessage.background};
        color: ${mergedConfig.theme.userMessage.text};
        align-self: flex-end;
      }
      
      .genruss-chat-input-area {
        padding: 10px 15px;
        display: flex;
        gap: 10px;
        border-top: 1px solid #333;
      }
      
      .genruss-chat-input {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #444;
        background-color: #222;
        color: #fff;
        resize: none;
      }
      
      .genruss-chat-send {
        background-color: ${mergedConfig.theme.primary};
        color: ${mergedConfig.theme.textOnPrimary};
        border: none;
        border-radius: 5px;
        padding: 0 15px;
        cursor: pointer;
        font-weight: bold;
      }
      
      .genruss-chat-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .genruss-typing-indicator {
        display: inline-block;
        padding: 5px 10px;
        background-color: #333;
        border-radius: 10px;
        color: #ccc;
        align-self: flex-start;
        margin-top: 5px;
      }
      
      .genruss-typing-dots {
        display: inline-block;
      }
      
      .genruss-typing-dots span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #ccc;
        margin: 0 2px;
        animation: typing-dot 1.4s infinite;
      }
      
      .genruss-typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .genruss-typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing-dot {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
    
    // Create chat button
    const button = document.createElement('div');
    button.className = 'genruss-chat-button';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    document.body.appendChild(button);
    
    // Create chat container
    const container = document.createElement('div');
    container.className = 'genruss-chat-container';
    container.innerHTML = `
      <div class="genruss-chat-header">
        <div>${mergedConfig.chatTitle}</div>
        <div class="genruss-chat-close">×</div>
      </div>
      <div class="genruss-chat-messages"></div>
      <div class="genruss-chat-input-area">
        <textarea class="genruss-chat-input" placeholder="Type your message..." rows="1"></textarea>
        <button class="genruss-chat-send" disabled>Send</button>
      </div>
    `;
    document.body.appendChild(container);
    
    // Get elements
    const closeBtn = container.querySelector('.genruss-chat-close');
    const messagesDiv = container.querySelector('.genruss-chat-messages');
    const inputArea = container.querySelector('.genruss-chat-input');
    const sendBtn = container.querySelector('.genruss-chat-send');
    
    // Toggle chat container visibility
    button.addEventListener('click', () => {
      container.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
    
    // Handle input changes
    inputArea.addEventListener('input', () => {
      sendBtn.disabled = inputArea.value.trim() === '';
      
      // Auto resize textarea
      inputArea.style.height = 'auto';
      inputArea.style.height = (inputArea.scrollHeight) + 'px';
    });
    
    // Add message function
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `genruss-message ${isUser ? 'genruss-user-message' : 'genruss-bot-message'}`;
      messageDiv.textContent = text;
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return messageDiv;
    }
    
    // Add typing indicator
    function showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'genruss-typing-indicator';
      indicator.innerHTML = `
        <div class="genruss-typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      messagesDiv.appendChild(indicator);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return indicator;
    }
    
    // Remove typing indicator
    function removeTypingIndicator(indicator) {
      if (indicator && indicator.parentNode) {
        indicator.remove();
      }
    }
    
    // Send message to webhook
    async function sendMessageToWebhook(text) {
      if (!mergedConfig.webhookUrl) {
        console.warn('⚠️ No webhook URL provided. Using simulated responses.');
        return {
          type: 'text',
          content: 'To connect to a real chatbot, please provide a webhookUrl in the chat configuration.'
        };
      }
      
      try {
        console.log(`📤 Sending message to webhook: ${mergedConfig.webhookUrl}`);
        
        const headers = {
          'Content-Type': 'application/json'
        };
        
        // Add API key to headers if provided
        if (mergedConfig.apiKey) {
          headers['Authorization'] = `Bearer ${mergedConfig.apiKey}`;
        }
        
        // Create unique user session ID to maintain conversation context
        if (!window.chatSessionId) {
          window.chatSessionId = 'session_' + Math.random().toString(36).substring(2, 15);
        }
        
        // Format specifically for n8n webhook
        const response = await fetch(mergedConfig.webhookUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            message: text,
            sessionId: window.chatSessionId,
            timestamp: new Date().toISOString(),
            source: 'website_chat'
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          console.log('📥 Received JSON response from webhook:', data);
        } else {
          // Handle text responses
          const textData = await response.text();
          console.log('📥 Received text response from webhook:', textData);
          
          // Try to parse as JSON if it looks like JSON
          if (textData.trim().startsWith('{') || textData.trim().startsWith('[')) {
            try {
              data = JSON.parse(textData);
            } catch (e) {
              data = { type: 'text', content: textData };
            }
          } else {
            data = { type: 'text', content: textData };
          }
        }
        
        return data;
      } catch (error) {
        console.error('❌ Error sending message to webhook:', error);
        return {
          type: 'error',
          content: 'Sorry, there was an error connecting to the chatbot. Please try again later.'
        };
      }
    }
    
    // Handle response from webhook
    function handleResponse(response) {
      if (typeof response === 'string') {
        // Simple string response
        addMessage(response);
      } else if (response && typeof response === 'object') {
        // Handle structured response
        if (response.type === 'text' && response.content) {
          addMessage(response.content);
        } else if (response.type === 'error') {
          addMessage('Error: ' + (response.content || 'Unknown error occurred'));
        } else if (Array.isArray(response.messages)) {
          // Handle multiple messages
          response.messages.forEach(msg => {
            if (typeof msg === 'string') {
              addMessage(msg);
            } else if (msg && msg.content) {
              addMessage(msg.content);
            }
          });
        } else if (response.message) {
          // Common n8n response format
          addMessage(response.message);
        } else if (response.text) {
          // Another common format
          addMessage(response.text);
        } else if (response.response) {
          // Yet another format
          if (typeof response.response === 'string') {
            addMessage(response.response);
          } else if (response.response.message) {
            addMessage(response.response.message);
          } else if (response.response.text) {
            addMessage(response.response.text);
          } else {
            addMessage(JSON.stringify(response.response));
          }
        } else {
          // Fallback for unknown format
          try {
            // Try to find any property that might contain the response
            const possibleResponseKeys = ['response', 'answer', 'reply', 'content', 'data', 'result'];
            let foundKey = '';
            
            for (const key of possibleResponseKeys) {
              if (response[key] && (typeof response[key] === 'string' || typeof response[key] === 'object')) {
                foundKey = key;
                break;
              }
            }
            
            if (foundKey) {
              if (typeof response[foundKey] === 'string') {
                addMessage(response[foundKey]);
              } else {
                addMessage(JSON.stringify(response[foundKey]));
              }
            } else {
              addMessage(JSON.stringify(response));
            }
          } catch (e) {
            addMessage(JSON.stringify(response));
          }
        }
      } else {
        // Fallback
        addMessage('Received an unexpected response format from the server.');
      }
    }
    
    // Handle sending messages
    sendBtn.addEventListener('click', async () => {
      const text = inputArea.value.trim();
      if (!text) return;
      
      // Add user message
      addMessage(text, true);
      
      // Clear input
      inputArea.value = '';
      inputArea.style.height = 'auto';
      sendBtn.disabled = true;
      
      // Show typing indicator
      const typingIndicator = showTypingIndicator();
      
      try {
        // Send to webhook and get response
        const response = await sendMessageToWebhook(text);
        
        // Remove typing indicator
        removeTypingIndicator(typingIndicator);
        
        // Handle the response
        handleResponse(response);
      } catch (error) {
        // Remove typing indicator
        removeTypingIndicator(typingIndicator);
        
        // Show error message
        console.error('Error in chat message processing:', error);
        addMessage("Sorry, there was an error processing your message. Please try again.");
      }
    });
    
    // Handle Enter key
    inputArea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) {
          sendBtn.click();
        }
      }
    });
    
    // Add initial messages if configured
    if (config.initialMessages && Array.isArray(config.initialMessages)) {
      config.initialMessages.forEach(msg => {
        addMessage(msg);
      });
    }
    
    // Return cleanup function
    return function cleanup() {
      closeBtn.removeEventListener('click', () => {});
      button.removeEventListener('click', () => {});
      inputArea.removeEventListener('input', () => {});
      inputArea.removeEventListener('keydown', () => {});
      sendBtn.removeEventListener('click', () => {});
      
      try {
        document.head.removeChild(style);
        document.body.removeChild(button);
        document.body.removeChild(container);
      } catch (e) {
        console.error('Error during chat cleanup:', e);
      }
    };
  };
})();