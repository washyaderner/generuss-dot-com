"use client"

import Link from "next/link"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"
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

type FormData = z.infer<typeof formSchema>

const inputStyles = "mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-gray-700 text-white"
const errorStyles = "mt-1 text-sm text-red-400"
const labelStyles = "block text-sm font-medium text-gray-400"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur" // Validate on blur for better UX
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

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
      toast.error(`Failed to send message: ${error instanceof Error ? error.message : 'Please try again or contact us directly.'}`, {
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-[#0A0A1E] z-0" />
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
                <GrassIcon className="w-6 h-6 mr-2" />
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
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <Link
              href="#"
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
                  Contact Us
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Get in touch with us for any inquiries or support
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <form 
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    What problem are you trying to solve? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="problem"
                    {...register("problem")}
                    rows={4}
                    className={inputStyles}
                    placeholder="Describe the challenge you're facing..."
                    autoComplete="off"
                  ></textarea>
                  {errors.problem && (
                    <p className={errorStyles}>{errors.problem.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="solution" className={labelStyles}>
                    What's your proposed solution?
                  </label>
                  <textarea
                    id="solution"
                    {...register("solution")}
                    rows={4}
                    className={inputStyles}
                    placeholder="Share your ideas or requirements..."
                    autoComplete="off"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="platforms" className={labelStyles}>
                    What platforms/services are you currently using? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="platforms"
                    {...register("platforms")}
                    rows={3}
                    className={inputStyles}
                    placeholder="List the tools and platforms in your workflow..."
                    autoComplete="off"
                  ></textarea>
                  {errors.platforms && (
                    <p className={errorStyles}>{errors.platforms.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeline" className={labelStyles}>
                    Project timeline and deadlines <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="timeline"
                    {...register("timeline")}
                    rows={3}
                    className={inputStyles}
                    placeholder="When do you need this completed?"
                    autoComplete="off"
                  ></textarea>
                  {errors.timeline && (
                    <p className={errorStyles}>{errors.timeline.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className={labelStyles}>
                    What is your projected budget?
                  </label>
                  <div className="mt-1">
                    <p className="text-sm text-gray-400 mb-2">Our demo call will ensure the price is fair for both parties.</p>
                    <input
                      id="budget"
                      {...register("budget")}
                      type="text"
                      className={inputStyles}
                      placeholder="Optional - we can discuss during the call"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
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
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

