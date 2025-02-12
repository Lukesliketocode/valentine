"use client"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const maze = [
  [0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 2],
]

// Base cell size for larger screens
const BASE_CELL_SIZE = 50

export default function LoveMazeGame() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [gameWon, setGameWon] = useState(false)
  // cellSize will adjust based on viewport width for responsiveness.
  const [cellSize, setCellSize] = useState(BASE_CELL_SIZE)

  // Adjust cell size on window resize so the maze fits smaller screens.
  useEffect(() => {
    const updateCellSize = () => {
      if (window.innerWidth < 400) {
        setCellSize(40)
      } else {
        setCellSize(BASE_CELL_SIZE)
      }
    }
    updateCellSize()
    window.addEventListener("resize", updateCellSize)
    return () => window.removeEventListener("resize", updateCellSize)
  }, [])

  const movePlayer = useCallback((dx: number, dy: number) => {
    setPlayerPosition((prev) => {
      const newX = prev.x + dx
      const newY = prev.y + dy
      if (
        newX >= 0 &&
        newX < maze[0].length &&
        newY >= 0 &&
        newY < maze.length &&
        maze[newY][newX] !== 1
      ) {
        if (maze[newY][newX] === 2) {
          setGameWon(true)
        }
        return { x: newX, y: newY }
      }
      return prev
    })
  }, [])

  // Listen for arrow keys (desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1)
          break
        case "ArrowDown":
          movePlayer(0, 1)
          break
        case "ArrowLeft":
          movePlayer(-1, 0)
          break
        case "ArrowRight":
          movePlayer(1, 0)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [movePlayer])

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 })
    setGameWon(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-200 py-16">
      <h2 className="text-5xl font-great-vibes text-center mb-12 text-rose-600 drop-shadow-lg">
        Love Maze Game
      </h2>
      <Card className="max-w-md mx-auto shadow-2xl border border-rose-200 rounded-2xl overflow-hidden">
        <CardContent className="p-8 bg-white">
          <div
            className="relative mx-auto"
            style={{
              width: maze[0].length * cellSize,
              height: maze.length * cellSize,
            }}
          >
            {maze.map((row, y) =>
              row.map((cell, x) => {
                let cellClass = "bg-indigo-100"
                if (cell === 1) {
                  cellClass =
                    "bg-gradient-to-br from-pink-500 to-rose-500 rounded-md shadow-inner"
                } else if (cell === 2) {
                  cellClass =
                    "bg-gradient-to-br from-red-600 to-red-700 rounded-md shadow-lg"
                }
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`absolute ${cellClass} border border-gray-200`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: x * cellSize,
                      top: y * cellSize,
                    }}
                  />
                )
              })
            )}
            <motion.div
              className="absolute text-3xl drop-shadow-xl"
              animate={{
                x: playerPosition.x * cellSize,
                y: playerPosition.y * cellSize,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              ❤️
            </motion.div>
          </div>

          {/* Mobile on-screen controls */}
          <div className="mt-4 md:hidden flex flex-col items-center">
            <div className="flex justify-center mb-2">
              <Button onClick={() => movePlayer(0, -1)} className="mx-1">
                ↑
              </Button>
            </div>
            <div className="flex justify-center mb-2">
              <Button onClick={() => movePlayer(-1, 0)} className="mx-1">
                ←
              </Button>
              <Button onClick={() => movePlayer(1, 0)} className="mx-1">
                →
              </Button>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => movePlayer(0, 1)} className="mx-1">
                ↓
              </Button>
            </div>
          </div>

          {gameWon ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-2xl font-dancing-script text-rose-600 mb-4">
                You'll always find your way to me!
              </p>
              <Button onClick={resetGame} className="px-6 py-2">
                Play Again
              </Button>
            </motion.div>
          ) : (
            <p className="mt-8 text-center text-sm text-gray-600">
              Use the arrow keys or tap the buttons to guide the heart to "You"
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
