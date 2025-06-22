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
      if (width < 480) {
        setScale(0.45); // Extra small screens
      } else if (width < 768) {
        setScale(0.65); // Small screens
      } else if (width < 1024) {
        setScale(0.85); // Medium screens
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
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 px-2 xs:px-4 lg:px-8 py-6">
      <style jsx>{`
        @media (max-width: 480px) {
          .pdf-container {
            max-width: 90%;
            max-height: 55vh;
            aspect-ratio: 8.5 / 11;
            margin: 0 auto;
          }
          .pdf-page {
            width: 100% !important;
            height: auto !important;
          }
        }
        @media (min-width: 481px) and (max-width: 767px) {
          .pdf-container {
            max-width: 85%;
            max-height: 65vh;
            aspect-ratio: 8.5 / 11;
            margin: 0 auto;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pdf-container {
            max-width: 80%;
            max-height: 70vh;
            aspect-ratio: 8.5 / 11;
            margin: 0 auto;
          }
        }
        @media (min-width: 1024px) {
          .pdf-container {
            max-width: 75%;
            max-height: 75vh;
            aspect-ratio: 8.5 / 11;
            margin: 0 auto;
          }
        }
      `}</style>
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-4 xs:p-6 lg:p-10">
        <h1 className="text-xl xs:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 xs:mb-8 text-center">
          PDF Flip Viewer
        </h1>
        {isLoading && (
          <div className="text-center text-gray-600 text-sm xs:text-base animate-pulse">
            Loading PDF...
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500 text-sm xs:text-base font-semibold">
            Error: Failed to load PDF
          </div>
        )}
        <div className="w-full flex justify-center pdf-container my-4 xs:my-6">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentError}
            className="perspective-1000"
          >
            <div className="relative w-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-4">
              <Page
                pageNumber={currentPage}
                scale={scale}
                className="shadow-xl rounded-lg border border-gray-200 bg-white mx-auto pdf-page"
              />
            </div>
          </Document>
        </div>
        <div className="flex flex-col xs:flex-row justify-between items-center mt-4 xs:mt-6 gap-3 xs:gap-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`w-full xs:w-auto px-4 py-2 xs:px-6 xs:py-3 rounded-full font-semibold text-white text-sm xs:text-base transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <div className="text-gray-700 font-medium text-sm xs:text-base">
            Page {currentPage} of {numPages || "?"}
          </div>
          <button
            onClick={goToNextPage}
            disabled={numPages ? currentPage >= numPages : true}
            className={`w-full xs:w-auto px-4 py-2 xs:px-6 xs:py-3 rounded-full font-semibold text-white text-sm xs:text-base transition-all duration-200 ${
              numPages && currentPage >= numPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        {numPages && (
          <div className="mt-4 xs:mt-6 w-full max-w-md mx-auto bg-gray-200 rounded-full h-1.5 xs:h-2">
            <div
              className="bg-blue-600 h-1.5 xs:h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentPage - 1) / numPages) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}