"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Mail } from "lucide-react"

export default function LoveLetterEnvelope() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="relative py-24 text-center bg-gradient-to-b from-pink-100 to-[#F9FCF1] overflow-hidden min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-great-vibes text-deep-red text-center mb-12 drop-shadow-lg">
        Catch My Love
      </h2>
      <FloatingPetals />
      <FloatingHearts />
      <SparkleOverlay />

      <AnimatePresence mode="wait">
        {!isOpen ? <Envelope key="envelope" setIsOpen={setIsOpen} /> : <LoveLetter key="letter" />}
      </AnimatePresence>

      <div className="md:absolute -bottom-4 -right-4 z-10">
        <img src="/screen/cupid.webp" alt="Our love" className="w-40 lg:w-72" />
      </div>
    </section>
  )
}

function FloatingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
            scale: [0, 1, 0.8],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M15 0C15 8.28427 8.28427 15 0 15C8.28427 15 15 21.7157 15 30C15 21.7157 21.7157 15 30 15C21.7157 15 15 8.28427 15 0Z"
              fill="#FFB3BA"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function Envelope({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <motion.div
      className="relative z-10 w-full max-w-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white border-2 border-gray-400 rounded-2xl shadow-2xl overflow-hidden transform -rotate-1">
        <CardContent className="p-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-300" style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)" }}></div>

          <div className="relative pt-32 pb-8 px-8">
            <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-300 border-2 border-yellow-500 rounded-sm flex items-center justify-center shadow-md transform rotate-3">
              <Heart className="w-10 h-10 text-red-500" />
            </div>

            <div className="flex flex-col items-center justify-center">
              <Mail className="w-20 h-20 text-pink-500 mb-6 drop-shadow-lg" />
              <Button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 rounded-full bg-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Open Love Letter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LoveLetter() {
  return (
    <motion.div
      className="relative z-10 w-full max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white text-indigo shadow-lg relative">
        <CardContent className="p-8">
          <p className="font-dancing-script text-base md:text-xl leading-relaxed">
            <span className="text-soft-red">My dearest Anshita,</span>
            <br /><br />
            Every time I think about you, my heart feels warm and happy. You are the best thing that has ever happened to me. Your smile makes my world brighter, and your love fills my heart with joy.
            <br /><br />
            I love the way you care for me, the way you laugh, and the way you make even the smallest moments special. Being with you feels like a beautiful dream, and I never want to wake up.
            <br /><br />
            No matter where life takes us, I promise to always love you, support you, and stand by your side. You are my heart, my happiness, my forever. 
            <br /><br />
            <span className="text-soft-red">Mr Mintuji</span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-300 opacity-75"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ y: "100vh", opacity: 0, rotate: Math.random() * 360 }}
          animate={{ y: "-10vh", opacity: 1, rotate: Math.random() * 360 }}
          transition={{ duration: Math.random() * 10 + 5, delay: Math.random() * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Heart size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  )
}

function SparkleOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ width: 3, height: 3, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, delay: Math.random() * 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
