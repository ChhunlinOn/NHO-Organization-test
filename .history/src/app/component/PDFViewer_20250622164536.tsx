

import { Document, Page } from "react-pdf";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const updatePageWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(Math.min(width - 32, 800));
      }
    };
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gradient-to-r from-slate-100 to-slate-200">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          📄 PDF Viewer
        </h1>

        {isLoading && <div className="text-center text-gray-500">Loading PDF...</div>}
        {isError && (
          <div className="text-center text-red-500 font-semibold">
            Error: Failed to load the PDF document.
          </div>
        )}

        {!isError && (
          <div className="relative flex justify-center items-center overflow-x-auto">
            {/* Left arrow */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="absolute left-0 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md disabled:opacity-50"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
            </button>

            {/* PDF Page */}
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentError}
              loading=""
            >
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                renderTextLayer={false}
              />
            </Document>

            {/* Right arrow */}
            <button
              onClick={goToNextPage}
              disabled={numPages ? currentPage >= numPages : true}
              className="absolute right-0 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md disabled:opacity-50"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
            </button>
          </div>
        )}

        {/* Page indicator */}
        <div className="flex justify-center mt-4">
          <span className="text-sm sm:text-base text-gray-700 text-center">
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{numPages || "…"}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
