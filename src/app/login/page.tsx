"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import type React from "react"

export default function LoginPage() {
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (answer.toLowerCase() === "woodpecker") {
      document.cookie = `isLoggedIn=true; path=/; max-age=86400; SameSite=Lax`
      router.push("/valentine")
    } else {
      setError("That's not quite right, my love. Try again!")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-t from-pink-300 to-rose-300">

      <Card className="w-full max-w-lg bg-white backdrop-blur-md shadow-lg z-10">
        <CardHeader>
          <CardTitle className="text-4xl font-great-vibes text-deep-red text-center">
            My Valentine's Secret
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <p className="text-xl font-dancing-script mb-2">
                To unlock our love story, answer this:
              </p>
              <p className="text-lg font-montserrat">
                What's the name of the bird that smacked into the window at the yoga center?
              </p>
            </div>
            <Input
              type="text"
              placeholder="Your answer, my love"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="text-center"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-dancing-script text-xl px-8 py-2 rounded-full"
                >
                  Open My Heart <Heart className="ml-2" size={20} />
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
