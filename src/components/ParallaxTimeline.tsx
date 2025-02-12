import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";

interface TimelineEvent {
  date: string;
  title: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "20 December 2024",
    title: "I dont care 😎",
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
    // Typecast to SVGPathElement to access getTotalLength()
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

      // Cleanup the subscription on unmount
      return () => unsubscribe();
    }
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="md:relative py-16 px-4 bg-gradient-to-b from-pink-200 via-rose-50 to-pink-50 overflow-hidden"
    >
      <div className="absolute top-0 md:top-4 left-12 z-10 hidden md:block">
        <img
          src="/screen/butterfly.webp"
          alt="Our love"
          className="w-24 md:w-32"
        />
      </div>
      <h2 className="text-4xl sm:text-3xl font-playfair text-center mb-12 mt-16 text-pink-700">
        Moments we spend together!
      </h2>
      <div className="relative">
        {/* 
          If you prefer to hide the SVG on mobile screens, 
          you can add "hidden md:block" to the className.
        */}
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
        {/* Wrapping timeline events with a higher z-index */}
        <div className="relative z-10 space-y-20">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="md:w-1/2 text-right md:pr-8 z-50">
                    <h3 className="text-2xl sm:text-xl font-playfair mb-2 text-pink-600">
                      {event.title}
                    </h3>
                    <p className="text-lg font-montserrat text-gray-600">
                      {event.date}
                    </p>
                  </div>
                  <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8 flex justify-center">
                  <motion.img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-56 relative h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute top-72 left-56 z-10 hidden md:block">
                    <img src="/screen/clip.png" alt="Our love" className="w-24" />
                  </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:w-1/2 flex justify-center md:pr-8 mt-6 md:mt-0">
                  <motion.img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                     <div className="absolute -top-8 right-[27rem] z-10 hidden md:block">
                    <img src="/screen/clip.png" alt="Our love" className="w-24" />
                  </div>
                  <div className="absolute bottom-[12rem] right-[27rem] z-10 hidden md:block">
                    <img src="/screen/clip.png" alt="Our love" className="w-24" />
                  </div>
                  </div>
                  <div className="md:w-1/2 text-left md:pl-8">
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
