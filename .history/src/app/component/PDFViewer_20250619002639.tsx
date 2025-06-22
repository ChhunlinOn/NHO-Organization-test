
"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect, useCallback } from "react";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionState, setTransitionState] = useState<"next" | "prev" | "none">("none");
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  // Calculate responsive page width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.85; // Default: 85% to leave room for buttons

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

  // Handle Escape key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOverlayOpen) {
        setIsOverlayOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOverlayOpen]);

  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setTransitionState("prev");
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTransitionState("none");
      }, 100);
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setTransitionState("next");
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTransitionState("none");
      }, 100);
    }
  };

  // Toggle overlay
  const toggleOverlay = useCallback(() => {
    setIsOverlayOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-2 box-border relative">
      <div className="w-full max-w-[720px] mb-2 flex justify-end">
  <button
    onClick={toggleOverlay}
    className="ml-auto flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base text-gray-700"
    aria-label="Open Full PDF View"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 sm:h-5 sm:w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
    <span>Open</span>
  </button>
</div>


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

      {isOverlayOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
          onClick={toggleOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="PDF Overlay"
        >
          <iframe
            src="/chhunlin.pdf"
            className="w-[90vw] h-[90vh] sm:w-[80vw] sm:h-[80vh] max-w-[900px] max-h-[1200px] border-0 bg-white"
            title="Full PDF View"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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

        @supports not (backdrop-filter: blur(8px)) {
          .backdrop-blur-md {
            background-color: rgba(0, 0, 0, 0.75) !important;
          }
        }
      `}</style>
    </div>
  );
}
