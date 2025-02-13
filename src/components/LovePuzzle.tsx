"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GRID_SIZE = 3
const CELL_SIZE = 100
const CELL_GAP = 5

type PuzzlePiece = {
  id: number
  currentPosition: number
}

const PUZZLE_IMAGE = "/puzzle.webp"

export default function SlidingPuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [emptyCell, setEmptyCell] = useState<number>(GRID_SIZE * GRID_SIZE - 1)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  useEffect(() => {
    initializePuzzle()
  }, [])

  // Initialize the puzzle in the solved state.
  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = Array.from(
      { length: GRID_SIZE * GRID_SIZE - 1 },
      (_, i) => ({
        id: i,
        currentPosition: i,
      })
    )
    setPieces(newPieces)
    setEmptyCell(GRID_SIZE * GRID_SIZE - 1)
    setIsCompleted(false)
  }

  // Determine adjacent positions (neighbors) using row/column math.
  const getMovablePositions = (emptyIndex: number): number[] => {
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE)
    const emptyCol = emptyIndex % GRID_SIZE
    const moves: number[] = []
    // Up
    if (emptyRow > 0) moves.push((emptyRow - 1) * GRID_SIZE + emptyCol)
    // Down
    if (emptyRow < GRID_SIZE - 1) moves.push((emptyRow + 1) * GRID_SIZE + emptyCol)
    // Left
    if (emptyCol > 0) moves.push(emptyRow * GRID_SIZE + (emptyCol - 1))
    // Right
    if (emptyCol < GRID_SIZE - 1) moves.push(emptyRow * GRID_SIZE + (emptyCol + 1))
    return moves
  }

  // Shuffle using a small number of moves to create an easier puzzle.
  const shufflePuzzle = (puzzlePieces: PuzzlePiece[]) => {
    const shuffled = [...puzzlePieces]
    let currentEmpty = GRID_SIZE * GRID_SIZE - 1
    const shuffleMoves = 20

    for (let i = 0; i < shuffleMoves; i++) {
      const movablePositions = getMovablePositions(currentEmpty)
      const randomPos =
        movablePositions[Math.floor(Math.random() * movablePositions.length)]
      const pieceIndex = shuffled.findIndex((p) => p.currentPosition === randomPos)
      if (pieceIndex !== -1) {
        // Move the piece into the empty cell.
        shuffled[pieceIndex] = { ...shuffled[pieceIndex], currentPosition: currentEmpty }
        currentEmpty = randomPos
      }
    }

    return { shuffledPieces: shuffled, finalEmptyIndex: currentEmpty }
  }

  // Handle piece click: only allow moving a piece if it is adjacent to the empty cell.
  const handlePieceClick = (piece: PuzzlePiece) => {
    if (isCompleted) return

    const movablePositions = getMovablePositions(emptyCell)
    if (movablePositions.includes(piece.currentPosition)) {
      const newPieces = pieces.map((p) =>
        p.id === piece.id ? { ...p, currentPosition: emptyCell } : p
      )
      setPieces(newPieces)
      setEmptyCell(piece.currentPosition)

      if (checkCompletion(newPieces)) {
        setIsCompleted(true)
      }
    }
  }

  // Check if the puzzle is solved by comparing piece IDs with their positions.
  const checkCompletion = (currentPieces: PuzzlePiece[]): boolean => {
    return currentPieces.every((piece) => piece.id === piece.currentPosition)
  }

  // Calculate x and y coordinates for a given grid index.
  const getPosition = (index: number) => ({
    x: (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP),
    y: Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP),
  })

  // Set the background styling so that the correct part of the image appears.
  const getPieceStyle = (id: number) => ({
    backgroundImage: `url(${PUZZLE_IMAGE})`,
    backgroundSize: `${GRID_SIZE * 100}%`,
    backgroundPosition: `${
      (id % GRID_SIZE) * (100 / (GRID_SIZE - 1))
    }% ${Math.floor(id / GRID_SIZE) * (100 / (GRID_SIZE - 1))}%`,
  })

  // Determine which pieces are movable for visual highlighting.
  const movablePositions = getMovablePositions(emptyCell)
  const movablePieceIds = pieces
    .filter((piece) => movablePositions.includes(piece.currentPosition))
    .map((piece) => piece.id)

  const handleShuffle = () => {
    const { shuffledPieces, finalEmptyIndex } = shufflePuzzle(pieces)
    setPieces(shuffledPieces)
    setEmptyCell(finalEmptyIndex)
    setIsCompleted(false)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#F9FCF1] to-pink-100">
      <h2 className="text-5xl font-great-vibes text-center mb-10 text-pink-600 drop-shadow-lg">
        Sliding Puzzle of Love
      </h2>
      <Card className="max-w-xl mx-auto bg-gradient-to-r from-pink-50 via-white to-red-50 shadow-xl rounded-2xl overflow-hidden border border-pink-200">
        <CardContent className="p-8">
          <div
            className="relative mx-auto"
            style={{
              width: GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP,
              height: GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP,
            }}
          >
            {pieces.map((piece) => {
              const pos = getPosition(piece.currentPosition)
              const isMovable = movablePieceIds.includes(piece.id)
              return (
                <motion.div
                  key={piece.id}
                  className={`absolute rounded-lg cursor-pointer overflow-hidden border ${
                    isMovable ? "border-green-500" : "border-pink-200"
                  }`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    ...getPieceStyle(piece.id),
                  }}
                  initial={pos}
                  animate={pos}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => handlePieceClick(piece)}
                  whileHover={isMovable ? { scale: 1.05 } : {}}
                />
              )
            })}
          </div>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <p className="text-2xl font-dancing-script text-pink-700">
                Just like this puzzle, our love fits perfectly together!
              </p>
            </motion.div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleShuffle}
              variant="outline"
              className="bg-pink-100 text-pink-700 hover:bg-pink-200"
            >
              Shuffle Puzzle
            </Button>
            <Button
              onClick={initializePuzzle}
              variant="outline"
              className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              Reset Puzzle
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
