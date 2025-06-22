"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Define a type for the HTMLFlipBook component's ref to get better autocompletion
// This type is based on the common structure of react-pageflip's API
interface FlipBookRefMethods {
  pageFlip(): {
    prev(): void;
    next(): void;
    // Add other methods you might need, like turnToPage, getPageCount, etc.
    // For example: turnToPage(page: number): void;
    // getPageCount(): number;
    // getPageDensity(): 'hard' | 'soft';
    // getCurrentPageIndex(): number;
  } | undefined; // pageFlip() might return undefined if not ready
}


export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  // Use the defined interface for better type safety
  const flipBookRef = useRef<FlipBookRefMethods | null>(null);

  // Callback for when the document loads successfully
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  // Function to go to the previous page
  const goToPrevPage = useCallback(() => {
    if (flipBookRef.current) {
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (pageFlipInstance) { // Ensure pageFlipInstance is not undefined
        pageFlipInstance.prev();
      }
    }
  }, []);

  // Function to go to the next page
  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (pageFlipInstance) { // Ensure pageFlipInstance is not undefined
        pageFlipInstance.next();
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages && (
          <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-4"
              aria-label="Previous Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flip Book Container */}
            <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
              <HTMLFlipBook
                width={350}
                height={500}
                showCover={true}
                className="flip-book"
                size="fixed"
                minWidth={200}
                maxWidth={600}
                minHeight={300}
                maxHeight={800}
                drawShadow={true}
                flippingTime={600}
                useMouseEvents={true}
                usePortrait={false}
                autoSize={true}
                clickEventForward={true}
                mobileScrollSupport={true}
                maxShadowOpacity={0}
                swipeDistance={0}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{ margin: '0 auto' }}
                startPage={0}
                startZIndex={1}
                ref={flipBookRef} 
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={index}
                    className="page-wrapper"
                    style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Page
                      pageNumber={index + 1}
                      width={350}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      className="pdf-page"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-4"
              aria-label="Next Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </Document>
    </div>
  );
}