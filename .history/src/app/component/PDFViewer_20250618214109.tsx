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

  // Calculate responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let newWidth = Math.min(windowWidth * 0.9, 800); // 90% of viewport, max 800px
      let newHeight = newWidth * 1.414; // A4 aspect ratio (√2:1)

      // Mobile: <640px (Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.95; // 95% for mobile
        newHeight = newWidth * 1.414;
      }
      // Tablet: 640px - 1024px
      else if (windowWidth <= 1024) {
        newWidth = windowWidth * 0.85;
        newHeight = newWidth * 1.414;
      }

      // Cap height to avoid overflow
      newHeight = Math.min(newHeight, windowHeight * 0.8);

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
            size="stretch" // Allow scaling to container
            minWidth={280}
            maxWidth={800}
            minHeight={396} // minWidth * 1.414
            maxHeight={1131} // maxWidth * 1.414
            drawShadow={true}
            flippingTime={500}
            useMouseEvents={true}
            usePortrait={window.innerWidth <= 640}
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.3}
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