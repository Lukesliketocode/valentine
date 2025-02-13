import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import clip from "../../public/screen/clip.png";

interface TimelineEvent {
  date: string;
  title: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "20 December 2024",
    title: "I don't care 😎",
    image: "/img/img1.jpeg",
  },
  {
    date: "1 June 2024",
    title: "Drawing Together 🎨",
    image: "/img/img2.jpeg",
  },
  {
    date: "2 March 2024",
    title: "Citronics!!!",
    image: "/img/img3.jpeg",
  },
  // Add more events here
];

export default function ParallaxTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const path = document.querySelector(
      ".love-journey-path"
    ) as SVGPathElement | null;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      const unsubscribe = scrollYProgress.onChange((latest) => {
        const drawLength = length * latest;
        path.style.strokeDashoffset = (length - drawLength).toString();
      });

      return () => unsubscribe();
    }
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 px-4 bg-gradient-to-b from-pink-200 via-rose-50 to-pink-50 overflow-hidden"
    >
      {/* Decorative butterfly visible on all devices */}
      <div className="absolute top-4 left-4 z-10">
        <Image
          src="/screen/butterfly.webp"
          width={80}
          height={80}
          quality={100}
          loading="lazy"
          alt="Our love"
          className="w-16"
        />
      </div>
      <h2 className="text-4xl sm:text-3xl font-playfair text-center mb-12 mt-16 text-pink-700">
        Moments we spend together!
      </h2>
      <div className="relative">
        {/* Decorative pink path */}
        <svg
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M50,0 Q75,25 50,50 T50,100"
            fill="none"
            stroke="#FF69B4"
            strokeWidth="2"
            className="love-journey-path"
          />
        </svg>
        <div className="relative z-10 space-y-20">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Lowered threshold for mobile
              transition={{ duration: 0.8 }}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="w-full md:w-1/2 text-right md:pr-8 z-50">
                    <h3 className="text-2xl sm:text-xl font-playfair mb-2 text-pink-600">
                      {event.title}
                    </h3>
                    <p className="text-lg font-montserrat text-gray-600">
                      {event.date}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-8 flex justify-center relative">
                    <motion.img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 flex justify-center md:pr-8 mt-6 md:mt-0 relative">
                    <motion.img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-left md:pl-8 mt-4">
                    <h3 className="text-2xl sm:text-xl font-playfair mb-2 text-pink-600">
                      {event.title}
                    </h3>
                    <p className="text-lg font-montserrat text-gray-600">
                      {event.date}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
