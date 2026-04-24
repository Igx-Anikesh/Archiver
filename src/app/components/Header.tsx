import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onBack?: () => void;
  activeBookTitle?: string;
  activeBookAuthor?: string;
  isReading?: boolean;
}

export default function Header({ onBack, activeBookTitle, activeBookAuthor, isReading }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isThemeDark, setIsThemeDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour12: false });
  // Custom format to match "SAT 25 APR"
  const dateStr = time.toLocaleDateString('en-GB', { 
    weekday: 'short', day: '2-digit', month: 'short' 
  }).toUpperCase().replace(',', '');

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between p-8">
      
      {/* Top Navbar Area */}
      <header className="w-full flex justify-between items-center text-white">
        
        {/* Left side: Back Arrow & Genre */}
        <div 
          onClick={onBack}
          className={`flex items-center gap-3 pointer-events-auto cursor-pointer hover:opacity-70 transition-opacity ${
            isReading ? 'text-[#6b5d4d]' : 'text-white'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold tracking-widest uppercase">
            {isReading ? 'BACK' : (activeBookTitle ? `${activeBookTitle} BY ${activeBookAuthor || 'AUTHOR'}` : "SCI-FI NOIR")}
          </span>
        </div>

        {/* Right side: Store & Time Pill */}
        <div className="flex items-center gap-6 pointer-events-auto group">
          {/* STORE link */}
          {!activeBookTitle && (
            <div className="flex items-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-bold tracking-widest uppercase">STORE</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5l13.732-13.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          {/* Time & Theme Pill (Exact Match) */}
          <div className="flex items-center bg-[#e5e5e5] rounded-full p-1.5 pl-1.5 pr-5 text-[#1a1a1a] shadow-sm pointer-events-auto">
            {/* Toggle Button (Circle) */}
            <button 
              onClick={() => setIsThemeDark(!isThemeDark)}
              className="w-9 h-9 bg-black/10 rounded-full flex items-center justify-center relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isThemeDark ? 'dark' : 'light'}
                  initial={{ y: 20, rotate: -90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -20, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isThemeDark ? (
                    <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#1a1a1a]"></div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="5" fill="#1a1a1a" />
                      <path d="M12 2v2m0 16v2M4.929 4.929l1.414 1.414m11.314 11.314l1.414 1.414M2 12h2m16 0h2M4.929 19.071l1.414-1.414m11.314-11.314l1.414-1.414" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Time display */}
            <div className="flex flex-col items-start ml-4">
              <span className="text-[13px] leading-tight font-mono tracking-widest font-medium text-[#1a1a1a]">
                {timeStr}
              </span>
              <span className="text-[10px] leading-tight font-sans tracking-widest font-medium mt-[2px] text-[#1a1a1a]">
                {dateStr}
              </span>
            </div>
          </div>
        </div>

      </header>

      {/* Bottom Corner Controls */}
      {!activeBookTitle && (
        <div className="w-full flex justify-end">
          <div className="flex items-center gap-8 pointer-events-auto bg-[#e5e5e5] px-6 py-3.5 rounded-full text-[#1a1a1a] shadow-sm">
            
            {/* Sorted By */}
            <div className="flex items-center gap-2 cursor-pointer group/sort">
              <span className="text-[#1a1a1a]/50 text-[10px] uppercase tracking-widest font-semibold">Sort:</span>
              <span className="text-xs font-bold tracking-wide">LATEST</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a] ml-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="w-px h-4 bg-[#1a1a1a]/20"></div>

            {/* Filter Option */}
            <button className="flex items-center gap-2 group/filter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a]" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">FILTER</span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
