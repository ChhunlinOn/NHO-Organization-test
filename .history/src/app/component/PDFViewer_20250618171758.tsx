"use client";

import { useState, useRef, useEffect } from "react";
// react-pdf and react-pageflip imports are removed as they caused resolution errors.
// Functionality related to these libraries (PDF rendering, page flip animation) will not be available.

// Define a type for the FlipBook ref - this is now a placeholder as FlipBook is not used
// If a custom "page flipper" were implemented, this ref type would need to match its interface.
interface CustomFlipBookRef {
  // Methods to simulate navigation, if a custom one were built
  simulateFlipNext?: () => void;
  simulateFlipPrev?: () => void;
  getCurrentPageIndex?: () => number;
  getPageCount?: () => number;
}

export default function PDFFlipViewer() {
  // We'll simulate numPages for demonstration purposes, as PDF document loading is not happening.
  const [numPages, setNumPages] = useState<number | null>(10); // Simulated total pages
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1.0); // Initial zoom level for content
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for content scaling
  const flipBookContainerRef = useRef<HTMLDivElement>(null); // Ref for the main flipbook-like container

  // Constants for zoom limits
  const MAX_ZOOM = 2.0;
  const MIN_ZOOM = 0.5;
  const ZOOM_STEP = 0.1;

  // State to manage the dimensions of the "FlipBook" container for responsiveness
  const [flipBookDimensions, setFlipBookDimensions] = useState({ width: 0, height: 0 });

  // Simulate page flipping. In a real scenario, this would interact with a library or custom logic.
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, (numPages || 1) - 1));
  };

  // Increase zoom level
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM));
  };

  // Decrease zoom level
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM));
  };

  // Effect to handle responsive resizing of the "flipbook" container
  useEffect(() => {
    const handleResize = () => {
      // Define maximum dimensions for the entire viewer, considering screen size and some padding
      const containerMaxWidth = window.innerWidth * 0.9; // Max 90% of window width
      const containerMaxHeight = window.innerHeight * 0.8; // Max 80% of window height (leaving space for controls)

      // Target aspect ratio for a *simulated two-page spread* (e.g., 1.5 for a typical wide magazine spread)
      // This is (width of 2 pages) / (height of 1 page). If a single page were 3:4 (600x800), a spread is 1200x800, so 1.5.
      const bookAspectRatio = (600 * 2) / 800; // Assuming a 1200x800 base for 2 pages

      let currentWidth = containerMaxWidth;
      let currentHeight = containerMaxHeight;

      // Adjust dimensions to fit within constraints while maintaining book aspect ratio
      if (currentWidth / bookAspectRatio > currentHeight) {
        currentWidth = currentHeight * bookAspectRatio;
      } else {
        currentHeight = currentWidth / bookAspectRatio;
      }

      // Ensure minimum dimensions are met for readability/usability
      currentWidth = Math.max(630, currentWidth); // Minimum width for a comfortable two-page spread (e.g., 2 * 315)
      currentHeight = Math.max(400, currentHeight); // Minimum height

      setFlipBookDimensions({
        width: Math.floor(currentWidth),
        height: Math.floor(currentHeight),
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial dimensions on component mount
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  return (
    <>
      {/* Button to open the PDF magazine overlay */}
      <div className="flex justify-center p-4 bg-gray-100 min-h-screen items-center">
        <button
          onClick={() => setIsOverlayOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Open Magazine Viewer
        </button>
      </div>

      {/* Overlay for the Magazine Viewer */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-full max-h-full overflow-hidden flex flex-col items-center justify-center transform scale-95 md:scale-100 animate-scale-in">
            {/* Close Button for the Overlay */}
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300 z-10"
              aria-label="Close Magazine Viewer"
            >
              &times;
            </button>

            {/* Viewer Controls (Zoom, Page Numbers, Navigation) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 mt-8 md:mt-0 w-full px-4">
              {/* Zoom Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleZoomIn}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl shadow-sm transition duration-200 ease-in-out transform hover:scale-105"
                  aria-label="Zoom In"
                >
                  Zoom +
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl shadow-sm transition duration-200 ease-in-out transform hover:scale-105"
                  aria-label="Zoom Out"
                >
                  Zoom -
                </button>
              </div>

              {/* Page Number Display */}
              <div className="text-gray-700 font-medium text-lg px-4 py-2 bg-gray-100 rounded-xl shadow-inner">
                Page {currentPage + 1} / {numPages || "..."}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                    currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Previous Page"
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === (numPages ? numPages - 1 : 0)}
                  className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                    currentPage === (numPages ? numPages - 1 : 0) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Next Page"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Magazine Content Container (simulated two-page spread) */}
            <div
              ref={flipBookContainerRef}
              className="flex-grow flex items-center justify-center w-full relative p-2"
              style={{
                width: `${flipBookDimensions.width}px`,
                height: `${flipBookDimensions.height}px`,
                maxWidth: "calc(100vw - 40px)", // Ensure it fits screen with padding
                maxHeight: "calc(100vh - 120px)", // Ensure it fits screen with controls and padding
              }}
            >
              {/* This inner div acts as the "magazine cover" or frame */}
              <div className="absolute inset-0 shadow-2xl rounded-2xl overflow-hidden border-4 border-gray-200 bg-gray-50 flex">
                {/* Left Page Placeholder */}
                <div
                  className="w-1/2 h-full bg-white rounded-l-lg shadow-md flex items-center justify-center p-4 relative border-r border-gray-200"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  <p className="text-gray-600 text-center text-xl font-semibold">
                    Left Page {currentPage + 1} <br/> (Simulated Content)
                  </p>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full shadow-inner">
                    {currentPage + 1}
                  </div>
                </div>

                {/* Right Page Placeholder */}
                <div
                  className="w-1/2 h-full bg-white rounded-r-lg shadow-md flex items-center justify-center p-4 relative"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  <p className="text-gray-600 text-center text-xl font-semibold">
                    Right Page {currentPage + 2} <br/> (Simulated Content)
                  </p>
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full shadow-inner">
                    {currentPage + 2}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom keyframe styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
