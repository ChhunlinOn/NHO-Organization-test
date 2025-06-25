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

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

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

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      triggerFlipAnimation("left");
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
      triggerFlipAnimation("right");
    }
  };

  const triggerFlipAnimation = (direction: "left" | "right") => {
    if (pageRef.current) {
      pageRef.current.style.transition = "transform 0.6s ease";
      pageRef.current.style.transform = `rotateY(${direction === "right" ? -180 : 180}deg)`;
      setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.style.transition = "none";
          pageRef.current.style.transform = "rotateY(0deg)";
        }
      }, 600);
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
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-100">
      <div ref={containerRef} className="w-full max-w-6xl relative">
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
          <div className="relative flex justify-center perspective-1000">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-3xl text-gray-700 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed z-10"
              aria-label="Previous Page"
            >
              ◄
            </button>

            <div ref={pageRef} style={{ transformStyle: "preserve-3d" }}>
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentError}
                loading=""
              >
                <Page pageNumber={currentPage} width={pageWidth} className="shadow-md" />
              </Document>
            </div>

            <button
              onClick={goToNextPage}
              disabled={numPages ? currentPage >= numPages : true}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-3xl text-gray-700 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed z-10"
              aria-label="Next Page"
            >
              ►
            </button>
          </div>
        )}

        <div className="text-center mt-4 text-gray-700">
          Page {currentPage} of {numPages || "…"}
        </div>
      </div>
    </div>
  );
}