import React, { useRef, useCallback } from 'react';
import type { Annotation } from '../data/annotationStore';

interface AnnotatedTextProps {
  text: string;
  annotations: Annotation[];
  showAnnotations: boolean;
  activeTool: 'pencil' | 'highlighter' | 'eraser' | null;
  onAnnotate?: (startOffset: number, endOffset: number) => void;
  onErase?: (startOffset: number, endOffset: number) => void;
  paragraphRef?: React.RefObject<HTMLParagraphElement | null>;
}

interface TextSegment {
  text: string;
  startOffset: number;
  annotations: Annotation[];
}

/**
 * Splits a paragraph's text into segments based on annotation boundaries.
 * Each segment has the same set of overlapping annotations.
 */
function splitIntoSegments(text: string, annotations: Annotation[]): TextSegment[] {
  if (annotations.length === 0) {
    return [{ text, startOffset: 0, annotations: [] }];
  }

  // Collect all boundary points
  const boundaries = new Set<number>();
  boundaries.add(0);
  boundaries.add(text.length);

  for (const ann of annotations) {
    boundaries.add(Math.max(0, ann.startOffset));
    boundaries.add(Math.min(text.length, ann.endOffset));
  }

  const sortedBoundaries = Array.from(boundaries).sort((a, b) => a - b);

  const segments: TextSegment[] = [];
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    const start = sortedBoundaries[i];
    const end = sortedBoundaries[i + 1];
    if (start >= end) continue;

    const activeAnnotations = annotations.filter(
      a => a.startOffset <= start && a.endOffset >= end
    );

    segments.push({
      text: text.substring(start, end),
      startOffset: start,
      annotations: activeAnnotations,
    });
  }

  return segments;
}

function getSegmentStyle(annotations: Annotation[], showAnnotations: boolean): React.CSSProperties {
  if (!showAnnotations || annotations.length === 0) return {};

  const style: React.CSSProperties = {};

  for (const ann of annotations) {
    if (ann.type === 'highlight') {
      style.backgroundColor = ann.color || 'rgba(201, 169, 110, 0.35)';
      style.borderRadius = '2px';
      style.padding = '1px 0';
    } else if (ann.type === 'underline') {
      style.textDecoration = 'underline';
      style.textDecorationColor = ann.color || '#8b7355';
      style.textDecorationThickness = '2px';
      style.textUnderlineOffset = '3px';
    }
  }

  return style;
}

export default function AnnotatedText({
  text,
  annotations,
  showAnnotations,
  activeTool,
  onAnnotate,
  onErase,
  paragraphRef,
}: AnnotatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const ref = paragraphRef || containerRef;

  const handleMouseUp = useCallback(() => {
    if (!activeTool || activeTool === 'eraser') return;
    
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !ref.current) return;

    const range = selection.getRangeAt(0);
    
    // Calculate character offsets relative to the paragraph container
    const containerNode = ref.current;
    
    // Walk through text nodes to compute offsets
    const walker = document.createTreeWalker(containerNode, NodeFilter.SHOW_TEXT);
    let charCount = 0;
    let startOffset = -1;
    let endOffset = -1;

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const nodeLength = node.textContent?.length || 0;

      // Check if the start of the range is in this node
      if (range.startContainer === node) {
        startOffset = charCount + range.startOffset;
      }
      // Check if the end of the range is in this node
      if (range.endContainer === node) {
        endOffset = charCount + range.endOffset;
      }

      charCount += nodeLength;
    }

    if (startOffset >= 0 && endOffset > startOffset) {
      onAnnotate?.(startOffset, endOffset);
      selection.removeAllRanges();
    }
  }, [activeTool, onAnnotate, ref]);

  const handleClick = useCallback(
    (segmentAnnotations: Annotation[]) => {
      if (activeTool !== 'eraser' || segmentAnnotations.length === 0) return;
      // Erase annotations covering this segment
      for (const ann of segmentAnnotations) {
        onErase?.(ann.startOffset, ann.endOffset);
      }
    },
    [activeTool, onErase]
  );

  const segments = splitIntoSegments(text, annotations);

  return (
    <p
      ref={ref}
      onMouseUp={handleMouseUp}
      className="leading-[1.95] text-[#3d3229] select-text"
      style={{
        cursor: activeTool ? (activeTool === 'eraser' ? 'cell' : 'text') : 'default',
      }}
    >
      {segments.map((segment, i) => {
        const style = getSegmentStyle(segment.annotations, showAnnotations);
        const hasAnnotation = showAnnotations && segment.annotations.length > 0;

        return (
          <span
            key={`${segment.startOffset}-${i}`}
            style={style}
            onClick={hasAnnotation ? () => handleClick(segment.annotations) : undefined}
            className={hasAnnotation && activeTool === 'eraser' ? 'cursor-cell hover:opacity-50 transition-opacity' : ''}
          >
            {segment.text}
          </span>
        );
      })}
    </p>
  );
}
