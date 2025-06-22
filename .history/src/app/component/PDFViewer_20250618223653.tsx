```tsx
"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(0); // 0-based for HTMLFlipBook
  const flipBookRef = useRef<any>(null); // Ref for HTMLFlipBook

  // Calculate responsive page width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.85; // Default: 85% to fit buttons

      // Small screens (≤640px, Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.85; // 85% for small screens
      }
      // Medium screens (640px–1024px)
      else if (windowWidth <= 1024) {
        newWidth = windowWidth * 0.8; // 80% for tablets
      }
      // Large screens (>1024px)
      else {
        newWidth = Math.min(windowWidth * 0.7, 720); // 70%, max 720px
      }

      // Ensure minimum width for readability
      newWidth = Math.max(newWidth, 180);

      setPageWidth(Math.round(newWidth));

      // Debugging: Log width
      console.log(`Window Width: ${windowWidth}, Page Width: ${newWidth}`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync currentPage with flipbook
  const handlePageChange = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 0 && flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages - 1 && flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-2 box-border">
      <div className="w-full max-w-[720px] flex items-center justify-between gap-1 sm:gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className={`p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 ${
            currentPage === 0 ? "pointer-events-none" : ""
          }`}
          aria-label="Previous Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="page-wrapper w-full" style={{ overflow: "hidden" }}>
          <Document
            file="/chhunlin.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => console.error("PDF Load Error:", error)}
          >
            <HTMLFlipBook
              width={pageWidth}
              height={pageWidth * 1.414} // A4 aspect ratio
              showCover={true}
              className="flip-book w-full mx-auto"
              size="stretch"
              minWidth={180}
              maxWidth={720}
              minHeight={254} // 180 * 1.414
              maxHeight={1018} // 720 * 1.414
              drawShadow={true}
              flippingTime={600}
              useMouseEvents={true}
              usePortrait={window.innerWidth <= 640}
              autoSize={true}
              clickEventForward={true}
              mobileScrollSupport={true}
              maxShadowOpacity={0.3}
              swipeDistance={50}
              showPageCorners={true}
              disableFlipByClick={true} // Prevent click-to-flip, use buttons
              startPage={0}
              startZIndex={1}
              ref={flipBookRef}
              onPage={handlePageChange}
            >
              {numPages &&
                Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={index}
                    className="page-content"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Page
                      pageNumber={index + 1}
                      width={pageWidth}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      onRenderError={(error) => console.error("Page Render Error:", error)}
                      className="shadow-md"
                    />
                  </div>
                ))}
            </HTMLFlipBook>
          </Document>
        </div>

        <button
          onClick={goToNextPage}
          disabled={numPages ? currentPage >= numPages - 1 : true}
          className={`p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 ${
            numPages && currentPage >= numPages - 1 ? "pointer-events-none" : ""
          }`}
          aria-label="Next Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Page {currentPage + 1} of {numPages || "?"}
      </div>
    </div>
  );
}
