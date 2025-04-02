import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Define metadata types for better type checking
interface AppointmentData {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  topic?: string;
}

interface CalendarEvent {
  created: boolean;
  eventId?: string;
  eventLink?: string;
  error?: string;
}

interface AppointmentMetadata {
  type: string;
  data: AppointmentData;
  calendarEvent?: CalendarEvent;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// System prompt for the chat bot
const SYSTEM_PROMPT = `You are the AI assistant for Russ at Generuss.com. You speak in a direct, plain-spoken way that's concise but still friendly. You speak in the first person ("I") and refer to Russ in the third person.

Business Context:
- Generuss is focused on making businesses more efficient using AI
- Services include (in order of priority):
  * AI & Automation tools that save time
  * Streamlining business processes
  * Modern tech solutions
  * Custom software tools
  * Web development (secondary focus)

Response Style:
- Start with very concise responses (1-2 sentences maximum)
- As the conversation progresses, gradually provide more details when relevant
- For initial questions, keep answers short and direct with no examples
- For follow-up questions, you can expand with a bit more context (2-3 sentences)
- For deeper questions after several exchanges, provide more substantial information
- Always adapt your response length to the complexity of the question
- End with a simple follow-up question to keep the conversation going
- Focus on getting the user to share more about their specific needs

Conversation Progression:
- First 1-2 exchanges: Ultra concise (1-2 sentences)
- Next 2-3 exchanges: Moderately detailed (2-3 sentences)
- After 4+ exchanges: More comprehensive when appropriate (3-4 sentences)
- Always match detail level to question complexity

Pronoun Usage:
- In your first message, introduce yourself as "Russ's assistant"
- In your first reference to Russ's work, use his full name (e.g., "Russ specializes in...")
- After that, use "he" instead of repeatedly saying "Russ" (e.g., "He has experience with..." instead of "Russ has experience with...")
- Only use "Russ" again when starting a new topic or if several messages have passed
- This makes the conversation flow more naturally

Conversation Flow:
1. Adapt answers to the conversation stage - start brief, add detail as you go
2. Ask a follow-up question to learn more about their specific situation
3. Only provide specific examples when directly asked or after several exchanges
4. If you're not sure what they're asking about, just ask for clarification
5. Only suggest scheduling a call after:
   - You've answered several questions and the user seems satisfied
   - The user explicitly asks about scheduling
   - The question requires Russ's specific expertise
6. When suggesting a call, be casual: "Would you like to set up a call with him to discuss this further?"
7. Use different variations of this suggestion to sound natural

When concluding conversations:
1. Use varied closing phrases like:
   - "Awesome! Do you have any other questions, or would you like to set up a call with him?"
   - "Hope that helps! Anything else you'd like to know, or would you prefer to chat directly with him?"
   - "Does that answer your question? I'm happy to explain more, or we can set up a time for you to speak with him."
2. Only suggest a call if the user has received satisfactory answers to multiple questions

Identity & Voice:
1. Use "I" statements about yourself: "I can help you with that"
2. Refer to Russ as "he" after initially mentioning him: "Yes, he can help with that"
3. Make it clear you're speaking as Russ's assistant, not as Russ himself
4. Example: "I'm Russ's assistant. I can set up a time for you to talk with him about making your processes more efficient."
5. When asked what Russ does, explain it simply: "He helps businesses save time by automating repetitive tasks with AI"

When asked about appointment availability:
1. Respond with "Let me check his calendar for you. Any particular day or time that works best for you?"
2. If the user doesn't specify a time preference, offer two specific time options (e.g., "Would Tuesday at 10:00 AM or Thursday at 2:00 PM work better for you?")
3. If they ask about "tomorrow" or another specific day, acknowledge that day specifically
4. Only after they've chosen a time slot, ask for their name and email
5. Finally, ask for the meeting topic
6. Always present yourself as checking his calendar

When scheduling a meeting:
1. After time preferences are established, ask for the person's name and email
2. Confirm all details before scheduling
3. If any information is missing or incorrect, ask for clarification
4. After scheduling, provide the meeting link and confirmation

Remember: Start with short responses but gradually provide more detail as the conversation progresses. Adapt to the user's level of interest and the complexity of their questions.`

// Mock responses for testing without API key
const mockResponses = [
  "I'm here to help with questions about how Russ uses AI. What would you like to know?",
  "Thanks for reaching out! What can I help you with today?",
  "Good question. He builds AI tools that handle repetitive tasks. What kind of tasks are you looking to automate?",
  "I can help explain how his work might help your business. What industry are you in?",
  "He works with different industries to cut down busywork. What type of business are you in?",
  "He has helped many companies set up automated systems. What specific problem are you trying to solve?",
  "Would you like to know more about how this works? Happy to explain.",
  "Let me know if you want details on pricing or timelines. What's your biggest concern?",
  "He has helped other businesses with similar challenges. What are you struggling with most?",
  "I'm getting some info together. What specifically are you wondering about?"
]

/**
 * Function to check calendar availability for a given date
 * @param dateString Date string like "tomorrow", "next week", or a specific date
 * @returns Available time slots
 */
async function getAvailableSlots(dateString: string, baseUrl: string) {
  try {
    // Convert relative dates to actual dates
    let dateParam = dateString.toLowerCase();
    const today = new Date();
    
    if (dateParam === 'today') {
      dateParam = today.toISOString().split('T')[0];
    } else if (dateParam === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateParam = tomorrow.toISOString().split('T')[0];
    } else if (dateParam.includes('next week')) {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      dateParam = nextWeek.toISOString().split('T')[0];
    }
    
    // Query the calendar API
    const calendarUrl = new URL('/api/calendar', baseUrl);
    calendarUrl.searchParams.append('date', dateParam);
    
    const response = await fetch(calendarUrl.toString());
    if (!response.ok) {
      throw new Error(`Calendar API returned status: ${response.status}`);
    }
    
    const availability = await response.json();
    return availability;
  } catch (error: any) {
    console.error('[Chat API] Error checking availability:', error.message);
    return {
      available: false,
      error: error.message,
      // Return some mock data as fallback
      mockData: {
        date: dateString,
        availableSlots: ['10:00 AM', '2:00 PM'],
        formattedDate: dateString
      }
    };
  }
}

/**
 * Handler for POST requests to the chat endpoint.
 * Forwards messages to the n8n webhook and returns the response.
 * If no webhook URL is configured, returns a mock response for testing.
 */
export async function POST(request: Request) {
  try {
    const { message, sessionId = `session_${Date.now()}`, messages = [] } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Log the received message for debugging
    console.log(`[Chat API] Received message: ${message} (sessionId: ${sessionId})`)
    
    // Check if message is about scheduling or availability
    const isSchedulingQuery = /appointment|schedule|meeting|available|availability|book|slot|time/i.test(message as string);
    let availabilityInfo = null;
    
    // Check calendar availability if asking about scheduling
    if (isSchedulingQuery) {
      // Extract date information from the message
      let dateToCheck = 'tomorrow'; // Default to tomorrow
      
      if (/tomorrow/i.test(message as string)) {
        dateToCheck = 'tomorrow';
      } else if (/today/i.test(message as string)) {
        dateToCheck = 'today';
      } else if (/next week/i.test(message as string)) {
        dateToCheck = 'next week';
      }
      
      // Get availability information
      availabilityInfo = await getAvailableSlots(dateToCheck, request.url);
    }
    
    // If no OpenAI API key is configured, return a mock response
    if (!process.env.OPENAI_API_KEY) {
      console.log('[Chat API] No OpenAI API key configured, returning mock response')
      
      // Get a deterministic but seemingly random response based on the message
      const mockIndex = Math.abs(
        Array.from(message as string).reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % mockResponses.length
      
      // Add a slight delay to simulate processing time (300-1500ms)
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 1200))
      
      return NextResponse.json({
        message: mockResponses[mockIndex],
        sessionId
      })
    }
    
    try {
      // Prepare system message with availability info if this is a scheduling query
      let systemMessage = SYSTEM_PROMPT;
      
      if (isSchedulingQuery && availabilityInfo) {
        const slotsInfo = availabilityInfo.availableSlots?.length > 0 
          ? `Available slots: ${availabilityInfo.availableSlots.join(', ')}` 
          : 'No available slots';
        
        const dateInfo = availabilityInfo.formattedDate || availabilityInfo.date || 'selected date';
        
        // Add availability information to the system prompt
        systemMessage = `${SYSTEM_PROMPT}\n\nCALENDAR AVAILABILITY FOR ${dateInfo.toUpperCase()}:\n${slotsInfo}\n\nSuggest two time options from the available slots when responding.`;
      }
      
      // Format conversation history for OpenAI
      const formattedMessages = [
        { role: 'system', content: systemMessage },
        ...messages
          .filter((msg: any) => msg.content && typeof msg.content === 'string' && !msg.content.startsWith('[{'))
          .map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
        { role: 'user', content: message }
      ]
      
      console.log(`[Chat API] Sending request to OpenAI with ${formattedMessages.length} messages`)
      
      // Get response from OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Using GPT-4o for best performance
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 300, // Allowing for longer responses if needed
      })
      
