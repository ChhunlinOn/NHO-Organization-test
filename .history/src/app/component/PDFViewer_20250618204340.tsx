"use client";

import { Document, Page } from "react-pdf";
import { useState, useCallback } from "react"; // Removed useRef as we'll use onInit
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Define a type for the PageFlip instance for better TypeScript support
// This is based on react-pageflip's common API structure
interface IPageFlip {
  prev(): void;
  next(): void;
  // You can add other methods if you plan to use them, e.g.:
  // turnToPage(page: number): void;
  // getPageCount(): number;
  // getCurrentPageIndex(): number;
}

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  // This state will store the actual PageFlip instance received from onInit
  const [bookInstance, setBookInstance] = useState<IPageFlip | null>(null);

  // Callback for when the PDF document loads successfully
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  // Callback for when the HTMLFlipBook component is initialized
  // The 'instance' argument here IS the PageFlip API object
  const onInit = useCallback((instance: IPageFlip) => {
    setBookInstance(instance);
  }, []);

  // Function to go to the previous page
  const goToPrevPage = useCallback(() => {
    if (bookInstance) { // Ensure the PageFlip instance is available
      bookInstance.prev();
    }
  }, [bookInstance]); // Dependency array: re-create if bookInstance changes

  // Function to go to the next page
  const goToNextPage = useCallback(() => {
    if (bookInstance) { // Ensure the PageFlip instance is available
      bookInstance.next();
    }
  }, [bookInstance]); // Dependency array: re-create if bookInstance changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages && (
          <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-4"
              aria-label="Previous Page"
              disabled={!bookInstance} {/* Disable button if bookInstance is not yet available */}
            >
              {/* Simple SVG left arrow icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flip Book Container */}
            <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
              <HTMLFlipBook
                width={350} // Base width - will be scaled by CSS
                height={500} // Base height - will be scaled by CSS
                showCover={true}
                className="flip-book"
                size="fixed"
                minWidth={200} // Adjusted minWidth for smaller screens
                maxWidth={600}
                minHeight={300} // Adjusted minHeight
                maxHeight={800}
                drawShadow={true}
                flippingTime={600}
                useMouseEvents={true}
                usePortrait={false}
                autoSize={true} // Keep autoSize true
                clickEventForward={true}
                mobileScrollSupport={true}
                maxShadowOpacity={0}
                swipeDistance={0}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{ margin: '0 auto' }} // Center the flipbook within its container
                startPage={0}
                startZIndex={1}
                onInit={onInit} {/* <-- IMPORTANT CHANGE: Use onInit prop */}
                // Removed 'ref' prop as we are getting the instance via onInit
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={index}
                    className="page-wrapper"
                    style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Centering page content
                  >
                    <Page
                      pageNumber={index + 1}
                      width={350} // This width will be relative to the flipbook's dynamic size
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      className="pdf-page"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-4"
              aria-label="Next Page"
              disabled={!bookInstance} {/* Disable button if bookInstance is not yet available */}
            >
              {/* Simple SVG right arrow icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </Document>
    </div>
  );
}