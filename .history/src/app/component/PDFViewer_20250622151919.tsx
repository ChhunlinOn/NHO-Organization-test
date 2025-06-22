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
  const [scale, setScale] = useState(1);

  // Dynamically adjust scale based on window width
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.6); // Small screens
      } else if (width < 1024) {
        setScale(0.8); // Medium screens
      } else {
        setScale(1); // Large screens
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (numPages && currentPage < numPages) setCurrentPage(currentPage + 1);
  }, [currentPage, numPages]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center">
          PDF Flip Viewer
        </h1>
        {isLoading && (
          <div className="text-center text-gray-600 text-base sm:text-lg animate-pulse">
            Loading PDF...
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500 text-base sm:text-lg font-semibold">
            Error: Failed to load PDF
          </div>
        )}
        <div className="w-full overflow-x-auto flex justify-center">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentError}
            className="perspective-1000"
          >
            <div className="relative w-full max-w-full sm:max-w-lg lg:max-w-3xl transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-6">
              <Page
                pageNumber={currentPage}
                scale={scale}
                className="shadow-lg rounded-lg border border-gray-200 bg-white mx-auto"
              />
            </div>
          </Document>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <div className="text-gray-700 font-medium text-sm sm:text-base">
            Page {currentPage} of {numPages || "?"}
          </div>
          <button
            onClick={goToNextPage}
            disabled={numPages ? currentPage >= numPages : true}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-200 ${
              numPages && currentPage >= numPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        {numPages && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
            <div
              className="bg-blue-600 h-2 sm:h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentPage - 1) / numPages) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}