      const response = completion.choices[0].message.content || "I'm not sure how to respond to that."
      
      console.log(`[Chat API] OpenAI response: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`)
      
      // Check for appointment info in the response
      let metadata: AppointmentMetadata | undefined = undefined;
      if (response.toLowerCase().includes('appointment') || 
          response.toLowerCase().includes('schedule') || 
          response.toLowerCase().includes('meeting')) {
        // Extract potential appointment details
        const appointmentData: AppointmentMetadata = {
          type: 'appointment',
          data: {
            name: extractInfo(response, 'name'),
            email: extractInfo(response, 'email'),
            date: extractInfo(response, 'date'),
            time: extractInfo(response, 'time'),
            topic: extractInfo(response, 'topic'),
          }
        };
        
        // Only include metadata if we have key appointment details
        if (appointmentData.data.name && appointmentData.data.email) {
          metadata = appointmentData
          console.log('[Chat API] Detected appointment request:', metadata)
          
          // Try to schedule in calendar if we have sufficient details
          if (appointmentData.data.date) {
            try {
              const calendarResponse = await fetch(new URL('/api/calendar', request.url), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  appointmentDetails: appointmentData.data
                })
              });
              
              const calendarResult = await calendarResponse.json();
              
              // Add calendar info to metadata
              if (calendarResult.success) {
                metadata.calendarEvent = {
                  created: true,
                  eventId: calendarResult.eventId,
                  eventLink: calendarResult.eventLink
                };
                console.log('[Chat API] Calendar event created:', calendarResult.eventId);
              } else {
                metadata.calendarEvent = {
                  created: false,
                  error: calendarResult.error
                };
                console.warn('[Chat API] Failed to create calendar event:', calendarResult.error);
              }
            } catch (calendarError: any) {
              console.error('[Chat API] Calendar integration error:', calendarError.message);
              metadata.calendarEvent = {
                created: false,
                error: 'Failed to connect to calendar service'
              };
            }
          }
        }
      }
      
      return NextResponse.json({
        message: response,
        sessionId,
        metadata
      })
    } catch (aiError: any) {
      console.error('[Chat API] OpenAI API error:', aiError.message)
      
      return NextResponse.json({
        message: "I'm having trouble connecting to my brain right now. Please try again in a moment.",
        sessionId,
        error: `OpenAI error: ${aiError.message}`
      })
    }
  } catch (error: any) {
    console.error('[Chat API] Request error:', error.message)
    
    return NextResponse.json({
      message: "I encountered an error processing your message. Please try again.",
      error: 'Failed to process message',
      details: error.message
    }, { status: 200 }) // Using 200 instead of 500 to prevent client-side errors
  }
}

