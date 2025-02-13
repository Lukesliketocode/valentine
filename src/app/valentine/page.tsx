"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../../components/Header"
import LoveLetter from "../../components/LoveLetter"
import Playlist from "../../components/Playlist"
import ParallaxTimeline from "../../components/ParallaxTimeline"
import LoveMeter from "../../components/LoveMeter"
import ValentineProposal from "../../components/ValentineProposal"
import LovePuzzle from "../../components/LovePuzzle"
import CatchMyLoveGame from "../../components/CatchMyLoveGame"
import LoveMazeGame from "../../components/LoveMazeGame"
import LoveStoryTimeline from "../../components/LoveStoryTimeline"
import LoveTerminal from "@/components/LoveTerminal"
import LoveReasons from "@/components/Pokemon"
import LoveBook from "@/components/LoveBook"

export default function ValentinesPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      if (isLoggedIn !== "true") {
        router.push("/login")
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const totalScroll = docHeight - windowHeight
      const progress = scrollPosition / totalScroll
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen cursor-heart overflow-x-hidden">
      <Header />
      <LoveLetter />
      <CatchMyLoveGame/>
      <LoveStoryTimeline />
      <AnimatePresence mode="wait">
        <motion.main
          key="main"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        > 
          <LovePuzzle />
          <LoveBook/>
          <ParallaxTimeline />
          <Playlist />
          <LoveReasons/>
          <LoveMazeGame />
          <LoveTerminal/>
          <ValentineProposal />
        </motion.main>
      </AnimatePresence>
      <LoveMeter progress={scrollProgress} />
    </div>
  )
}

