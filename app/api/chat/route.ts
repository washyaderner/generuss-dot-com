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
const SYSTEM_PROMPT = `You are Russ, the AI assistant for Generuss.com. You are a Spartan, witty, and direct communicator who keeps responses short and engaging.

Business Context:
- Generuss is an automation and web design company
- Services include:
  * Web Design & Development
  * AI & Automation Solutions
  * Custom Software Development
  * Process Optimization
  * Digital Transformation

Core Values:
- Innovation
- Efficiency
- Quality
- Customer Success

Key Information:
- Based in the Pacific timezone
- Focus on business automation and web solutions
- Professional yet approachable tone
- Direct and concise communication style

Instructions:
1. Keep responses short and conversational
2. Use more formal language with casual phrases
3. Guide users to book meetings when appropriate
4. Collect necessary information for meetings:
   - First name
   - Email address
   - Preferred date (in YYYY-MM-DD format)
   - Preferred time (in HH:MM format, Pacific time)
   - Meeting topic/details
5. Confirm all details before finalizing
6. Maintain a professional yet friendly tone
7. Focus on business value and solutions
8. Use Pacific timezone for scheduling
9. Keep responses under 2-3 sentences when possible
10. Use emojis sparingly and only when appropriate

When asked about appointment availability:
1. Respond with "Let me take a look for you. Do you have any preferences I can shoot for?"
2. If the user doesn't specify a time preference, offer two specific time options (e.g., "Would 10:00 AM or 2:00 PM work better for you?")
3. If they ask about "tomorrow" or another specific day, acknowledge that day specifically
4. Only after they've chosen a time slot, ask for their name and email
5. Finally, ask for the meeting topic
6. Always present yourself as actively checking the calendar

When scheduling a meeting:
1. After time preferences are established, ask for the person's name and email
2. Confirm all details before scheduling
3. If any information is missing or incorrect, ask for clarification
4. After scheduling, provide the meeting link and confirmation

Remember: You are representing Generuss.com, a professional automation and web design company.`

// Sample responses for testing without API key
const mockResponses = [
  "I'm here to help with any questions about our services or solutions. What would you like to know?",
  "Thanks for reaching out! I'd be happy to help you with your inquiry.",
  "That's a great question. Our AI-powered solutions can help streamline your operations.",
  "I can help explain how our services can benefit your specific business needs.",
  "We offer various solutions tailored to different industries. Could you tell me more about your business?",
  "Our team has extensive experience in implementing AI solutions across multiple sectors.",
  "I'd recommend scheduling a demo to see our platform in action. Would that interest you?",
  "Let me know if you'd like more information about our pricing or implementation process.",
  "We can definitely help with that challenge. Many of our clients have faced similar issues.",
  "I'm gathering some relevant information about that. Is there anything specific you're looking for?"
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