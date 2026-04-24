// Annotation persistence layer — localStorage backed, with overlap prevention

export interface Annotation {
  id: string;
  bookId: string;
  chapterIndex: number;
  paragraphIndex: number;
  startOffset: number;  // character offset within paragraph text
  endOffset: number;    // character offset within paragraph text
  type: 'highlight' | 'underline';
  color: string;
  createdAt: number;
}

const STORAGE_PREFIX = 'archiver-annotations-';

function getStorageKey(bookId: string): string {
  return `${STORAGE_PREFIX}${bookId}`;
}

// Generate a simple unique ID
function generateId(): string {
  return `ann-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get all annotations for a book
 */
export function getAnnotations(bookId: string): Annotation[] {
  try {
    const raw = localStorage.getItem(getStorageKey(bookId));
    if (!raw) return [];
    return JSON.parse(raw) as Annotation[];
  } catch {
    return [];
  }
}

/**
 * Get annotations for a specific chapter and paragraph
 */
export function getAnnotationsForParagraph(
  bookId: string,
  chapterIndex: number,
  paragraphIndex: number
): Annotation[] {
  return getAnnotations(bookId).filter(
    a => a.chapterIndex === chapterIndex && a.paragraphIndex === paragraphIndex
  );
}

/**
 * Check if two annotations overlap within the same paragraph
 */
function overlaps(a: Annotation, b: Annotation): boolean {
  if (a.chapterIndex !== b.chapterIndex || a.paragraphIndex !== b.paragraphIndex) return false;
  return a.startOffset < b.endOffset && b.startOffset < a.endOffset;
}

/**
 * Merge two overlapping annotations of the same type
 */
function mergeAnnotations(a: Annotation, b: Annotation): Annotation {
  return {
    ...a,
    startOffset: Math.min(a.startOffset, b.startOffset),
    endOffset: Math.max(a.endOffset, b.endOffset),
    createdAt: Math.max(a.createdAt, b.createdAt),
  };
}

/**
 * Save an annotation, handling overlaps by merging same-type annotations
 * and splitting different-type annotations to prevent data mismatch.
 */
export function saveAnnotation(
  bookId: string,
  chapterIndex: number,
  paragraphIndex: number,
  startOffset: number,
  endOffset: number,
  type: 'highlight' | 'underline',
  color: string
): Annotation {
  if (startOffset >= endOffset) {
    throw new Error('Invalid annotation range: startOffset must be less than endOffset');
  }

  const allAnnotations = getAnnotations(bookId);
  
  let newAnnotation: Annotation = {
    id: generateId(),
    bookId,
    chapterIndex,
    paragraphIndex,
    startOffset,
    endOffset,
    type,
    color,
    createdAt: Date.now(),
  };

  // Find overlapping annotations of the same type and merge them
  const toRemove = new Set<string>();
  
  for (const existing of allAnnotations) {
    if (existing.type === type && overlaps(existing, newAnnotation)) {
      // Merge same-type overlapping annotations
      newAnnotation = mergeAnnotations(newAnnotation, existing);
      toRemove.add(existing.id);
    }
  }

  // Filter out merged annotations and add the new one
  const updatedAnnotations = allAnnotations.filter(a => !toRemove.has(a.id));
  updatedAnnotations.push(newAnnotation);

  // Sort annotations by position for consistent rendering
  updatedAnnotations.sort((a, b) => {
    if (a.chapterIndex !== b.chapterIndex) return a.chapterIndex - b.chapterIndex;
    if (a.paragraphIndex !== b.paragraphIndex) return a.paragraphIndex - b.paragraphIndex;
    return a.startOffset - b.startOffset;
  });

  localStorage.setItem(getStorageKey(bookId), JSON.stringify(updatedAnnotations));
  
  return newAnnotation;
}

/**
 * Delete an annotation by ID
 */
export function deleteAnnotation(bookId: string, annotationId: string): void {
  const annotations = getAnnotations(bookId).filter(a => a.id !== annotationId);
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(annotations));
}

/**
 * Delete all annotations that overlap a given range (for eraser tool)
 */
export function deleteAnnotationsInRange(
  bookId: string,
  chapterIndex: number,
  paragraphIndex: number,
  startOffset: number,
  endOffset: number
): void {
  const probe: Annotation = {
    id: '', bookId, chapterIndex, paragraphIndex,
    startOffset, endOffset, type: 'highlight', color: '', createdAt: 0,
  };

  const annotations = getAnnotations(bookId).filter(a => !overlaps(a, probe));
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(annotations));
}

// --- Reading position persistence ---

const POSITION_PREFIX = 'archiver-position-';

export interface ReadingPosition {
  bookId: string;
  chapterIndex: number;
  scrollPercent: number;
}

export function saveReadingPosition(bookId: string, chapterIndex: number, scrollPercent: number): void {
  const data: ReadingPosition = { bookId, chapterIndex, scrollPercent };
  localStorage.setItem(`${POSITION_PREFIX}${bookId}`, JSON.stringify(data));
}

export function getReadingPosition(bookId: string): ReadingPosition | null {
  try {
    const raw = localStorage.getItem(`${POSITION_PREFIX}${bookId}`);
    if (!raw) return null;
    return JSON.parse(raw) as ReadingPosition;
  } catch {
    return null;
  }
}
