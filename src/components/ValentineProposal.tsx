"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Define default and rejection images
const defaultImage = "/proposal/propose.gif"; // default image for rejectionCount 0
const rejectionImages = [
  "/proposal/no.webp",
  "/proposal/no2.jpg",
  "/proposal/no3.gif",
  "/proposal/no.webp",
  "/proposal/no5.gif",
  "/proposal/no6.gif",
];


export default function ValentineProposal() {
  const [rejectionCount, setRejectionCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const handleYes = () => {
    setAccepted(true);
  };

  const handleNo = () => {
    if (rejectionCount < 5) {
      setRejectionCount((prev) => prev + 1);
    } else {
      handleYes();
    }
  };

  const questions = [
    "Will you be my Valentine?",
    "Are you sure? Pretty please?",
    "Come on, don't break my heart!",
    "I promise to be the best Valentine ever!",
    "Last chance! Say yes?",
    "Fine, I'll just assume you said yes...",
  ];

  // Choose the image to display below the question based on rejectionCount
  const currentImage = rejectionCount === 0 ? defaultImage : rejectionImages[rejectionCount];

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F9FCF1]  to-pink-300 p-4 relative overflow-hidden">
    

      {/* Red Heart Background */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-[40rem] h-[34rem] text-red-600 opacity-40 blur-sm"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      {/* Floating Hearts Animation */}
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full relative z-10 mb-44"
          >
            <h2 className="text-4xl font-great-vibes text-pink-600 mb-6 drop-shadow-md text-center">
              {questions[rejectionCount]}
            </h2>

            {/* Reaction Image */}
            <motion.img
              src={currentImage}
              alt="Reaction"
              className="mx-auto  mb-6 w-72"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            <div className="flex justify-center space-x-6 mt-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleYes}
                  className="bg-pink-600 text-white font-dancing-script text-xl px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:bg-pink-700"
                  style={{ fontSize: `${1 + rejectionCount * 0.2}rem` }}
                >
                  Yes
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -3 }} whileTap={{ scale: 0.9, rotate: 3 }}>
                <Button
                  onClick={handleNo}
                  className="bg-red-500 text-white font-dancing-script text-xl px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:bg-red-600"
                >
                  No
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full relative z-10"
          >
            <h2 className="text-4xl font-great-vibes text-pink-600 mb-6 drop-shadow-md text-center">
              Yay! You're my Valentine!
            </h2>
            <motion.img
              src='/proposal/yes.gif'
              alt="Cute Valentine's Day GIF"
              className="mx-auto w-76"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -bottom-4 left-4 z-10">
        <img src="/screen/couple.webp" alt="Our love" className="w-24 lg:w-44" />
      </div>
    </section>
  );
}

/** Floating Hearts Animation **/
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 25 + 15;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        return (
          <motion.div
            key={i}
            className="absolute text-red-500 opacity-75"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: "100vh", opacity: 0, rotate: Math.random() * 360 }}
            animate={{ y: "-10vh", opacity: 1, rotate: Math.random() * 360 }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          >
            <Heart size={size} />
          </motion.div>
        );
      })}
    </div>
  );
}
