"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import img from '../../public/screen/light.webp'
import Image from "next/image";

const slides = [
  {
    text: "Anshita never believed in love.",
    image: "/images/1.webp",
  },
  {
    text: "Her heart remained locked and guarded.",
    image: "/images/2.webp",
  },
  {
    text: "Then, fate brought her to Mihir.",
    image: "/images/3.webp",
  },
  {
    text: "Mihir saw beauty in her guarded soul.",
    image: "/images/4.webp",
  },
  {
    text: "He loved her passionately from the start.",
    image: "/images/5.webp",
  },
  {
    text: "Every smile and every gesture proved his love.",
    image: "/images/6.webp",
  },
  {
    text: "He gave her every reason to believe in love.",
    image: "/images/7.webp",
  },
  {
    text: "Slowly, her heart began to open.",
    image: "/images/8.webp",
  },
  {
    text: "Together, they discovered the true meaning of love.",
    image: "/images/9.webp",
  },
];

export default function LoveStory() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [started, setStarted] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Start Screen
  if (!started) {
    return (
      <section className="py-12 bg-gradient-to-b from-rose-200 to-[#F9FCF1] relative">
        <div className="absolute md:-top-4 top-0 -right-4 z-10">
          <Image
           src={img} 
           alt="Our love" className="w-48 lg:w-72 hidden md:block" />
        </div>
        <h2 className="text-4xl font-great-vibes text-red-600 text-center mb-8 mt-24">
          Our Love Story
        </h2>
        <Card className="max-w-2xl mx-auto bg-white shadow-lg">
          <CardContent className="p-8 flex flex-col items-center">
            {/* Added image above the Start button */}
            <div>
            <img
              src="/images/start.webp"
              alt="A beautiful beginning"
              className="mb-4 w-72 object-contain"
            />
            <p className="text-lg font-montserrat text-indigo mb-4">Click Start to begin our love story</p>
            </div>
            <Button
              onClick={() => setStarted(true)}
              className="bg-pastel-pink text-indigo hover:bg-light-pink"
            >
              Start
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Story Slides
  return (
    <section className="py-12 bg-gradient-to-b from-rose-200 to-[#F9FCF1] relative">
      <div className="absolute md:-top-4 top-0 -right-4 z-10">
        <img src="/screen/light.webp" alt="Our love" className="w-48 lg:w-72" />
      </div>
      <h2 className="text-4xl font-great-vibes text-red-600 text-center mb-8 mt-24">
        Our Love Story
      </h2>
      <Card className="max-w-2xl mx-auto bg-white shadow-lg ">
        <CardContent className="p-8">
          <div className="relative h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center"
              >
                {slides[currentSlide].image && (
                  <img
                    src={slides[currentSlide].image}
                    alt="Slide image"
                    className="mb-4 w-72 object-contain"
                  />
                )}
                <p className="text-lg font-montserrat text-indigo ">
                  {slides[currentSlide].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-pastel-pink text-indigo hover:bg-light-pink disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Previous
            </Button>
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-pastel-pink text-indigo hover:bg-light-pink disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
