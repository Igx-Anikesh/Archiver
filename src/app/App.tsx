import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Bookshelf, { BOOKS } from './components/Bookshelf';
import Header from './components/Header';
import BookDetail from './components/BookDetail';
import BookReader from './components/BookReader';

type ViewState = 'shelf' | 'detail' | 'reading';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('shelf');

  const activeBook = selectedBookId ? BOOKS.find(b => b.id === selectedBookId) : null;

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setView('detail');
  };

  const handleStartReading = () => {
    setView('reading');
  };

  const handleBack = () => {
    if (view === 'reading') {
      setView('detail');
    } else {
      setSelectedBookId(null);
      setView('shelf');
    }
  };

  // Hide header controls in reading mode
  const isReading = view === 'reading';

  return (
    <div className="w-screen h-screen bg-neutral-950 relative overflow-hidden">
      <Header 
        onBack={handleBack} 
        activeBookTitle={view !== 'shelf' ? activeBook?.title : undefined}
        activeBookAuthor={view !== 'shelf' ? 'STUDIO' : undefined}
        isReading={isReading}
      />
      
      <AnimatePresence mode="wait">
        {view === 'reading' && selectedBookId ? (
          <BookReader key="reader" bookId={selectedBookId} />
        ) : view === 'detail' && selectedBookId ? (
          <BookDetail 
            key="detail" 
            bookId={selectedBookId} 
            onStartReading={handleStartReading} 
          />
        ) : (
          <Bookshelf key="shelf" onSelectBook={handleSelectBook} />
        )}
      </AnimatePresence>
    </div>
  );
}