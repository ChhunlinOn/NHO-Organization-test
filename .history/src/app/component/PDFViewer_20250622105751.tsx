"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "@/utils/pdfWorker";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFSliderViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.9;

      if (windowWidth <= 640) newWidth = windowWidth * 0.95;
      else if (windowWidth <= 1024) newWidth = windowWidth * 0.85;
      else newWidth = Math.min(windowWidth * 0.75, 800);

      newWidth = Math.max(newWidth, 200);
      setPageWidth(Math.round(newWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      maintainScrollPosition();
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
      maintainScrollPosition();
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (numPages || 1)) {
      setCurrentPage(page);
      maintainScrollPosition();
    }
  };

  const maintainScrollPosition = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollY = container.scrollTop;
      setTimeout(() => {
        container.scrollTop = scrollY;
      }, 0);
    }
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full max-w-screen-lg mx-auto my-4"
      data-carousel="slide"
      ref={containerRef}
    >
      {/* Carousel wrapper */}
      <div className="relative w-full h-[calc(100vh-150px)] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-y-auto rounded-lg bg-gray-100 flex items-center justify-center">
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
            className="shadow-lg mx-auto transition-opacity duration-500 ease-in-out"
            data-carousel-item
          />
        </Document>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-2 left-1/2 space-x-2">
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === index + 1 ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-current={currentPage === index + 1}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => goToPage(index + 1)}
            ></button>
          ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 left-2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70 focus:outline-none disabled:opacity-50"
        data-carousel-prev
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70 focus:outline-none disabled:opacity-50"
        data-carousel-next
        onClick={goToNextPage}
        disabled={numPages ? currentPage >= numPages : true}
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>

      {/* Page Indicator */}
      <div className="absolute bottom-8 w-full text-center text-sm text-gray-800 font-semibold">
        Page {currentPage} of {numPages || "?"}
      </div>
    </div>
  );
}