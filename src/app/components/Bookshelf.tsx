import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const BOOK_TITLES = [
  "Velvet Dreams Studio",
  "Neon Pulse ® Agency",
  "Midnight Canvas",
  "Echo Digital Lab",
  "Skiper Creative ® Co",
  "Cosmic Brew Studios",
  "Horizon Typography",
  "Waves & ® Motion",
  "Stellar Workshop",
  "Prism ® Media House",
  "Aurora Design Co ™",
  "Flux Interactive",
  "Ember Creative Lab ™",
  "Zenith Brand Studio",
  "Quantum Visual Arts",
  "Aether Dynamics",
  "Lumina Creative",
  "Vortex Design Labs",
  "Oasis Digital",
  "Nova Brand Studio"
];

const BOOKS = BOOK_TITLES.map((title, index) => ({
  id: `book-${index}`,
  title,
  year: `202${Math.floor(index / 5)}—202${Math.floor(index / 5) + 1}`,
  // Generate a distinct image for each by adding index to the seed
  image: `https://images.unsplash.com/photo-${1550000000000 + index * 10000}?q=80&w=800&auto=format&fit=crop&blur=0` 
}));

// Overriding some specific images to ensure they look good (abstract/artistic)
BOOKS[0].image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
BOOKS[1].image = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop";
BOOKS[2].image = "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop";
BOOKS[14].image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"; // portrait for quantum visual arts

// Sort books alphabetically by title as requested
BOOKS.sort((a, b) => a.title.localeCompare(b.title));

export default function Bookshelf() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(14); // Default to Quantum Visual Arts expanded
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hijack vertical scroll to scroll horizontally
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        // Reversing scroll logic as requested:
        // scroll down (deltaY > 0) -> scroll right (+x axis)
        // scroll up (deltaY < 0) -> scroll left (-x axis)
        container.scrollLeft += e.deltaY * 1.5; // multiplier for slightly faster scroll
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] flex items-center justify-center overflow-hidden font-sans">
      <div 
        ref={scrollContainerRef}
        className="w-full h-screen overflow-x-auto overflow-y-hidden no-scrollbar flex"
      >
        <div className="flex h-full min-w-max border-l border-white/20">
          {BOOKS.map((book, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={book.id}
                onHoverStart={() => setHoveredIndex(index)}
                layout
                initial={false}
                animate={{
                  width: isHovered ? 526 : 65,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8
                }}
                className="relative h-full overflow-hidden cursor-pointer group flex border-r border-white/20 shrink-0 bg-[#0f0f0f]"
              >
                {/* Text Spine Column */}
                <div className="w-[65px] h-full shrink-0 flex flex-col justify-between items-center py-8 z-10 bg-[#0f0f0f]">
                  {/* Year (only visible when hovered to match the exact image style) */}
                  <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center h-24"
                  >
                    <span 
                      className="text-white font-semibold text-sm transform -rotate-180 whitespace-nowrap tracking-wider" 
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {book.year}
                    </span>
                  </motion.div>
                  
                  {/* Vertical Spine Title */}
                  <div className="flex-1 flex items-end justify-center pb-4">
                    <span 
                      className={`transform -rotate-180 whitespace-nowrap transition-colors duration-300 text-lg tracking-wide ${
                        isHovered ? 'text-white font-medium' : 'text-[#666] font-normal'
                      }`}
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {book.title}
                    </span>
                  </div>
                </div>

                {/* The Image (revealed when expanded) */}
                <div className="h-full flex-1 relative min-w-[466px] p-4 pl-0">
                  <motion.div 
                    className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
