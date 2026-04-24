import React from 'react';
import { motion } from 'motion/react';

export type ToolType = 'pencil' | 'highlighter' | 'eraser' | null;

interface ReaderToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isSerif: boolean;
  onToggleFont: () => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
}

const FONT_SIZES = [16, 18, 20, 22];

export default function ReaderToolbar({
  activeTool,
  onToolChange,
  fontSize,
  onFontSizeChange,
  isSerif,
  onToggleFont,
  showAnnotations,
  onToggleAnnotations,
}: ReaderToolbarProps) {

  const cycleFontSize = () => {
    const currentIndex = FONT_SIZES.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % FONT_SIZES.length;
    onFontSizeChange(FONT_SIZES[nextIndex]);
  };

  const toggleTool = (tool: ToolType) => {
    onToolChange(activeTool === tool ? null : tool);
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
    >
      <div className="flex items-center gap-1 bg-[#e8e0d4] rounded-full px-3 py-2.5 shadow-lg shadow-black/10 border border-[#d4c9b8]">
        
        {/* Pencil — Underline Tool */}
        <ToolButton
          active={activeTool === 'pencil'}
          onClick={() => toggleTool('pencil')}
          title="Underline"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToolButton>

        {/* Highlighter Tool */}
        <ToolButton
          active={activeTool === 'highlighter'}
          onClick={() => toggleTool('highlighter')}
          title="Highlight"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.121 2.121 0 00-3-3L5 17v3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </ToolButton>

        {/* Eraser Tool */}
        <ToolButton
          active={activeTool === 'eraser'}
          onClick={() => toggleTool('eraser')}
          title="Eraser"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20H7.5l-4.21-4.3a1 1 0 010-1.41L15 2.7a1 1 0 011.41 0l5.3 5.3a1 1 0 010 1.41L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToolButton>

        <Divider />

        {/* Settings Gear */}
        <ToolButton active={false} onClick={() => {}} title="Settings">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToolButton>

        {/* Font Size */}
        <ToolButton active={false} onClick={cycleFontSize} title="Font Size">
          <span className="text-xs font-bold tabular-nums" style={{ fontFamily: 'Georgia, serif' }}>
            {fontSize}
          </span>
        </ToolButton>

        {/* Font Family Toggle */}
        <ToolButton active={!isSerif} onClick={onToggleFont} title="Toggle Font">
          <span className="text-sm font-bold" style={{ fontFamily: isSerif ? 'Georgia, serif' : 'Inter, sans-serif' }}>
            T
          </span>
        </ToolButton>

        <Divider />

        {/* Visibility Toggle */}
        <ToolButton active={!showAnnotations} onClick={onToggleAnnotations} title="Toggle Annotations">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {showAnnotations ? (
              <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </>
            ) : (
              <>
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
          </svg>
        </ToolButton>

      </div>
    </motion.div>
  );
}

// --- Sub-components ---

function ToolButton({ 
  active, onClick, children, title 
}: { 
  active: boolean; onClick: () => void; children: React.ReactNode; title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
        ${active 
          ? 'bg-[#3d3229] text-[#f5f0e8] shadow-inner' 
          : 'text-[#6b5d4d] hover:bg-[#d4c9b8] hover:text-[#3d3229]'
        }
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-[#c4b8a5] mx-1"></div>;
}
