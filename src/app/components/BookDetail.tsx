import React from 'react';
import { motion } from 'motion/react';
import { BOOKS } from './Bookshelf';

interface BookDetailProps {
  bookId: string;
  onStartReading?: () => void;
}

export default function BookDetail({ bookId, onStartReading }: BookDetailProps) {
  const book = BOOKS.find(b => b.id === bookId);

  if (!book) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#0f0f0f] flex items-center justify-center pt-24 px-12 font-sans"
    >
      <div className="max-w-6xl w-full flex gap-16 h-[80vh]">
        {/* Book Cover Image */}
        <motion.div 
          layoutId={`book-image-${book.id}`}
          className="w-1/2 h-full rounded-2xl overflow-hidden relative"
        >
          <img 
            src={book.image} 
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Book Info */}
        <div className="w-1/2 flex flex-col justify-center text-white">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold tracking-wider mb-4"
          >
            {book.title}
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-xl tracking-widest uppercase mb-12"
          >
            {book.year}
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 leading-relaxed max-w-xl mb-12"
          >
            A deeper look into the conceptual design and aesthetics of {book.title}. 
            This piece represents a pivotal moment in our creative journey during the {book.year} era.
          </motion.p>

          {/* Start Reading Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onStartReading}
            className="self-start px-10 py-4 bg-[#e5e5e5] text-[#1a1a1a] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-lg"
          >
            START READING
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
