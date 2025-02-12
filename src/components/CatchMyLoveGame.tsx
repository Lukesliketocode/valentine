"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CatchMyLoveGame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [bucketPosition, setBucketPosition] = useState(50); // percentage
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
    setHearts([]);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setHearts((prevHearts) => [
          ...prevHearts,
          { id: Date.now(), x: Math.random() * 100 }, // x is now a percentage
        ]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBucketPosition(Math.max(0, Math.min(x, 100)));
      }
    };

    if (gameStarted && !gameOver) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const checkCollisions = () => {
      if (bucketRef.current) {
        const bucketRect = bucketRef.current.getBoundingClientRect();
        setHearts((prevHearts) => {
          return prevHearts.filter((heart) => {
            const heartElement = document.getElementById(`heart-${heart.id}`);
            if (heartElement) {
              const heartRect = heartElement.getBoundingClientRect();
              if (
                heartRect.bottom >= bucketRect.top &&
                heartRect.left >= bucketRect.left &&
                heartRect.right <= bucketRect.right
              ) {
                setScore((prevScore) => prevScore + 1);
                return false; // remove the heart
              }
            }
            return true; // keep the heart
          });
        });
      }
    };

    if (gameStarted && !gameOver) {
      const interval = setInterval(checkCollisions, 100);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (score >= 20) {
      setGameOver(true);
    }
  }, [score]);

  const heartVariants = {
    initial: { y: -50 },
    animate: {
      y: "100vh",
      transition: { duration: 4, ease: "linear" },
    },
  };

  return (
    <section className="pt-16 pb-24 md:pb-16 px-4 bg-gradient-to-b from-[#F9FCF1] via-purple-100 to-rose-200 relative">
           <div className="absolute bottom-0 md:bottom-12 left-24 z-10">
        <img src="/screen/panda.png" alt="Our love" className="w-44 " />
      </div>
      <h2 className="text-4xl font-great-vibes text-deep-red text-center mb-8 drop-shadow-lg ">
        Catch My Love
      </h2>
 
      <Card className="max-w-3xl mx-auto bg-white/80 shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div
            ref={gameAreaRef}
            className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-b from-pink-50 to-purple-100 border-2 border-dashed border-pink-300 shadow-inner"
          >
            {/* Red heart background element */}
            <div className="absolute inset-0 opacity-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-full h-full fill-current text-red-500"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {gameStarted && !gameOver && (
              <>
                {hearts.map((heart) => (
                  <motion.div
                    id={`heart-${heart.id}`}
                    key={heart.id}
                    className="absolute text-5xl drop-shadow-lg"
                    style={{ left: `${heart.x}%` }}
                    variants={heartVariants}
                    initial="initial"
                    animate="animate"
                  >
                    ❤️
                  </motion.div>
                ))}
                <div
                  ref={bucketRef}
                  className="absolute bottom-0 w-24 h-12 rounded-t-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-2xl"
                  style={{ left: `calc(${bucketPosition}% - 3rem)` }}
                />
              </>
            )}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={startGame}
                  className="text-xl font-dancing-script bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg"
                >
                  Start Game
                </Button>
              </div>
            )}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center space-y-4">
                  <p className="text-2xl font-dancing-script text-white">
                    Game Over!
                  </p>
                  <p className="text-xl font-dancing-script text-white">
                    You caught {score} hearts!
                  </p>
                  <Button
                    onClick={startGame}
                    className="text-xl font-dancing-script bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg"
                  >
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-xl font-dancing-script text-gray-800">
            Score: {score}
          </p>
          {gameStarted && !gameOver && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Move your mouse to control the bucket and catch the falling hearts!
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
