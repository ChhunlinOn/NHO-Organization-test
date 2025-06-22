"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef } from "react";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const flipBookRef = useRef<any>(null);

  const handlePrevPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.flipPrev();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (flipBookRef.current && currentPage < (numPages || 0) - 1) {
      flipBookRef.current.flipNext();
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/chhunlin.pdf";
    link.download = "magazine.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-4xl w-full">
        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage + 1} of {numPages || 0}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= (numPages || 0) - 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>

        {/* Flipbook Container */}
        <div className="relative border-8 border-gray-800 rounded-lg bg-gray-900/10">
          <Document
            file="/chhunlin.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="relative"
          >
            {numPages && (
              <FlipBook
                width={600}
                height={800}
                showCover={true}
                className="flip-book mx-auto"
                style={{
                  background: "linear-gradient(to bottom, #f5f5f5, #e5e5e5)",
                  borderRadius: "8px",
                }}
                startPage={0}
                size="fixed"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1536}
                drawShadow={true}
                flippingTime={1000}
                useMouseEvents={true}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                clickEventForward={true}
                mobileScrollSupport={true}
                maxShadowOpacity={0.5}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                ref={flipBookRef}
                onFlip={(e: any) => setCurrentPage(e.data)}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={index}
                    className="page-wrapper bg-white shadow-inner"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Page
                      pageNumber={index + 1}
                      width={600}
                      className="transform scale-100 transition-transform"
                    />
                  </div>
                ))}
              </FlipBook>
            )}
          </Document>

          {/* Zoom and Download Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleZoomToggle}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              title="Zoom"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              title="Download"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Zoom Overlay */}
        {isZoomed && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={handleZoomToggle}
          >
            <div className="relative max-w-4xl w-full p-4">
              <Document file="/chhunlin.pdf">
                <Page
                  pageNumber={currentPage + 1}
                  width={1000}
                  className="shadow-2xl"
                />
              </Document>
              <button
                onClick={handleZoomToggle}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}