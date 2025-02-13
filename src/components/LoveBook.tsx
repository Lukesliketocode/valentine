'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

// Define prop types for the PageCover component
interface PageCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// PageCover component with forwarded ref and type annotations
const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>(
  (props, ref) => {
    return (
      <div
        className="page-cover bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center p-8 shadow-xl"
        ref={ref}
        data-density="hard"
        {...props}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold">{props.children}</h2>
      </div>
    );
  }
);
PageCover.displayName = "PageCover";

// Define prop types for the Page component
interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  children: React.ReactNode;
}

// Page component with forwarded ref and type annotations
const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div
      className="page bg-white p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[600px] shadow-md rounded-xl mx-2 sm:mx-4"
      ref={ref}
      {...props}
    >
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

// LoveBook component using Next.js and TypeScript
const LoveBook: React.FC = () => {
  // State for responsive flipbook dimensions
  const [flipbookDimensions, setFlipbookDimensions] = useState({
    width: 550,
    height: 650,
  });
  // State to detect if the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 640) {
        const width = viewportWidth - 40; // leave a little margin
        // Increase the height for mobile screens
        const height = (width * 850) / 550;
        setFlipbookDimensions({ width, height });
        setIsMobile(true);
      } else {
        setFlipbookDimensions({ width: 550, height: 650 });
        setIsMobile(false);
      }
    };

    handleResize(); // initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define the FlipBook content to avoid code duplication
  const FlipBookContent = (
    <HTMLFlipBook
  width={flipbookDimensions.width}
  height={flipbookDimensions.height}
  // Providing default values for the required props:
  minWidth={300}         // Set an appropriate minimum width
  maxWidth={800}         // Set an appropriate maximum width
  minHeight={400}        // Set an appropriate minimum height
  maxHeight={1000}       // Set an appropriate maximum height
  startZIndex={0}        // Default z-index (adjust if needed)
  autoSize={false}       // Whether the book should auto size
  clickEventForward={false} // Default value (change as needed)
  useMouseEvents={true}  // Enable mouse events by default
  swipeDistance={30}     // Default swipe distance (adjust as needed)
  showPageCorners={true} // Default value for showing page corners
  disableFlipByClick={false} // Whether flipping by click is disabled
  //
  drawShadow={true}
  flippingTime={1000}
  usePortrait={false}
  maxShadowOpacity={0.5}
  showCover={true}
  mobileScrollSupport={true}
  style={{ margin: "0" }}
  className="album-web"
  startPage={0}
  size="fixed"
>
      {/* Cover Pages */}
      <PageCover>.</PageCover>
      <PageCover>.</PageCover>

      {/* Note Pages */}
      <Page number="A Special Note">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600">
            A Special Note
          </h1>
          <hr className="mb-6 w-1/2 border-t-2 border-red-300 mx-auto" />
          <p className="text-base sm:text-lg leading-relaxed text-gray-800">
            Every moment with you feels like a beautiful dream I never want to wake up from,
            You are my favorite notification, my best distraction, and my happiest thought.
          </p>
          <Image
            src="/origami.webp"
            alt="Romantic Memory"
            width={400}
            height={400}
            loading="lazy"
            className="mb-4 h-full object-cover"
          />
        </div>
      </Page>

      <Page number="Message for You">
        <div className="text-center p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600">
            You are amazing
          </h1>
          <hr className="mb-6 w-1/2 border-t-2 border-red-200 mx-auto" />
          <p className="text-base sm:text-lg text-gray-700">
            Holding your hand feels like holding the universe&apos;s most precious treasure,
            If love was a journey, I&apos;d walk a thousand miles just to be by your side.
          </p>
          <br />
          <p className="text-base sm:text-lg text-gray-700">
            You&apos;re the reason my heart beats a little faster and my world feels a little brighter,
            No matter how bad my day is, your voice is enough to make everything better.
          </p>
        </div>
      </Page>

      {/* Image Page right after the message */}
      <Page number="Sweet Memory">
        <div className="text-center flex flex-col items-center">
          <Image
            src="/img/img5.jpeg"
            alt="Romantic Memory"
            width={400}
            height={400}
            loading="lazy"
            className="rounded-lg shadow-lg mb-4 h-full object-cover"
          />
          <p className="text-base sm:text-lg text-gray-700 italic">
            A memory to treasure forever.
          </p>
        </div>
      </Page>

      <Page number="Why I Love You">
        <div className="text-center p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600">
            Why I Love You
          </h1>
          <hr className="mb-6 w-1/2 border-t-2 border-red-200 mx-auto" />
          <ul className="list-disc list-outside text-base sm:text-lg text-gray-800 space-y-2">
            <li>Your smile brightens my darkest days.</li>
            <li>Your kind heart inspires me every day.</li>
            <li>Your creativity fills my life with wonder.</li>
            <li>You are my best friend and soulmate.</li>
            <li>You are my favorite part of every day.</li>
            <li>You are short and sweet, but long and deep.</li> 
          </ul>
        </div>
      </Page>

      <Page number="Valentine's Image">
        <div className="text-center">
          <Image
            src="/img/img4.jpeg"
            alt="Romantic Memory"
            width={400}
            height={400}
            loading="lazy"
            className="rounded-lg shadow-lg mb-4 max-h-72 sm:max-h-96 w-full object-cover"
          />
          <p className="text-base sm:text-lg text-gray-700 italic">
            I love you more than anything.
          </p>
        </div>
      </Page>

      <Page number="Forever in My Heart">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600">
            Forever in My Heart
          </h1>
          <hr className="mb-6 w-1/2 border-t-2 border-red-200 mx-auto" />
          <p className="text-base sm:text-lg text-gray-800">
            No matter where life takes us, one thing will never change—my heart will always belong to you.
            You&apos;re my favorite part of every day, my happiest thought, and my forever love. ❤️✨
          </p>
          <Image
            src="/postcard.png"
            alt="Romantic Memory"
            width={400}
            height={400}
            loading="lazy"
            className="rounded-lg shadow-lg mb-4 max-h-72 sm:max-h-96 w-full object-cover mt-8"
          />
        </div>
      </Page>

      {/* Ending Cover Pages */}
      <PageCover>Forever Yours</PageCover>
      <PageCover>.</PageCover>
    </HTMLFlipBook>
  );

  // Mobile Layout: Precisely center using absolute positioning and CSS transform
  if (isMobile) {
    return (
      <div className="relative min-h-screen bg-gradient-to-t from-pink-200 to-pink-100">
        <div className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2">
          <div style={{ perspective: "1500px" }}>{FlipBookContent}</div>
        </div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-lg text-pink-600 font-semibold italic">
          click or hold the pages to flip
        </p>
        <style jsx global>{`
          .page-cover {
            background: url('/card.jpeg');
            background-repeat: repeat-y;
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
            border: 1px solid rgb(247, 136, 136);
            border-right: 1px solid rgb(241, 139, 139);
            border-radius: 2px 12px 12px 4px;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2),
              0 10px 20px rgba(0, 0, 0, 0.3);
          }
  
          .page {
            background: #fcf5e6;
            border: 1px solid #e0d0b8;
            border-radius: 2px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.1);
          }
  
          .page::after {
            background: radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.1) 0%,
              rgba(0, 0, 0, 0.05) 70%,
              transparent 100%
            );
            width: 40px;
          }
  
          /* Additional texture and page styles can remain here */
  
          @media (max-width: 640px) {
            .page-cover {
              background-attachment: scroll;
            }
          }
        `}</style>
      </div>
    );
  }

  // Desktop/Tablet Layout: Standard centered block layout
  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div style={{ perspective: "1500px" }}>{FlipBookContent}</div>
        <p className="text-lg text-gray-600 mt-8 text-center font-semibold italic">
          click or hold the pages to flip
        </p>
      </div>
      <style jsx global>{`
        .page-cover {
          background: url('/card.jpeg');
          background-repeat: repeat-y;
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
          border: 1px solid rgb(247, 136, 136);
          border-right: 1px solid rgb(241, 139, 139);
          border-radius: 2px 12px 12px 4px;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.3);
        }
  
        .page {
          background: #fcf5e6;
          border: 1px solid #e0d0b8;
          border-radius: 2px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05),
            0 4px 8px rgba(0, 0, 0, 0.1);
        }
  
        .page::after {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.05) 70%,
            transparent 100%
          );
          width: 40px;
        }
  
        /* Additional texture and page styles can remain here */
  
        @media (max-width: 640px) {
          .page-cover {
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default LoveBook;
