"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback } from "react";
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
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          PDF Flip Viewer
        </h1>
        {isLoading && (
          <div className="text-center text-gray-600 text-lg animate-pulse">Loading PDF...</div>
        )}
        {isError && (
          <div className="text-center text-red-500 text-lg font-semibold">
            Error: Failed to load PDF
          </div>
        )}
        <div className="relative w-full flex justify-center">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentError}
            className="perspective-1000"
          >
            <div className="relative w-full max-w-lg transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-6">
              <Page
                pageNumber={currentPage}
                width={Math.min(600, window.innerWidth * 0.9)}
                className="shadow-lg rounded-lg border border-gray-200 bg-white"
              />
            </div>
          </Document>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <div className="text-gray-700 font-medium">
            Page {currentPage} of {numPages || "?"}
          </div>
          <button
            onClick={goToNextPage}
            disabled={numPages ? currentPage >= numPages : true}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 ${
              numPages && currentPage >= numPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        {numPages && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentPage - 1) / numPages) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}