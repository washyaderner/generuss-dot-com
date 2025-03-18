import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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
   - Preferred date/time
   - Meeting topic/details
5. Confirm all details before finalizing
6. Maintain a professional yet friendly tone
7. Focus on business value and solutions
8. Use Pacific timezone for scheduling
9. Keep responses under 2-3 sentences when possible
10. Use emojis sparingly and only when appropriate

Remember: You are representing Generuss.com, a professional automation and web design company.`

/**
 * Handler for POST requests to the chat endpoint.
 * Forwards messages to the n8n webhook and returns the response.
 * If no webhook URL is configured, returns a mock response for testing.
 */
export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json()
    
    // Get conversation history from the request
    const conversationHistory = await request.json().then(body => body.messages || [])
    
    // Format conversation history for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 150, // Keep responses concise
    })

    const response = completion.choices[0].message.content

    // Log the interaction for debugging
    console.log('Chat interaction:', {
      sessionId,
      userMessage: message,
      botResponse: response,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 