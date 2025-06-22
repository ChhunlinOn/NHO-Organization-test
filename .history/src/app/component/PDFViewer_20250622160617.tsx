"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback, useEffect } from "react";
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
  const [containerWidth, setContainerWidth] = useState(600);

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
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setContainerWidth(width * 0.9); // Mobile
      else if (width < 1024) setContainerWidth(500); // Tablet
      else setContainerWidth(600); // Desktop
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gradient-to-r from-slate-100 to-slate-200">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">📄 PDF Viewer</h1>

        {isLoading && <div className="text-center text-gray-600">Loading PDF...</div>}
        {isError && (
          <div className="text-center text-red-500 font-semibold">
            Error: Failed to load the PDF document.
          </div>
        )}

        {!isError && (
          <div className="flex justify-center">
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentError}
              loading=""
            >
              <Page pageNumber={currentPage} width={containerWidth} />
            </Document>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 px-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ⬅ Previous
          </button>

          <span className="text-gray-700 text-sm md:text-base">
            Page <strong>{currentPage}</strong> of <strong>{numPages || "..."}</strong>
          </span>

          <button
            onClick={goToNextPage}
            disabled={numPages ? currentPage >= numPages : true}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
