# Chat Bot Integration Guide

This document outlines the implementation of our native OpenAI-powered chat bot for the Generuss.com website. The chat bot provides users with an interactive AI assistant that can answer questions and help with appointment scheduling.

## Overview

The chat bot is implemented using direct integration with OpenAI's API using the gpt-4o model. It features:

- A clean, modern UI that matches the site's design aesthetic
- Session persistence using localStorage
- Appointment scheduling capabilities
- Smooth animations and transitions
- Mobile-responsive design
- Fallback to mock responses when no API key is available

## Environment Setup

To use the chat bot with OpenAI, you'll need to set up the following environment variables in your `.env.local` file:

```
# OpenAI API Key (required for AI functionality)
OPENAI_API_KEY=your_openai_api_key_here

# Google Calendar Integration (optional, for appointment scheduling)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
```

## Technical Implementation

The chat bot consists of two main components:

1. **Frontend Component**: `app/components/NativeChatBot.tsx`
   - Manages chat UI, animations, and user interactions
   - Handles message history and session persistence
   - Provides typing indicators and notification badges

2. **Backend API Route**: `app/api/chat/route.ts`
   - Processes incoming messages
   - Communicates with OpenAI API
   - Formats and returns responses
   - Extracts metadata for appointment scheduling
   - Provides fallback responses when needed

## System Prompt

The chat bot uses a carefully crafted system prompt to define its personality and capabilities. The system prompt:

- Defines the bot as "Russ", with a specific communication style
- Provides context about Generuss's services and values
- Gives instructions on handling appointment scheduling
- Sets guidelines for response length and tone

You can customize the system prompt in `app/api/chat/route.ts` to adjust the bot's behavior.

## Testing and Debugging

The chat implementation includes several debugging features:

- Console logs for tracking API requests and responses
- Mock responses for testing without an API key
- Error handling with user-friendly fallback messages

To test locally, run the development server with `npm run dev` and interact with the chat bubble in the bottom-right corner of the site.

## Google Calendar Integration (Optional)

For appointment scheduling capabilities:

1. Create a project in Google Cloud Console
2. Enable the Google Calendar API
3. Set up OAuth credentials
4. Generate a refresh token using the OAuth flow
5. Add the credentials to your `.env.local` file

The appointment scheduling feature will parse appointment details from conversations and can be connected to your Google Calendar.

## Troubleshooting

Common issues and solutions:

1. **Chat not responding**: Check if the OPENAI_API_KEY is properly set in your environment.
2. **API errors**: Ensure your OpenAI account has available credits and the API key is valid.
3. **Server reload required**: Sometimes you need to restart the dev server to pick up API route changes.

## Customization

To customize the chat bot:

- Adjust the UI in `NativeChatBot.tsx`
- Modify the system prompt in `route.ts`
- Change the response format or add new features to the API route
- Implement additional metadata extraction for specialized use cases 