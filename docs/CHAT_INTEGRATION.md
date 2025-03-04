# Chat Widget with n8n Integration

This documentation explains how to set up and configure the chat widget with n8n workflow integration for the GeneRuss website.

## Overview

The chat widget provides website visitors with an interactive chat experience powered by n8n workflows. The integration uses webhooks to send messages from the website to n8n and receive responses back.

Key features:
- Real-time chat interactions
- Session management to maintain conversation context
- Customizable theming to match the website design
- Support for various response formats
- Mobile-friendly design

## Environment Configuration

The chat widget requires the following environment variables to be set:

1. **Required**: `NEXT_PUBLIC_CHAT_WEBHOOK_URL` - The n8n webhook URL to send messages to
   - Format: `https://your-n8n-instance.com/webhook/your-webhook-id/chat`

2. **Optional**: `NEXT_PUBLIC_CHAT_API_KEY` - API key for webhook authentication (if your n8n webhook requires it)

These variables should be set in your `.env.local` file for local development and in your deployment environment settings for production.

## n8n Workflow Setup

To create an n8n workflow that works with the chat widget:

1. **Create a new workflow in n8n**:
   - Log in to your n8n instance
   - Create a new workflow
   - Name it something like "Website Chat Bot"

2. **Add a Webhook node**:
   - Add a new "Webhook" node as the trigger
   - Configure it with the following settings:
     - Authentication: None (or Basic Auth if you're using an API key)
     - HTTP Method: POST
     - Path: `/chat` (or any other path you prefer)
     - Response Mode: Last Node

3. **Add a JavaScript node** to parse the incoming message:
   ```javascript
   // Example code to process incoming messages
   const inputData = $input.item.json;
   
   // Extract the message, session ID, and other data
   const message = inputData.message || '';
   const sessionId = inputData.sessionId || 'unknown_session';
   const timestamp = inputData.timestamp || new Date().toISOString();
   const source = inputData.source || 'unknown';
   
   // Log the incoming message (optional)
   console.log(`Received message from ${source}: "${message}" (Session: ${sessionId})`);
   
   // Return the data for the next node
   return {
     json: {
       message,
       sessionId,
       timestamp,
       source
     }
   };
   ```

4. **Add your chatbot logic**:
   - This could be a simple Switch node for basic responses
   - Or connect to OpenAI, Anthropic, or other AI services
   - You could use a Database node to store conversation history

5. **Add a final Set node** to format the response:
   ```javascript
   // Simple response format
   return {
     json: {
       message: 'This is my response to your message'
     }
   };
   
   // OR more complex format with multiple messages
   return {
     json: {
       messages: [
         'This is my first response',
         'And here is some follow-up information'
       ]
     }
   };
   ```

6. **Activate the workflow** and copy the webhook URL:
   - Save your workflow
   - Activate it using the toggle in the top-right
   - Copy the generated webhook URL from the Webhook node
   - Add this URL to your environment variables

## Response Format

The chat widget supports multiple response formats from the n8n webhook:

1. **Simple string**:
   ```json
   "This is a simple text response"
   ```

2. **Object with message**:
   ```json
   {
     "message": "This is a response message"
   }
   ```

3. **Object with type and content**:
   ```json
   {
     "type": "text",
     "content": "This is the content of the message"
   }
   ```

4. **Array of messages**:
   ```json
   {
     "messages": [
       "This is the first message",
       "This is the second message"
     ]
   }
   ```

## Testing Your Integration

To test your chat integration:

1. Ensure your n8n instance is running and the workflow is active
2. Set the `NEXT_PUBLIC_CHAT_WEBHOOK_URL` in your environment
3. Start your Next.js application
4. Open the website and click on the chat button
5. Send a test message and verify the response

If there are issues, check the browser console for detailed logs about the request and response.

## Customization

The chat widget appearance can be customized in the `ChatWidget.tsx` component:

```typescript
// Initialize chat with configuration
const cleanupFn = window.createChat({
  webhookUrl: webhookUrl,
  apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY,
  botName: 'GeneRuss AI',
  chatTitle: 'Need help or have questions?',
  botAvatarUrl: 'https://avatars.githubusercontent.com/u/65046069?v=4',
  theme: {
    primary: '#00FFBD',
    textOnPrimary: '#000',
    userMessage: {
      background: '#444',
      text: '#fff',
    },
    botMessage: {
      background: '#222',
      text: '#fff',
    },
  },
  // Other configuration options...
});
```

Modify these settings to match your site's design requirements.

## Troubleshooting

Common issues and solutions:

1. **Chat not connecting to webhook**:
   - Verify the webhook URL is correct
   - Check that the n8n workflow is active
   - Ensure there are no CORS issues

2. **No response from webhook**:
   - Check the n8n execution logs
   - Verify the workflow is processing the message correctly
   - Ensure the response format is supported

3. **Error messages in console**:
   - Look for specific error messages in the browser console
   - Check for network errors in the Network tab
   - Verify the webhook URL is accessible from the browser

## Advanced Configuration

For more advanced usage:

1. **Session management**:
   - The chat widget generates a unique session ID for each visitor
   - This ID is passed with each message in the `sessionId` field
   - Use this in your n8n workflow to maintain conversation state

2. **Message format**:
   - All messages sent to the webhook include:
     - `message`: The user's message text
     - `sessionId`: Unique session identifier
     - `timestamp`: ISO timestamp of the message
     - `source`: Set to 'website_chat' to identify the source

3. **Authentication**:
   - If you enable Basic Auth on your webhook, set the API key in your environment
   - The key will be sent as a Bearer token in the Authorization header 