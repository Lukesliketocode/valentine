import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface RomanticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function RomanticButton({ children, ...props }: RomanticButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className="bg-deep-red text-white font-dancing-script text-xl bg-red-600 px-8 py-3 rounded-full shadow-lg hover:bg-rose-gold transition-colors duration-300"
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

