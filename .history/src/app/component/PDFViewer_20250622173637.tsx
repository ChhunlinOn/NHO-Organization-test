"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef, useEffect, useCallback } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  X,
} from "lucide-react";
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
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1.2); // scale for zoom modal

  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setIsLoading(false);
      setIsError(false);
    },
    []
  );

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

  const updatePageWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setPageWidth(Math.min(width - 32, 800));
    }
  };

  useEffect(() => {
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.2, 0.8));
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gradient-to-r from-slate-100 to-slate-200">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300"
      >
        {/* Title Row */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            📄 PDF Viewer
          </h1>
          <button
            onClick={() => setIsZoomOpen(true)}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Open Zoom Modal"
          >
            <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {isLoading && (
          <div className="text-center text-gray-500">Loading PDF...</div>
        )}
        {isError && (
          <div className="text-center text-red-500 font-semibold">
            Error: Failed to load the PDF document.
          </div>
        )}

        {!isError && (
          <div className="relative flex justify-center items-center overflow-x-auto">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="absolute left-0 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md disabled:opacity-50"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
            </button>

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

        <div className="flex justify-center mt-4">
          <span className="text-sm sm:text-base text-gray-700 text-center">
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{numPages || "…"}</strong>
          </span>
        </div>
      </div>

      {/* Zoom Overlay Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold">Zoom View</h2>
              <div className="flex gap-2">
                <a
                  href={filePath}
                  download
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  title="Close Zoom View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zoom View with Click-to-Zoom */}
            <div className="flex-1 overflow-auto p-4 flex justify-start items-start select-none">
              <div
                onClick={() => setZoomScale((prev) => (prev === 1 ? 2 : 1))} // toggle between 1 and 2
                className={`transition-transform duration-300 ${
                  zoomScale > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top left", // Fixes left clipping issue
                  display: "inline-block", // Important so it sizes to content
                }}
              >
                <Document file={filePath} loading="">
                  <Page pageNumber={currentPage} renderTextLayer={false} />
                </Document>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 py-3 border-t border-gray-200">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 w-full sm:w-auto"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 w-full sm:w-auto"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                Zoom: {(zoomScale * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
