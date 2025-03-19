# Google Calendar Integration Guide

This document outlines how to set up and use the Google Calendar integration with our chat bot for appointment scheduling.

## Overview

The calendar integration allows the AI chat assistant to automatically schedule appointments in your Google Calendar when users request meetings. This integration works by:

1. Detecting appointment-related keywords in chat conversations
2. Extracting appointment details (name, email, date, time)
3. Creating calendar events using the Google Calendar API
4. Providing confirmation or error feedback to the user

## Requirements

To use the Google Calendar integration, you need:

1. A Google Cloud project with the Google Calendar API enabled
2. OAuth 2.0 credentials (Client ID and Client Secret)
3. A refresh token for accessing the Google Calendar API
4. An `.env.local` file with these credentials configured

## Setup Instructions

### 1. Google Cloud Project Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for and enable the "Google Calendar API"

### 2. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Add an authorized redirect URI: `https://developers.google.com/oauthplayground`
5. Click "Create" to generate your Client ID and Client Secret
6. Save these credentials for later use

### 3. Generate a Refresh Token

1. Go to the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right corner
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from the previous step
5. Close the settings panel
6. In the left panel, select "Calendar API v3" and choose the following scope:
   - `https://www.googleapis.com/auth/calendar`
7. Click "Authorize APIs" and sign in with your Google account
8. After authorization, click "Exchange authorization code for tokens"
9. Copy the refresh token from the response

### 4. Configure Environment Variables

Add the following to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

## Testing the Integration

1. Start your development server: `npm run dev`
2. Open the chat bot and ask to schedule a meeting
3. Provide necessary details when prompted (name, email, date, time)
4. The bot should confirm that the appointment has been scheduled
5. Check your Google Calendar to verify the appointment was created

## Troubleshooting

### Common Issues

1. **Invalid Credentials**: Ensure your Client ID, Client Secret, and Refresh Token are correct and properly formatted in the `.env.local` file.

2. **Token Expiration**: Refresh tokens can expire. If you encounter authentication errors, try generating a new refresh token.

3. **Permission Issues**: Make sure you've authorized the correct scopes (`https://www.googleapis.com/auth/calendar`).

4. **Calendar Events Not Appearing**: Check the server logs for detailed error messages. Ensure the calendar ID in the API code matches your calendar.

### Debug Logging

The calendar integration includes extensive logging to help troubleshoot issues:

- All calendar API requests are logged to the console
- Appointment detection and extraction are logged
- Calendar event creation success/failure is logged

Check these logs in your terminal when testing the integration.

## Customization

You can customize the calendar integration by:

1. Modifying the appointment detection logic in `app/api/chat/route.ts`
2. Changing the calendar event format in `app/api/calendar/route.ts`
3. Adjusting the meeting duration (default is 1 hour)
4. Customizing the calendar event details (summary, description, etc.)

## Security Considerations

The calendar integration uses OAuth 2.0 for secure authentication. However, please note:

1. Keep your Client ID, Client Secret, and Refresh Token confidential
2. The refresh token grants access to modify your calendar - treat it as sensitive data
3. The integration runs server-side, so credentials are not exposed to clients
4. Consider implementing rate limiting if your application has high traffic 