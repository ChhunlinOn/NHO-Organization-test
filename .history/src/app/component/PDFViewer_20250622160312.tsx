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
  const [flipDirection, setFlipDirection] = useState<'left' | 'right' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
      setFlipDirection('left');
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setFlipDirection('right');
      setCurrentPage(currentPage + 1);
    }
  };

  // Update PDF width based on container size
  useEffect(() => {
    const updatePageWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(Math.min(width - 32, 800)); // Padding and max width
      }
    };
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gradient-to-r from-slate-100 to-slate-200">
      <div
        ref={containerRef}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          📄 PDF Viewer
        </h1>

        {isLoading && <div className="text-center text-gray-500">Loading PDF...</div>}
        {isError && (
          <div className="text-center text-red-500 font-semibold">
            Error: Failed to load the PDF document.
          </div>
        )}

        {!isError && (
          <div className="relative flex justify-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="absolute left-0 z-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-300"
            >
              ⬅
            </button>

            <div className={`pdf-container transition-transform duration-500 ${flipDirection === 'left' ? 'flip-left' : flipDirection === 'right' ? 'flip-right' : ''}`}>
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentError}
                loading=""
              >
                <Page pageNumber={currentPage} width={pageWidth} />
              </Document>
            </div>

            <button
              onClick={goToNextPage}
              disabled={numPages ? currentPage >= numPages : true}
              className="absolute right-0 z-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-300"
            >
              ➡
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <span className="text-sm sm:text-base text-gray-700">
            Page <strong>{currentPage}</strong> of <strong>{numPages || "…"}</strong>
          </span>
        </div>
      </div>

      <style jsx>{`
        .pdf-container {
          perspective: 1000px;
        }
        .pdf-container.flip-left {
          transform: rotateY(-180deg);
        }
        .pdf-container.flip-right {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
