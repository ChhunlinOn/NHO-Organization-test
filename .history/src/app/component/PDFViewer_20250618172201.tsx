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
    setCurrentPage((prev) => Math.max(0, prev - 2)); // Go back two pages for a spread
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 2, (numPages || 1) - 1)); // Advance two pages for a spread
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

  // Determine if it's an odd or even page to display two pages or one
  const isSinglePage = numPages && currentPage === numPages - 1 && numPages % 2 !== 0;

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
                Page {currentPage + 1} - {Math.min(currentPage + 2, numPages || 1)} / {numPages || "..."}
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
                  disabled={currentPage >= (numPages ? numPages - (numPages % 2 === 0 ? 2 : 1) : 0)}
                  className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                    currentPage >= (numPages ? numPages - (numPages % 2 === 0 ? 2 : 1) : 0) ? "opacity-50 cursor-not-allowed" : ""
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
                {!isSinglePage && (
                  <div
                    className="w-1/2 h-full bg-white rounded-l-lg shadow-md flex flex-col p-8 relative border-r border-gray-200"
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                  >
                    <div className="flex-grow overflow-auto">
                      <h2 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">hand<br/>in hand</h2>
                      <p className="text-lg font-light text-gray-700 mb-6 italic">Your right hand has held me up.</p>
                      <p className="text-sm text-gray-500 mb-4">Psalm 18:35</p>
                      {/* Add more placeholder content to simulate text flow */}
                      <p className="text-sm text-gray-800 leading-relaxed mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <div className="absolute bottom-4 left-8 text-xs text-gray-500 font-bold">
                      Publicitas
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full shadow-inner">
                      {currentPage + 1}
                    </div>
                  </div>
                )}


                {/* Right Page Placeholder */}
                <div
                  className={`${isSinglePage ? 'w-full rounded-2xl' : 'w-1/2 rounded-r-lg'} h-full bg-white shadow-md flex flex-col p-8 relative`}
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  <div className="flex-grow overflow-auto">
                    <div className="flex justify-end mb-4">
                      <div className="relative w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600">
                        <img src="https://placehold.co/96x64/E0E0E0/6B7280?text=Map" alt="Placeholder Map" className="rounded-lg object-cover w-full h-full" onError={(e) => (e.currentTarget.src = 'https://placehold.co/96x64/E0E0E0/6B7280?text=Map')}/>
                        <div className="absolute bottom-1 right-1 bg-white px-1 py-0.5 rounded-sm text-xs font-bold text-gray-700">U.S.</div>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-2">by</p>
                    <p className="text-lg font-semibold text-gray-800 mb-6">Laurel Houck</p>

                    <div className="columns-2 gap-6 text-sm text-gray-800 leading-relaxed">
                      <p className="mb-4">
                        Jesus imparted His wisdom before He ascended to the Father after His resurrection. He called us to faith to empower us to act, together they give us lives meaning and purpose. Our lives are intertwined with God’s own, His right hand holds us up. And He provides other believers to walk with us through joys, sorrows, and service, hand in hand.
                      </p>
                      <p className="mb-4">
                        International Full Gospel Fellowship (IFGF) and South East Asia Prayer Center (SEAPC) have been working together in Cambodia for many years. IFGF Church in DNA does discipleship and outreach with God and make disciples through love and compassion. The pictures of their relationship is a church that changed in the real-world is a church that changed in the real-world faith in Him.
                      </p>
                      <p className="mb-4">
                        IFGF’s inception began is a very God-directed way, with humble and faithful beginnings, for the Lord’s purpose. Over 300 years before Jesus was born, Proverbs 3:6 part B tells says “A man’s mind plans his way (in his journey), But the Lord directs his steps and establishes them.” (Amplified Bible)
                      </p>
                      <p className="mb-4">
                        Pastor Daniel, on the Apostolic Board for Re-Mission and Church Planting for IFGF, is without a doubt a man on a mission for the Lord’s cause. He is down-to-earth, direct, and has a zeal for God’s truth, and it’s a pleasure to know him. His life story of IFGF, which is the story of God moving in deliberate ways, and everyone He got to step up into.
                      </p>
                      <p className="mb-4">
                        Daniel’s earliest and most outstanding memories of the Holy Spirit began within the community of Indonesian students studying in the United States. Young people who had been called to be a vessel. God developed a thirst for Jesus.
                      </p>
                      <p>
                        Pastor Jimmy - at that time, just Jimmy - organized crusades around his hometown and didn’t even know what he was doing or where to go. They were developing careers in engineering and business, decided they had to go to bible school instead, and after a while they became Pastors!
                      </p>
                      <p className="mb-4">
                         That one church is now 7,000 churches worldwide in 43 countries.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-8 text-xs text-gray-500 font-bold">
                    www.ifgf.org
                  </div>
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
