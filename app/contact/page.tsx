"use client"

import Link from "next/link"
import { CursorGradient } from "@/components/cursor-gradient"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

// Form validation schema with better error messages
const formSchema = z.object({
  firstName: z.string().min(2, "Please enter at least 2 characters for first name"),
  lastName: z.string().min(2, "Please enter at least 2 characters for last name"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().optional(),
  businessDescription: z.string().optional(),
  problem: z.string()
    .max(1000, "Please keep your description under 1000 characters")
    .optional(),
  generalInquiry: z.string()
    .max(1000, "Please keep your message under 1000 characters")
    .optional(),
  timeline: z.string()
    .max(500, "Please keep your timeline under 500 characters")
    .optional(),
  budget: z.string().optional()
}).refine((data) => {
  // If either field has content, validation passes
  // This makes the form fields dynamically required - if one has content, the other becomes optional
  return (data.problem && data.problem.trim().length > 0) || 
         (data.generalInquiry && data.generalInquiry.trim().length > 0);
}, {
  message: "Please tell us about your business challenge or leave a general message",
  path: ["generalInquiry"] // This will show the error under generalInquiry field
})

type FormData = z.infer<typeof formSchema>

const inputStyles = "mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-gray-700 text-white"
const errorStyles = "mt-1 text-sm text-red-400"
const tealErrorStyles = "mt-1 text-sm text-teal-400"
const labelStyles = "block text-sm font-medium text-gray-400"

// Component for glowing text animation
const GlowingErrorMessage = ({ message }: { message: string }) => {
  // Split by words but keep animation by letter
  const words = message.split(' ');
  // Calculate total length of message for timing
  const totalChars = words.reduce((sum, word) => sum + word.length, 0);
  const totalSpaces = words.length - 1;
  const totalCharsWithSpaces = totalChars + totalSpaces;
  // Time for one complete pulse to travel through the entire message
  const pulseDuration = totalCharsWithSpaces * 0.07; // 70ms per character (30% faster)
  
  return (
    <p className="mt-2 text-sm text-gray-400 overflow-hidden whitespace-pre-wrap">
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            // Calculate the overall position in the entire text
            let overallIndex = 0;
            for (let i = 0; i < wordIndex; i++) {
              overallIndex += words[i].length + 1; // +1 for the space
            }
            overallIndex += charIndex;
            
            // Use style with proper TypeScript typing for CSS variables
            const style = {
              animationDelay: `${overallIndex * 0.07}s`,
            };
            
            return (
              <span 
                key={`char-${wordIndex}-${charIndex}`} 
                className="inline-block animate-glow-trail"
                style={style}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur" // Validate on blur for better UX
  })

  // Watch the business problem and general inquiry fields
  const businessProblem = watch("problem");
  const generalMessage = watch("generalInquiry");
  const hasBusinessProblem = businessProblem && businessProblem.trim().length > 0;
  const hasGeneralMessage = generalMessage && generalMessage.trim().length > 0;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    console.log('Form submission started with data:', data)
    
    try {
      console.log('Sending fetch request to /api/contact')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Received response with status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (!response.ok) {
        console.error('Form submission error:', responseData)
        throw new Error(responseData.error || responseData.message || 'Failed to submit form')
      }

      toast.success('Message sent successfully! We\'ll be in touch soon.', {
        duration: 5000,
      })
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      let errorMessage = 'Please try again or contact us directly.'
      
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      // Show detailed error toast
      toast.error(`Failed to send message: ${errorMessage}`, {
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Add the animation keyframes */}
      <style jsx global>{`
        @keyframes glowTrail {
          0% {
            color: #9CA3AF; /* gray-400 */
            text-shadow: none;
          }
          10%, 20% {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(20, 184, 166, 0.8), 0 0 20px rgba(20, 184, 166, 0.6), 0 0 30px rgba(20, 184, 166, 0.4);
          }
          30%, 100% {
            color: #9CA3AF; /* gray-400 */
            text-shadow: none;
          }
        }
        
        .animate-glow-trail {
          animation: glowTrail 6s linear infinite; animation-delay: 4s;
        }
      `}</style>
      
      <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black z-0" />
      <CursorGradient />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent flex items-center"
              >
                Home
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/solutions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Solutions
                </Link>
                <Link href="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-teal-400 font-medium transition-colors" aria-current="page">
                  Contact
                </Link>
              </nav>
            </div>
            <Link
              href="/contact"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Get a Demo</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-8 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Whether you have a business challenge or just want to connect, I'm here to help
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <form 
                className="space-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="firstName" className={labelStyles}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      {...register("firstName")}
                      type="text"
                      className={inputStyles}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <p className={errorStyles}>{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelStyles}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      {...register("lastName")}
                      type="text"
                      className={inputStyles}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <p className={errorStyles}>{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelStyles}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    className={inputStyles}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className={errorStyles}>{errors.email.message}</p>
                  )}
                </div>

                {/* Two-column layout for business fields and general inquiry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Left column - Business focused fields */}
                  <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2 mb-4">
                      Business Inquiry
                    </h3>
                    <div>
                      <label htmlFor="companyName" className={labelStyles}>
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        {...register("companyName")}
                        type="text"
                        className={inputStyles}
                        placeholder="Your Company Ltd."
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessDescription" className={labelStyles}>
                        One sentence description of your business
                      </label>
                      <input
                        id="businessDescription"
                        {...register("businessDescription")}
                        type="text"
                        className={inputStyles}
                        placeholder="We help businesses grow through AI-powered solutions"
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label htmlFor="problem" className={labelStyles}>
                        Business Problem or Challenge
                        {!hasGeneralMessage ? (
                          <span className="ml-1 text-yellow-500">*</span>
                        ) : (
                          <span className="ml-1 text-gray-500">(Optional)</span>
                        )}
                      </label>
                      <textarea
                        id="problem"
                        {...register("problem")}
                        rows={4}
                        className={inputStyles}
                        placeholder="Describe the specific business challenge you're facing..."
                        autoComplete="off"
                      ></textarea>
                      {errors.problem && errors.problem.message?.includes('business challenge or leave a general message') ? (
                        <GlowingErrorMessage message={errors.problem.message} />
                      ) : errors.problem && (
                        <p className={errorStyles}>{errors.problem.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="timeline" className={labelStyles}>
                        Project Timeline
                      </label>
                      <input
                        id="timeline"
                        {...register("timeline")}
                        type="text"
                        className={inputStyles}
                        placeholder="When do you need this completed? (Optional)"
                        autoComplete="off"
                      />
                      {errors.timeline && (
                        <p className={errorStyles}>{errors.timeline.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Right column - General inquiry */}
                  <div className="space-y-6 bg-gray-800/30 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2 mb-4">
                      General Message
                    </h3>
                    <div>
                      <label htmlFor="generalInquiry" className={labelStyles}>
                        Your Message
                        {!hasBusinessProblem ? (
                          <span className="ml-1 text-yellow-500">*</span>
                        ) : (
                          <span className="ml-1 text-gray-500">(Optional)</span>
                        )}
                      </label>
                      <textarea
                        id="generalInquiry"
                        {...register('generalInquiry')}
                        rows={11}
                        className={inputStyles}
                        placeholder="Have questions or want to discuss something? Tell us about it here..."
                        autoComplete="off"
                      ></textarea>
                      {errors.generalInquiry && errors.generalInquiry.message?.includes('business challenge or leave a general message') ? (
                        <GlowingErrorMessage message={errors.generalInquiry.message} />
                      ) : errors.generalInquiry && (
                        <p className={errorStyles}>{errors.generalInquiry.message}</p>
                      )}
                    </div>
                    
                    {/* Submit button moved to the bottom of the right column */}
                    <div className="flex items-center justify-end mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <Spinner size="sm" text="Sending..." />
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

