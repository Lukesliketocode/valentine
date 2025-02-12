import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { RomanticButton } from "./ui/romantic-button";

export default function Header() {
  const [showMessage, setShowMessage] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    const startDate = new Date("2023-03-27");

    const updateCounter = () => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTimeTogether({ years, months, days });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative text-center py-12 sm:py-24 overflow-hidden bg-gradient-to-t from-pink-100 to-[#F9FCF1]">
      {/* Background Animations */}
      <FloatingHearts />
      <SparkleOverlay />

      {/* Big Background Heart Behind Text */}
      <BigBackgroundHeart />

      {/* Main Content */}
      <div className="relative z-10 px-4">
        <motion.h1
          className="text-4xl sm:text-8xl font-great-vibes text-pink-600 mb-4 sm:mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Happy Valentine&apos;s Day
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-5xl font-dancing-script mb-4 sm:mb-8 text-pink-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          For My Love, Anshita
        </motion.h2>
        <HeartAnimation />

        {showMessage && (
          <motion.div
            className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 mb-24 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base sm:text-2xl font-lora text-midnight-blue max-w-2xl mx-auto leading-relaxed">
              Every moment with you is a treasure. Today, I celebrate the love that fills my heart and brightens my world.
            </p>
            <RomanticButton 
  className="bg-pink-500 text-white py-4 px-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto"
>
<p className="text-lg font-semibold ">
    We&apos;'ve been in love for:
  </p>
</RomanticButton>
<div className="text-center bg-white bg-opacity-80 p-4 rounded-2xl shadow-lg max-w-md mx-auto"> 
              <p className="text-xl font-bold mt-1">
                <span className="text-3xl text-red-500">{timeTogether.years}</span>
                <span className="text-base ml-1">Year</span>,
                <span className="text-3xl text-pink-500 ml-2">{timeTogether.months}</span>
                <span className="text-base ml-1">Months</span>,
                <span className="text-3xl text-red-500 ml-2">{timeTogether.days}</span>
                <span className="text-base ml-1">Days</span>
              </p>
            </div>

          </motion.div>
        )}
      </div>

      {/* Bottom Hearts on Sticks */}
      <BottomHearts />
      
    </header>
  );
}

/** Big Background Heart Component **/
function BigBackgroundHeart() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <Heart className="text-red-300 opacity-30 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px]" />
    </div>
  );
}

/** Floating Hearts Animation **/
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 25 + 15;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        return (
          <motion.div
            key={i}
            className="absolute text-red-300 opacity-75"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: "100vh", opacity: 0, rotate: Math.random() * 360 }}
            animate={{ y: "-10vh", opacity: 1, rotate: Math.random() * 360 }}
            transition={{ 
              duration, 
              delay,
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <Heart size={size} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Sparkle Overlay **/
function SparkleOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 3 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 3;
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/** Heart Animation Component **/
function HeartAnimation() {
  return (
    <motion.div
      className="flex justify-center items-center space-x-4 mb-4 sm:mb-8"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Heart className="text-pink-500 w-10 sm:w-14 h-10 sm:h-14 animate-pulse" />
      <Heart className="text-red-600 w-14 sm:w-20 h-14 sm:h-20 animate-bounce" />
      <Heart className="text-pink-500 w-10 sm:w-14 h-10 sm:h-14 animate-pulse" />
    </motion.div>
  );
}

/** BottomHearts Component: Multiple hearts each with a stick directly attached below **/
function BottomHearts() {
  // Increase the number of hearts as desired
  const heartCount = 12;
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end z-10 max-w-5xl mx-auto">
      {Array.from({ length: heartCount }).map((_, i) => {
        // Randomize the stick height between 20px and 70px.
        const stickHeight = Math.floor(Math.random() * 50) + 20;
        return (
          <div key={i} className="flex flex-col items-center">
            {/* Heart */}
            <Heart fill="pink" className="text-red-500 w-8 sm:w-10 h-12 sm:h-10" />
            {/* Stick directly attached below the heart (no gap) */}
            <div
              className="w-1 bg-white"
              style={{ height: `${stickHeight}px` }}
            />
          </div>
        );
      })}
    </div>
  );
}
