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
      let newWidth = Math.min(windowWidth * 0.9, 600); // 90% of viewport, max 600px
      let newHeight = (newWidth * 4) / 3; // Maintain 4:3 aspect ratio

      // Adjust for smaller screens
      if (windowWidth < 768) {
        newWidth = Math.min(windowWidth * 0.95, 400); // 95% for mobile, max 400px
        newHeight = (newWidth * 4) / 3;
      }
      if (windowWidth < 400) {
        newWidth = windowWidth * 0.95; // Full width for very small screens
        newHeight = (newWidth * 4) / 3;
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
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
            size="fixed"
            minWidth={dimensions.width * 0.9}
            maxWidth={600}
            minHeight={dimensions.height * 0.9}
            maxHeight={800}
            drawShadow={true}
            flippingTime={600}
            useMouseEvents={true}
            usePortrait={window.innerWidth < 768} // Portrait mode for mobile
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0}
            swipeDistance={30} // Enable swipe for mobile
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
            startPage={0}
            startZIndex={1}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{ width: "100%", height: "100%" }}
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