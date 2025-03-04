# Chat Widget Integration Guide

This document outlines the integration of the n8n chat widget with our Next.js application, providing detailed setup instructions, configuration options, and troubleshooting tips.

## Overview

The chat widget provides a seamless way for users to interact with our support team through an AI-powered interface. It uses n8n workflows to process messages and generate responses.

## Environment Variables

The chat widget requires the following environment variable:

```
NEXT_PUBLIC_CHAT_WEBHOOK_URL=your_n8n_webhook_url
```

You can find this webhook URL in your n8n instance under the workflow you want to connect to. It should look something like:
```
https://your-n8n-instance.app.n8n.cloud/webhook/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/chat
```

## Setup Instructions

### 1. Configure Environment Variables

1. Add your n8n webhook URL to your `.env.local` file:
   ```
   NEXT_PUBLIC_CHAT_WEBHOOK_URL=your_n8n_webhook_url
   ```

2. If no environment variable is set, the widget will fall back to a default URL (defined in the component).

### 2. Component Implementation

The chat widget is implemented in `app/components/ChatWidget.tsx` and includes:

- Custom styling to match our site's theme
- Automatic message customization
- Header and avatar customization
- Click-outside detection to close the chat panel
- Aggressive style overrides to ensure consistent appearance

### 3. Integration with Layout

The chat widget is already included in the main layout file (`app/layout.tsx`), making it available throughout the application:

```tsx
// In app/layout.tsx
import ChatWidget from "@/app/components/ChatWidget"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* ... other layout elements ... */}
      <body>
        {/* ... site content ... */}
        
        {/* AI Chat Widget */}
        <ChatWidget />
      </body>
    </html>
  )
}
```

> **Note:** You do not need to add the ChatWidget component to any other pages or components, as it's already globally available through the root layout.

## Customization Options

### Visual Customization

The following elements can be customized:

- Chat bubble appearance
- Panel header
- Message styling (user and bot)
- Input area
- Initial messages
- Avatar images

### Behavioral Customization

You can modify:

- Bot name
- Initial message
- Message delay
- File upload capabilities
- Chat history persistence

## n8n Workflow Configuration

### Required Nodes

1. **Webhook node**: Entry point that receives chat messages
2. **Set node**: Processes the incoming data
3. **AI node**: Generates responses (using GPT or Claude)
4. **Respond to Webhook node**: Sends the response back to the chat widget

### Workflow Example

A basic workflow configuration in n8n should look like:

```
[Webhook] → [Set] → [AI Model] → [Respond to Webhook]
```

## Troubleshooting

### Common Issues

1. **Chat widget not connecting to n8n**
   - Verify the webhook URL is correct in your .env file
   - Check n8n instance is running and accessible
   - Check browser console for connection errors (look for logs with 🔗 and ⚙️ emojis)
   - Verify the workflow is activated in n8n

2. **Styling issues**
   - Inspect the DOM to see if custom styles are being applied
   - Check if the style element with ID 'n8n-custom-styles' exists in the DOM
   - Verify there are no errors in the browser console related to styles

3. **Custom messages not appearing**
   - Check if the message observer is working correctly
   - Verify the initial message configuration
   - Check n8n workflow for proper response formatting

4. **Brain emoji still appearing in header**
   - Make sure your browser cache is cleared (the header customization might be cached)
   - Check if the header title customization code in ChatWidget.tsx is being executed
   - Verify that there are no conflicts with the n8n chat configuration

### Debugging Tips

- Use `console.log` statements in the ChatWidget component to trace execution
- Monitor network requests to the n8n webhook
- Check n8n execution logs for errors in the workflow
- Use browser devtools to inspect the rendered chat widget elements

## Advanced Configuration

For advanced customization, you can modify:

1. **Translations**: Update the messages in different languages
2. **Message Formatting**: Implement custom message rendering
3. **Integration with Backend**: Connect the chat to your own APIs
4. **User Identification**: Track and identify users across sessions

## Security Considerations

- Webhook URLs should be treated as sensitive information
- Consider implementing rate limiting in your n8n workflow
- Be careful about what information is logged or stored from chat conversations
- Implement proper data handling procedures for any user information collected

## Deployment Considerations

When deploying to production:

1. Set the correct environment variables for each environment
2. Ensure proper error handling
3. Monitor the n8n instance for stability
4. Consider scaling requirements for high traffic periods

## Updates and Maintenance

The n8n chat widget is periodically updated. To update:

1. Check the current version against the latest release
2. Update the script source URL if necessary
3. Test thoroughly after updates
4. Note any breaking changes in the release notes 