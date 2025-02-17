"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Clock, Users } from "lucide-react"
import Image from "next/image"

// Updated mock data for recipes with tags
const recipes = [
  {
    id: 1,
    title: "Spicy BBQ Ribs",
    description: "Tender, fall-off-the-bone ribs with a spicy barbecue sauce.",
    tags: ["barbecue", "dinner", "meal prep"],
    prepTime: "30 mins",
    cookTime: "3 hours",
    servings: 4,
  },
  {
    id: 2,
    title: "Creamy Tomato Soup",
    description: "A comforting classic made with ripe tomatoes and a touch of cream.",
    tags: ["soup", "lunch", "vegetarian"],
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 6,
  },
  {
    id: 3,
    title: "Breakfast Burrito",
    description: "A hearty breakfast wrap filled with eggs, cheese, and vegetables.",
    tags: ["breakfast", "Latin American", "meal prep"],
    prepTime: "20 mins",
    cookTime: "10 mins",
    servings: 2,
  },
  {
    id: 4,
    title: "Classic Club Sandwich",
    description: "A triple-decker sandwich with turkey, bacon, lettuce, and tomato.",
    tags: ["sandwiches", "lunch"],
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 1,
  },
  {
    id: 5,
    title: "Chocolate Lava Cake",
    description: "Decadent individual chocolate cakes with a gooey center.",
    tags: ["desserts", "dinner"],
    prepTime: "15 mins",
    cookTime: "12 mins",
    servings: 4,
  },
  {
    id: 6,
    title: "Mango Lassi",
    description: "A refreshing Indian yogurt-based drink with mango and cardamom.",
    tags: ["drinks", "desserts"],
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 2,
  },
]

const allTags = [
  "barbecue",
  "soup",
  "Latin American",
  "sandwiches",
  "meal prep",
  "dinner",
  "lunch",
  "breakfast",
  "brunch",
  "drinks",
  "desserts",
]

export default function Russipes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const filteredRecipes = recipes.filter(
    (recipe) =>
      (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => recipe.tags.includes(tag))),
  )

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
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
                <Link href="/russipes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Russipes
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
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white backdrop-blur-md bg-white/10 hover:bg-white/20"
            >
              <span className="relative text-gray-300 group-hover:text-white">Get a Demo</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                Russipes
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
            >
              Discover delicious recipes and culinary inspiration
            </motion.p>
          </div>
        </section>

        {/* Search and Tags Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer text-teal-400 border-teal-400 hover:bg-teal-400/20 transition-colors ${
                      selectedTags.includes(tag) ? "bg-teal-400/20" : "bg-transparent"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full bg-gray-900/50 backdrop-blur-md border border-gray-800/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[7.2rem] h-[7.2rem] overflow-hidden rounded-bl-2xl">
                      <div className="absolute inset-0 backdrop-blur-md bg-white/10" />
                      <Image
                        src="/placeholder.svg"
                        alt="Recipe image"
                        width={115}
                        height={115}
                        className="object-cover relative z-10"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-white pr-28">{recipe.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 pr-28">{recipe.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-teal-400 border-teal-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-teal-400" />
                          <span>Prep: {recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-teal-400" />
                          <span>Cook: {recipe.cookTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-teal-400" />
                          <span>Serves: {recipe.servings}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot */}
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={() => setChatbotOpen(!chatbotOpen)}
            className="rounded-full w-12 h-12 bg-teal-500/50 hover:bg-teal-600/50 transition-colors backdrop-blur-md"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </Button>
          {chatbotOpen && (
            <div className="absolute bottom-16 right-0 w-80 bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-4">
              <h3 className="text-white font-semibold mb-2">Recipe Assistant</h3>
              <p className="text-gray-400 mb-4">Ask me anything about recipes!</p>
              <Input
                type="text"
                placeholder="Type your question..."
                className="w-full mb-2 bg-gray-800 text-white border-gray-700"
              />
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Send</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

