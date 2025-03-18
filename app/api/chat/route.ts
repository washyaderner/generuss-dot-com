import { NextResponse } from 'next/server'
import OpenAI from 'openai'

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

When scheduling a meeting:
1. First ask for the person's name and email
2. Then ask for their preferred date and time
3. Finally, ask for the meeting topic
4. Confirm all details before scheduling
5. If any information is missing or incorrect, ask for clarification
6. After scheduling, provide the meeting link and confirmation

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
      // Format conversation history for OpenAI
      const formattedMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
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
      let metadata = undefined
      if (response.toLowerCase().includes('appointment') || 
          response.toLowerCase().includes('schedule') || 
          response.toLowerCase().includes('meeting')) {
        // Extract potential appointment details
        const appointmentData = {
          type: 'appointment',
          data: {
            name: extractInfo(response, 'name'),
            email: extractInfo(response, 'email'),
            date: extractInfo(response, 'date'),
            time: extractInfo(response, 'time'),
            topic: extractInfo(response, 'topic'),
          }
        }
        
        // Only include metadata if we have key appointment details
        if (appointmentData.data.name && appointmentData.data.email) {
          metadata = appointmentData
          console.log('[Chat API] Detected appointment request:', metadata)
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
    const dateMatch = text.match(/date:?\s*(\d{4}-\d{2}-\d{2})/i) ||
                      text.match(/date:?\s*([^\n,]+)/i) ||
                      text.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i) ||
                      text.match(/(\d{1,2}(st|nd|rd|th)? of [A-Za-z]+)/i);
    return dateMatch?.[1]?.trim();
  }
  
  // Time extraction
  if (infoType === 'time') {
    const timeMatch = text.match(/time:?\s*([^\n,]+)/i) ||
                      text.match(/(\d{1,2}:\d{2}\s*(?:am|pm)?)/i);
    return timeMatch?.[1]?.trim();
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