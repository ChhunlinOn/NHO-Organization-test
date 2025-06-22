"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef, useEffect, useCallback } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "@/utils/pdfWorker";

interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(600);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setIsError(false);
  }, []);

  const onDocumentError = useCallback((error: Error) => {
    console.error("Document load error:", error.message);
    setIsLoading(false);
    setIsError(true);
  }, []);

  const debouncePageChange = (newPage: number, direction: "left" | "right") => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentPage(newPage);
    triggerSlideAnimation(direction);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Match transition duration
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      debouncePageChange(currentPage - 1, "right");
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      debouncePageChange(currentPage + 1, "left");
    }
  };

  const triggerSlideAnimation = (direction: "left" | "right") => {
    if (pageRef.current) {
      pageRef.current.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      pageRef.current.style.transform = `translateX(${direction === "left" ? -30 : 30}px)`;
      pageRef.current.style.opacity = "0.3";
      setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.style.transition = "none";
          pageRef.current.style.transform = "translateX(0)";
          pageRef.current.style.opacity = "1";
        }
      }, 400);
    }
  };

  // Update PDF width based on container size
  useEffect(() => {
    const updatePageWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(Math.min(width - 80, 1000)); // Padding for buttons
      }
    };
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => {
      window.removeEventListener("resize", updatePageWidth);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-2 sm:p-4 bg-gray-100">
      <div ref={containerRef} className="w-full max-w-[1000px] relative px-8 sm:px-10">
        {isLoading && (
          <div className="text-center text-gray-500 absolute inset-0 flex items-center justify-center">
            Loading PDF...
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500 font-semibold absolute inset-0 flex items-center justify-center">
            Error: Failed to load the PDF document.
          </div>
        )}

        {!isError && (
          <div className="relative flex justify-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1 || isTransitioning}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-2xl sm:text-3xl text-gray-700 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed z-10"
              aria-label="Previous Page"
            >
              ◄
            </button>

            <div ref={pageRef} className="w-full">
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentError}
                loading=""
              >
                <Page pageNumber={currentPage} width={pageWidth} className="shadow-md mx-auto" />
              </Document>
            </div>

            <button
              onClick={goToNextPage}
              disabled={(numPages ? currentPage >= numPages : true) || isTransitioning}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-2xl sm:text-3xl text-gray-700 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed z-10"
              aria-label="Next Page"
            >
              ►
            </button>
          </div>
        )}

        <div className="text-center mt-2 sm:mt-4 text-sm sm:text-base text-gray-700">
          Page {currentPage} of {numPages || "…"}
        </div>
      </div>
    </div>
  );
}