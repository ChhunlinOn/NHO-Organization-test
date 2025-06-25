"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFSliderViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.85;

      if (windowWidth <= 640) newWidth = windowWidth * 0.85;
      else if (windowWidth <= 1024) newWidth = windowWidth * 0.8;
      else newWidth = Math.min(windowWidth * 0.7, 720);

      newWidth = Math.max(newWidth, 180);
      setPageWidth(Math.round(newWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      {/* Slider Container */}
      <div className="relative h-[calc(100vh-100px)] overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
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
              className="shadow-md mx-auto"
            />
          </Document>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
        </span>
      </button>

      <button
        onClick={goToNextPage}
        disabled={numPages ? currentPage >= numPages : true}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button>

      {/* Page Indicator */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-100">
        Page {currentPage} of {numPages || "?"}
      </div>
    </div>
  );
}
