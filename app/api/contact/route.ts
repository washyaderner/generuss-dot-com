import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as z from 'zod'

// Define a more accurate type for Resend errors
interface ResendErrorResponse {
  name?: string;
  message?: string;
  statusCode?: number;
  code?: string;
  [key: string]: any; // For any other properties that might be present
}

// Helper function to get a meaningful error message for Resend errors
function getResendErrorMessage(error: ResendErrorResponse): string {
  // Common Resend error codes and their user-friendly messages
  const errorMessages: Record<string, string> = {
    'invalid_sender': 'The sender email address is not properly verified in Resend.',
    'rate_limit_exceeded': 'Too many emails sent in a short period. Please try again later.',
    'invalid_recipient': 'The recipient email address is invalid or cannot receive mail.',
    'authentication_error': 'There was an issue with the API key authentication.',
    'domain_not_verified': 'The sender domain is not properly verified in Resend.',
    'template_error': 'There was an issue with the email template.',
  };

  // Extract the error code if available
  const errorCode = error.code || 'unknown_error';
  
  // Return specific message or generic one
  return errorMessages[errorCode] || 
    `Email sending failed (${errorCode}). Please try again or contact support.`;
}

const resend = new Resend(process.env.RESEND_API_KEY)

// Updated validation schema with new character limits
const formSchema = z.object({
  firstName: z.string().min(2, "Please enter at least 2 characters for first name"),
  lastName: z.string().min(2, "Please enter at least 2 characters for last name"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().optional(),
  businessDescription: z.string().optional(),
  problem: z.string()
    .min(10, "Please provide more detail about your problem")
    .max(1000, "Please keep your description under 1000 characters"),
  solution: z.string().optional(),
  platforms: z.string()
    .min(4, "Please list at least one platform you're using")
    .max(500, "Please keep your list under 500 characters"),
  timeline: z.string()
    .min(3, "Please provide your timeline")
    .max(500, "Please keep your timeline under 500 characters"),
  budget: z.string().optional()
})

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    console.log('Received form data:', JSON.stringify(body, null, 2))
    
    const validatedFields = formSchema.parse(body)
    console.log('Validation passed successfully')

    // Format the email content
    const emailContent = `
New Contact Form Submission

Contact Information:
- Name: ${validatedFields.firstName} ${validatedFields.lastName}
- Email: ${validatedFields.email}
- Company: ${validatedFields.companyName || 'Not provided'}

Business Details:
- Description: ${validatedFields.businessDescription || 'Not provided'}

Project Information:
- Problem: ${validatedFields.problem}
- Proposed Solution: ${validatedFields.solution || 'Not provided'}
- Current Platforms: ${validatedFields.platforms}
- Timeline: ${validatedFields.timeline}
- Budget: ${validatedFields.budget || 'Not provided'}

Submitted at: ${new Date().toISOString()}
`

    // Log the submission for debugging
    console.log('Processing form submission:', {
      ...validatedFields,
      timestamp: new Date().toISOString(),
    })

    console.log('Sending email via Resend with API key:', process.env.RESEND_API_KEY ? 'Key exists' : 'Key missing')
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Generuss Contact Form <hello@mail.generuss.com>',
      to: ['russ@generuss.com', 'washyaderner@gmail.com'],
      subject: `New Contact Form Submission from ${validatedFields.firstName} ${validatedFields.lastName}`,
      text: emailContent,
    })

    console.log('Resend API response:', data ? JSON.stringify(data) : 'No data returned')

    // Handle Resend API errors
    if (error) {
      console.error('Resend API error:', error)
      console.error('Resend API error details:', JSON.stringify(error, null, 2))
      
      // Cast the error to our custom type
      const resendError = error as ResendErrorResponse;
      const errorMessage = getResendErrorMessage(resendError);
      
      return NextResponse.json(
        { 
          message: "Failed to send email notification", 
          error: errorMessage,
          code: resendError.code || 'unknown_error',
          statusCode: resendError.statusCode || 500
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully with ID:', data?.id)
    return NextResponse.json(
      { message: "Contact form submitted successfully", id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.error('Validation error:', JSON.stringify(error.errors, null, 2))
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error('Contact form error:', error)
    console.error('Contact form error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
} 