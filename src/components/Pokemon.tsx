import React, { useState, useRef } from "react";

interface Heart {
  id: string;
  left: number; // percentage for left position
  icon: string;
}

  // Generate an array of 50 love reasons starting from 1.
  const LoveReasons: React.FC = () => {
    // 50 Pokémon-inspired love reasons.
    const reasons: string[] = [
      "1. Your smile is more electrifying than Pikachu's Thunderbolt.",
      "2. You bring warmth like a Charizard's blazing flame.",
      "3. Your laughter is as charming as Jigglypuff’s lullaby.",
      "4. Your kindness shines brighter than a rare shiny Pokémon.",
      "5. You are as precious as a legendary catch.",
      "6. Your love packs a punch like Machamp’s embrace.",
      "7. Your spirit is as free as a wild Rapidash galloping.",
      "8. You inspire me like Ash inspires his Pokémon team.",
      "9. Every day with you is an epic adventure through Hoenn.",
      "10. Your eyes sparkle like a Clefairy’s twinkle.",
      "11. Your hugs are as comforting as a Snorlax’s nap.",
      "12. Your heart is pure, just like Bulbasaur’s nature.",
      "13. You light up my life like Flareon’s radiant blaze.",
      "14. Your smile outshines even Solgaleo’s brilliance.",
      "15. You’re the Ace in my Pokéball – my number one catch!",
      "16. Your love is rarer than a shiny Pokémon encounter.",
      "17. Your laugh heals me like a Chansey’s care.",
      "18. You’re more captivating than any Pokéball’s charm.",
      "19. Your adventurous spirit makes every journey memorable.",
      "20. You move with grace, just like a nimble Gardevoir.",
      "21. Your warmth melts my heart like a Sunflora in bloom.",
      "22. Your energy sparks joy like an Electrode’s burst.",
      "23. Your beauty rivals the elegance of a Nidoqueen.",
      "24. You bring hope like the first light in Pallet Town.",
      "25. Your presence feels like a cozy stop at a PokéCenter.",
      "26. You’re as playful as a mischievous Psyduck.",
      "27. Your charm is as magical as meeting a Mew.",
      "28. You’re as loyal as a devoted Growlithe.",
      "29. Your enthusiasm is contagious, like a dancing Pokémon.",
      "30. Every challenge is fun with you by my side.",
      "31. Your optimism shines like a Lanturn’s glow.",
      "32. You color my world like a vibrant Vulpix.",
      "33. Your wisdom is deep like that of an ancient Pokémon.",
      "34. You’re the hero of my journey—my very own Trainer.",
      "35. Your laughter echoes like a wild Pidgeotto’s call.",
      "36. You’re unforgettable, just like a first legendary sighting.",
      "37. Your determination races like a swift Rapidash.",
      "38. You’re my most treasured catch, beyond any card’s value.",
      "39. Your love is the perfect move in my battle of life.",
      "40. With you, trust is as solid as any well-trained Pokémon.",
      "41. Your spirit sparkles like a star in the Pokémon sky.",
      "42. You’re enchanting—like wandering in a forest of myths.",
      "43. Every moment with you turns ordinary days epic.",
      "44. You combine the sweetness of Cleffa with the strength of Machop.",
      "45. Your smile guides me like a lighthouse in a storm.",
      "46. You make my heart race like a fast-paced Pokémon League battle.",
      "47. Your kindness is a healing potion for my soul.",
      "48. You’re as mesmerizing as a legendary dance under the moon.",
      "49. Your love lifts me higher than any soaring Pokémon.",
      "50. With you, every moment is a legendary adventure."
    ];

  // List of 50 cute Pokémon IDs.
  const cutePokemonIds: number[] = [
    25, 133, 39, 35, 175, 172, 174, 113, 183, 298,
    209, 216, 333, 300, 311, 312, 417, 427, 447, 702,
    778, 869, 872, 870, 755, 546, 742, 743, 664, 665,
    666, 777, 572, 573, 684, 685, 682, 683, 669, 670,
    671, 238, 239, 240, 173, 595, 617, 280, 52, 370
  ];

  // Generate an array of official artwork URLs for the cute Pokémon.
  const pokemonImages: string[] = cutePokemonIds.map(
    (id) =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  );

  // State variables.
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flip, setFlip] = useState<boolean>(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  // We pair each reason with the Pokémon image of the same index.
  const [currentPokemon, setCurrentPokemon] = useState<string>(pokemonImages[0]);
  const [pokemonAnimation, setPokemonAnimation] = useState<string>("animate-bounce");

  // Ref for the chime sound.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Adds a set of floating hearts.
  const addHearts = () => {
    const icons = ["❤️", "💖", "💕", "💘", "✨"];
    const newHearts: Heart[] = Array.from({ length: 5 }, () => ({
      id: Math.random().toString(36).substring(2, 9),
      left: Math.random() * 80 + 10, // positions between 10% and 90%
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));
    setHearts(newHearts);
    // Clear hearts after 2 seconds.
    setTimeout(() => setHearts([]), 2000);
  };

  // Trigger the transition to the next reason when the "Next" button is clicked.
  const triggerNext = () => {
    setFlip(true);
    addHearts();

    // Wait for the flip animation to finish (1 second).
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % reasons.length;
      setCurrentIndex(nextIndex);
      setCurrentPokemon(pokemonImages[nextIndex]);
      // Choose a random cute animation for the Pokémon.
      const animations = ["animate-bounce", "animate-pulse", "wink-animation"];
      const randomAnim = animations[Math.floor(Math.random() * animations.length)];
      setPokemonAnimation(randomAnim);
      setFlip(false);
      // Play the chime sound on next.
      if (audioRef.current) {
        audioRef.current.play().catch((err) =>
          console.error("Audio playback error:", err)
        );
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-rose-100 to-blue-50 relative overflow-hidden p-4 pt-20 md:pt-4">
        <h2 className="text-4xl font-great-vibes text-deep-red text-center mb-12 drop-shadow-lg">
        50 Reasons Why I Love You
      </h2>
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-heart"
          style={{ left: `${heart.left}%`, bottom: "10%" }}
        >
          {heart.icon}
        </div>
      ))}

      {/* Card with Pokémon and love reason */}
      <div
        className={` bg-opacity-90 backdrop-filter backdrop-blur-lg p-10 flex flex-col items-center transform transition-transform duration-700 ${
          flip ? "flip-animation" : ""
        }`}
      >
        <img
          src={currentPokemon}
          alt="Cute Pokémon"
          className={`w-48 h-48 ${pokemonAnimation} mb-6`}
        />
        <p className="text-center text-3xl font-dancing-script tracking-wide text-pink-600 leading-relaxed">
          {reasons[currentIndex]}
        </p>
      </div>

      {/* Manual "Next" button */}
      <button
        onClick={triggerNext}
        className="mt-8 px-8 py-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 focus:outline-none transition duration-300 text-lg font-semibold"
      >
        Next
      </button>

      {/* Audio element with a fallback message */}
      <audio ref={audioRef} preload="auto">
        <source src="/chime.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        .flip-animation {
          animation: flip 1s ease-in-out;
        }
        @keyframes floatHeart {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        .animate-heart {
          animation: floatHeart 2s ease-in forwards;
        }
        @keyframes wink {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.9);
          }
        }
        .wink-animation {
          animation: wink 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoveReasons;
