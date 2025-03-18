import { NextResponse } from 'next/server'

// Get the webhook URL from environment variables
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || ''

// Sample responses for testing without a webhook
const mockResponses = [
  "I'm here to help with any questions about our services or solutions. What would you like to know?",
  "Thanks for reaching out! I'd be happy to help you with your inquiry.",
  "That's a great question. Our AI-powered solutions can help streamline your sales operations.",
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
    // Parse the request body
    const body = await request.json()
    const { message, sessionId = `session_${Date.now()}` } = body
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Log the received message for debugging
    console.log(`[Chat API] Received message: ${message} (sessionId: ${sessionId})`)
    
    // If no webhook URL is configured, return a mock response
    if (!N8N_WEBHOOK_URL) {
      console.log('[Chat API] No webhook URL configured, returning mock response')
      
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
    
    // Prepare the payload for n8n
    const payload = {
      message,
      sessionId,
      timestamp: new Date().toISOString(),
      source: 'website_chat'
    }
    
    // Send the payload to n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      console.error(`[Chat API] Error from webhook: ${response.status} ${response.statusText}`)
      throw new Error(`Webhook responded with ${response.status}`)
    }
    
    // Parse the response from n8n
    const data = await response.json()
    
    // Format the response based on the structure from n8n
    let formattedResponse
    
    if (typeof data === 'string') {
      // Handle string responses
      formattedResponse = { message: data, sessionId }
    } else if (data.message) {
      // Handle message property
      formattedResponse = { 
        message: data.message, 
        sessionId: data.sessionId || sessionId 
      }
    } else if (data.content) {
      // Handle content property
      formattedResponse = { 
        message: data.content, 
        sessionId: data.sessionId || sessionId 
      }
    } else {
      // Default to stringifying the response
      formattedResponse = { 
        message: JSON.stringify(data), 
        sessionId 
      }
    }
    
    console.log(`[Chat API] Response: ${formattedResponse.message.substring(0, 100)}${formattedResponse.message.length > 100 ? '...' : ''}`)
    
    return NextResponse.json(formattedResponse)
  } catch (error: any) {
    console.error('[Chat API] Error:', error.message)
    
    return NextResponse.json({
      error: 'Failed to process message',
      details: error.message
    }, { status: 500 })
  }
} 