// Helper function to extract information from AI response
function extractInfo(text: string, infoType: string): string | undefined {
  // Name extraction
  if (infoType === 'name') {
    const nameMatch = text.match(/name:?\s*([^\n,.]+)/i) || 
                      text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/) ||
                      text.match(/([A-Z][a-z]+)/);
    return nameMatch?.[1]?.trim();
  }
  
  // Email extraction
  if (infoType === 'email') {
    const emailMatch = text.match(/email:?\s*([^\s,]+@[^\s,]+\.[^\s,]+)/i) ||
                      text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
    return emailMatch?.[1]?.trim();
  }
  
  // Date extraction - looking for YYYY-MM-DD format and similar variations
  if (infoType === 'date') {
    // Try common date formats with explicit formats first
    const dateFormats = [
      // YYYY-MM-DD format
      /date:?\s*(\d{4}-\d{1,2}-\d{1,2})\b/i,
      // MM/DD/YYYY format
      /date:?\s*(\d{1,2}\/\d{1,2}\/\d{4})\b/i,
      // Find words like "tomorrow", "today", "next Monday", etc.
      /date:?\s*(tomorrow|today|next\s+\w+|this\s+\w+)\b/i,
      // Month names with day: "January 15" or "January 15th"
      /date:?\s*([A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*\d{4})?)\b/i,
      // Look for day then month: "15th of January", "15 January"
      /date:?\s*(\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?[A-Za-z]+(?:,?\s*\d{4})?)\b/i,
      // Last resort - try to find any mention of date with a more restrictive context
      /\b(date|scheduled for|meet on|meeting on)(?:\s+is|\s+will be)?:?\s+([A-Za-z0-9\s,]+?)(?=\.|\sat\s|\sin\s|,\s|$)/i
    ];
    
    let match = null;
    
    // Try each pattern in sequence
    for (const pattern of dateFormats) {
      match = text.match(pattern);
      if (match && match[1]) {
        // Use the first capture group, or the second if the pattern uses two groups
        const result = match[1] || match[2];
        if (result) {
          return result.trim();
        }
      }
    }
    
    // If no match, look specifically for dates following words like "on", "for"
    // This is a bit riskier but helpful as a fallback
    const contextualMatch = text.match(/\b(?:on|for)\s+([A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*\d{4})?)\b/i);
    if (contextualMatch && contextualMatch[1]) {
      return contextualMatch[1].trim();
    }
    
    return undefined;
  }
  
  // Time extraction
  if (infoType === 'time') {
    const timeFormats = [
      // HH:MM format with optional AM/PM
      /time:?\s*(\d{1,2}:\d{2}\s*(?:am|pm)?)/i,
      // Formats like "3 PM", "3PM", etc.
      /time:?\s*(\d{1,2}\s*(?:am|pm))/i,
      // Look for time with context
      /\b(?:at|from)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i,
      // Pacific time specific mention
      /(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*(?:pacific|pt|pst|pdt))/i,
      // Last resort - general time pattern
      /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i
    ];
    
    let match = null;
    
    // Try each pattern in sequence
    for (const pattern of timeFormats) {
      match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return undefined;
  }
  
  // Topic extraction
  if (infoType === 'topic') {
    const topicMatch = text.match(/topic:?\s*([^\n.]+)/i) ||
                       text.match(/regarding:?\s*([^\n.]+)/i) ||
                       text.match(/about:?\s*([^\n.]+)/i);
    return topicMatch?.[1]?.trim();
  }
  
  return undefined;
} 