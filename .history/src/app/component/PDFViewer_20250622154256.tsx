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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);

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

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

  const goToPage = (page: number) => {
    setCurrentPage(page);
    triggerFlipAnimation(page > currentPage ? "right" : "left");
  };

  // Update PDF width based on container size
  useEffect(() => {
    const updatePageWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(Math.min(width - (showThumbnails ? 232 : 32), 1000));
      }
    };
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, [showThumbnails]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100">
      <div
        ref={containerRef}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-4 transition-all duration-300"
      >
        {/* Thumbnail Sidebar */}
        <div
          className={`${
            showThumbnails ? "w-48" : "w-0"
          } overflow-y-auto h-[calc(100vh-8rem)] bg-gray-50 rounded-xl p-2 transition-all duration-300`}
        >
          {showThumbnails && numPages && (
            <div className="space-y-2">
              {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                <div
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`cursor-pointer p-1 rounded-lg hover:bg-indigo-100 ${
                    currentPage === page ? "bg-indigo-200 border-2 border-indigo-500" : ""
                  }`}
                >
                  <Document file={filePath} loading="">
                    <Page pageNumber={page} width={120} />
                  </div>
                  <p className="text-center text-xs text-gray-600">Page {page}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main PDF Viewer */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-800">
              📖 Interactive PDF Viewer
            </h1>
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
            >
              {showThumbnails ? "Hide Thumbnails" : "Show Thumbnails"}
            </button>
          </div>

          {/* Progress Bar */}
          {numPages && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / numPages) * 100}%` }}
              />
            </div>
          )}

          {isLoading && (
            <div className="text-center text-gray-500 animate-pulse">Loading PDF...</div>
          )}
          {isError && (
            <div className="text-center text-red-500 font-semibold animate-bounce">
              Error: Failed to load the PDF document.
            </div>
          )}

          {!isError && (
            <div
              ref={pageRef}
              className="flex justify-center perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentError}
                loading=""
              >
                <Page
                  pageNumber={currentPage}
                  width={pageWidth * zoomLevel}
                  className="shadow-lg rounded-lg"
                />
              </Document>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex gap-2">
              <button
                onClick={handleZoomOut}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Zoom Out
              </button>
              <button
                onClick={handleZoomIn}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Zoom In
              </button>
              <span className="px-3 py-2 bg-gray-100 rounded text-gray-700">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                ⬅ Previous
              </button>
              <span className="px-3 py-2 bg-gray-100 rounded text-gray-700">
                Page {currentPage} of {numPages || "…"}
              </span>
              <button
                onClick={goToNextPage}
                disabled={numPages ? currentPage >= numPages : true}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}