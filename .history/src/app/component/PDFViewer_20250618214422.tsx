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
      let newWidth = windowWidth * 0.9; // 90% of viewport by default
      let newHeight = newWidth * 1.414; // A4 aspect ratio (√2:1)

      // Small screens (≤640px, Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.95; // 95% for small screens
        newHeight = newWidth * 1.414;
      }
      // Larger screens (e.g., tablet, desktop)
      else if (windowWidth <= 1024) {
        newWidth = Math.min(windowWidth * 0.85, 600); // 85%, max 600px
        newHeight = newWidth * 1.414;
      }
      else {
        newWidth = Math.min(windowWidth * 0.8, 700); // 80%, max 700px
        newHeight = newWidth * 1.414;
      }

      // Cap height to 80% of viewport to avoid overflow
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
            size="stretch" // Scale to container
            minWidth={250} // Smaller minWidth for small screens
            maxWidth={700}
            minHeight={353} // minWidth * 1.414
            maxHeight={990} // maxWidth * 1.414
            drawShadow={true}
            flippingTime={500}
            useMouseEvents={true}
            usePortrait={window.innerWidth <= 640} // Single-page view for small screens
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