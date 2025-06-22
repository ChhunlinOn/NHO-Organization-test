"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 350, height: 500 });

  // Handle responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let newWidth = Math.min(windowWidth * 0.85, 700); // 85% of viewport width, max 700px
      let newHeight = Math.min(windowHeight * 0.75, newWidth * 1.414); // A4-like ratio (√2:1), capped by height

      // Mobile adjustments
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.95; // 95% for small screens
        newHeight = newWidth * 1.414;
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-2 sm:p-4">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            showCover={true}
            className="flip-book mx-auto"
            size="stretch" // Changed to stretch for better responsiveness
            minWidth={300}
            maxWidth={800}
            minHeight={400}
            maxHeight={1131} // A4 ratio max height
            drawShadow={true}
            flippingTime={500}
            useMouseEvents={true}
            usePortrait={window.innerWidth <= 640}
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.3}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
            startPage={0}
            startZIndex={1}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper border-2 border-gray-300 bg-white"
                style={{
                  width: "100%",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={dimensions.width}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}