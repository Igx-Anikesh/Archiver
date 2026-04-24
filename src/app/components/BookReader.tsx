import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { getChaptersByBookId, type BookChapter } from '../data/bookContent';
import {
  getAnnotations,
  getAnnotationsForParagraph,
  saveAnnotation,
  deleteAnnotationsInRange,
  saveReadingPosition,
  getReadingPosition,
  type Annotation,
} from '../data/annotationStore';
import AnnotatedText from './AnnotatedText';
import ReaderToolbar, { type ToolType } from './ReaderToolbar';

interface BookReaderProps {
  bookId: string;
}

export default function BookReader({ bookId }: BookReaderProps) {
  // All chapters for the book
  const allChapters = useMemo(() => getChaptersByBookId(bookId), [bookId]);

  // Annotations (re-read whenever we mutate)
  const [annotations, setAnnotations] = useState<Annotation[]>(() => getAnnotations(bookId));
  const refreshAnnotations = useCallback(() => {
    setAnnotations(getAnnotations(bookId));
  }, [bookId]);

  // Tool state
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [fontSize, setFontSize] = useState(18);
  const [isSerif, setIsSerif] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  // Scroll container ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Restore reading position ---
  useEffect(() => {
    const pos = getReadingPosition(bookId);
    if (pos && scrollRef.current) {
      // Wait for content to render, then scroll
      requestAnimationFrame(() => {
        if (!scrollRef.current) return;
        const chapterEl = document.getElementById(`chapter-${pos.chapterIndex}`);
        if (chapterEl) {
          chapterEl.scrollIntoView({ behavior: 'instant' });
        }
      });
    }
  }, [bookId]);

  // --- Save reading position on scroll ---
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout: number;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (!container) return;
        const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
        
        // Determine which chapter is currently visible
        let visibleChapter = 0;
        for (let i = 0; i < allChapters.length; i++) {
          const el = document.getElementById(`chapter-${i}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              visibleChapter = i;
            }
          }
        }

        saveReadingPosition(bookId, visibleChapter, scrollPercent);
      }, 500);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [bookId, allChapters]);

  // --- Annotation handlers ---
  const handleAnnotate = useCallback(
    (chapterIndex: number, paragraphIndex: number, startOffset: number, endOffset: number) => {
      if (!activeTool || activeTool === 'eraser') return;

      const type = activeTool === 'pencil' ? 'underline' : 'highlight';
      const color =
        type === 'highlight' ? 'rgba(201, 169, 110, 0.35)' : '#8b7355';

      saveAnnotation(bookId, chapterIndex, paragraphIndex, startOffset, endOffset, type, color);
      refreshAnnotations();
    },
    [bookId, activeTool, refreshAnnotations]
  );

  const handleErase = useCallback(
    (chapterIndex: number, paragraphIndex: number, startOffset: number, endOffset: number) => {
      deleteAnnotationsInRange(bookId, chapterIndex, paragraphIndex, startOffset, endOffset);
      refreshAnnotations();
    },
    [bookId, refreshAnnotations]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full relative"
    >
      {/* Reading surface */}
      <div
        ref={scrollRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: '#f5f0e8' }}
      >
        {/* Top fade gradient */}
        <div
          className="fixed top-0 left-0 right-0 h-24 z-[55] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #f5f0e8 0%, #f5f0e8 30%, transparent 100%)',
          }}
        />

        {/* Bottom fade gradient */}
        <div
          className="fixed bottom-0 left-0 right-0 h-28 z-[55] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #f5f0e8 0%, #f5f0e8 30%, transparent 100%)',
          }}
        />

        {/* Content area */}
        <div
          className="max-w-2xl mx-auto px-8 py-32"
          style={{
            fontFamily: isSerif ? 'Georgia, "Times New Roman", serif' : 'Inter, system-ui, sans-serif',
            fontSize: `${fontSize}px`,
          }}
        >
          {allChapters.map((chapter, chapterIdx) => (
            <ChapterBlock
              key={chapter.id}
              chapter={chapter}
              chapterIndex={chapterIdx}
              annotations={annotations}
              showAnnotations={showAnnotations}
              activeTool={activeTool}
              onAnnotate={handleAnnotate}
              onErase={handleErase}
              isLastChapter={chapterIdx === allChapters.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Bottom toolbar */}
      <ReaderToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isSerif={isSerif}
        onToggleFont={() => setIsSerif(!isSerif)}
        showAnnotations={showAnnotations}
        onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
      />

      {/* Bottom left reading indicator */}
      <div className="fixed bottom-9 left-8 z-[60] pointer-events-none">
        <span
          className="text-xs tracking-widest uppercase font-mono"
          style={{ color: '#a89880' }}
        >
          Reading: {allChapters[0]?.title || 'Book'}
        </span>
      </div>
    </motion.div>
  );
}

// --- Chapter Block ---

interface ChapterBlockProps {
  chapter: BookChapter;
  chapterIndex: number;
  annotations: Annotation[];
  showAnnotations: boolean;
  activeTool: ToolType;
  onAnnotate: (chapterIndex: number, paragraphIndex: number, start: number, end: number) => void;
  onErase: (chapterIndex: number, paragraphIndex: number, start: number, end: number) => void;
  isLastChapter: boolean;
}

function ChapterBlock({
  chapter,
  chapterIndex,
  annotations,
  showAnnotations,
  activeTool,
  onAnnotate,
  onErase,
  isLastChapter,
}: ChapterBlockProps) {
  const chapterAnnotations = useMemo(
    () => annotations.filter(a => a.chapterIndex === chapterIndex),
    [annotations, chapterIndex]
  );

  return (
    <div id={`chapter-${chapterIndex}`} className="mb-20">
      {/* Chapter opener — italic, lighter */}
      <p
        className="italic mb-10 leading-[2]"
        style={{ color: '#a89880' }}
      >
        {chapter.opener}
      </p>

      {/* Paragraphs */}
      {chapter.paragraphs.map((para, pIdx) => {
        const paraAnnotations = chapterAnnotations.filter(
          a => a.paragraphIndex === pIdx
        );

        const hasAnnotation = paraAnnotations.length > 0 && showAnnotations;

        return (
          <div
            key={`${chapter.id}-p-${pIdx}`}
            className="mb-8 relative"
            style={{
              paddingLeft: hasAnnotation ? '20px' : '0',
              borderLeft: hasAnnotation ? '3px solid rgba(201, 169, 110, 0.5)' : 'none',
              transition: 'padding-left 0.3s ease, border-left 0.3s ease',
            }}
          >
            <AnnotatedText
              text={para}
              annotations={paraAnnotations}
              showAnnotations={showAnnotations}
              activeTool={activeTool}
              onAnnotate={(start, end) => onAnnotate(chapterIndex, pIdx, start, end)}
              onErase={(start, end) => onErase(chapterIndex, pIdx, start, end)}
            />
          </div>
        );
      })}

      {/* Chapter divider */}
      {!isLastChapter && (
        <div className="flex items-center justify-center my-16">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4b8a5]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4b8a5]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4b8a5]"></div>
          </div>
        </div>
      )}
    </div>
  );
}
