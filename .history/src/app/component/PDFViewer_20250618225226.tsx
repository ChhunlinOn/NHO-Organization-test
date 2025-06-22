```tsx
"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionState, setTransitionState] = useState<"next" | "prev" | "none">("none");

  // Calculate responsive page width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.85; // Default: 85% to leave room for buttons

      // Small screens (≤640px, Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.85; // 85% for small screens to fit buttons
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

  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setTransitionState("prev");
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTransitionState("none");
      }, 100); // Slightly longer delay for 1000ms transition
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setTransitionState("next");
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTransitionState("none");
      }, 100); // Slightly longer delay for 1000ms transition
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-2 box-border">
      <div className="w-full max-w-[720px] flex items-center justify-between gap-1 sm:gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 ${
            currentPage === 1 ? "pointer-events-none" : ""
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

        <div
          className={`page-wrapper w-full overflow-hidden ${
            transitionState === "next" ? "page-turn-next" : 
            transitionState === "prev" ? "page-turn-prev" : ""
          }`}
          style={{
            transition: "transform 1000ms ease-out, opacity 1000ms ease-out",
          }}
        >
          <Document
            file="/chhunlin.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => console.error("PDF Load Error:", error)}
          >
            <Page
              pageNumber={currentPage}
              width={pageWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              onRenderError={(error) => console.error("Page Render Error:", error)}
              className="shadow-md mx-auto"
            />
          </Document>
        </div>

        <button
          onClick={goToNextPage}
          disabled={numPages ? currentPage >= numPages : true}
          className={`p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 ${
            numPages && currentPage >= numPages ? "pointer-events-none" : ""
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
        Page {currentPage} of {numPages || "?"}
      </div>

      <style jsx>{`
        .page-wrapper {
          transform: translateX(0) rotateY(0);
          opacity: 1;
        }

        .page-turn-next {
          transform: translateX(20px) rotateY(-5deg);
          opacity: 0.5;
        }

        .page-turn-prev {
          transform: translateX(-20px) rotateY(5deg);
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
```