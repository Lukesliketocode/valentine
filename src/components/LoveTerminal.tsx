"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Terminal } from "lucide-react"

const LoveTerminal = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const command = "npm run deploy-love"

  const processingSteps = [
    "Initializing love.exe...",
    "Loading heart modules...",
    "Compiling affection data...",
    "Optimizing cuddle algorithms...",
    "Deploying hugs and kisses...",
  ]

  const finalMessage = `
    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
    ❤️                                                        ❤️
    ❤️   Love successfully deployed! You are amazing and      ❤️
    ❤️   deserve all the happiness in the world. Keep         ❤️
    ❤️   spreading love and kindness wherever you go! ❤️      ❤️
    ❤️                                                        ❤️
    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  `

  useEffect(() => {
    if (step > 0 && step <= processingSteps.length) {
      setOutput((prev) => [...prev, processingSteps[step - 1]])
      const timer = setTimeout(() => setStep(step + 1), 1500)
      return () => clearTimeout(timer)
    } else if (step > processingSteps.length) {
      setOutput((prev) => [...prev, finalMessage])
    }
  }, [step])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === command) {
      setStep(1)
      setInput("")
    } else {
      setOutput((prev) => [...prev, `Command not recognized: ${input}`])
      setInput("")
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-purple-200 via-rose-200 to-[#F9FCF1] relative">
    <h2 className="text-4xl font-playfair text-center mb-8">A Quick Love Terminal</h2>
<div className="max-w-4xl mx-auto p-6 bg-gray-900 text-pink-400 rounded-lg shadow-lg font-mono">
      <div className="mb-4 p-2 bg-gray-800 rounded flex items-center">
        <Terminal className="mr-2" />
        <span>
          Copy and paste this command: <strong>{command}</strong>
        </span>
      </div>
      <div className="h-80 mb-4 p-2 bg-black rounded overflow-y-auto">
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent focus:outline-none"
          placeholder="Type your command here..."
        />
      </form>
      <style jsx>{`
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        input::after {
          content: '|';
          animation: blink 1s infinite;
        }
        pre {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
    </div>
  )
}

export default LoveTerminal

