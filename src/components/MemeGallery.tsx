"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const memes = [
  { mood: "happy", image: "/placeholder.svg?height=300&width=300" },
  { mood: "sad", image: "/placeholder.svg?height=300&width=300" },
  { mood: "excited", image: "/placeholder.svg?height=300&width=300" },
  // Add more memes here
]

export default function MemeGallery() {
  const [currentMeme, setCurrentMeme] = useState(0)

  const nextMeme = () => {
    setCurrentMeme((prev) => (prev + 1) % memes.length)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#F9FCF1] to-pink-300 relative">
      <h2 className="text-4xl font-playfair text-center mb-8">Mood Meme Gallery</h2>
      <Card className="bg-white max-w-md mx-auto shadow-2xl border-4 border-gray-300 p-4">
        <CardContent className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMeme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={memes[currentMeme].image || "/placeholder.svg"}
                alt={`${memes[currentMeme].mood} meme`}
                className="w-full h-64 object-cover rounded-md filter sepia contrast-125"
              />
              <div className="mt-4 border-t border-gray-400 pt-2">
                <p className="font-montserrat text-xl">Mood: {memes[currentMeme].mood}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <Button onClick={nextMeme} className="w-full mt-4">
            Next Meme
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
