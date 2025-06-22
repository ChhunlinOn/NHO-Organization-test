"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 424 });

  // Calculate responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let newWidth = windowWidth * 0.9; // Default: 90% of viewport
      let newHeight = newWidth * 1.414; // A4 aspect ratio (√2:1)

      // Small screens (≤640px, Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.95; // 95% for small screens
        newHeight = newWidth * 1.414;
      }
      // Medium screens (640px–1024px)
      else if (windowWidth <= 1024) {
        newWidth = windowWidth * 0.85; // 85% for tablets
        newHeight = newWidth * 1.414;
      }
      // Large screens (>1024px)
      else {
        newWidth = Math.min(windowWidth * 0.75, 720); // 75%, max 720px
        newHeight = newWidth * 1.414;
      }

      // Cap height to 85% of viewport to prevent overflow
      newHeight = Math.min(newHeight, windowHeight * 0.85);

      setDimensions({ width: Math.round(newWidth), height: Math.round(newHeight) });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-2">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            showCover={true}
            className="flip-book mx-auto w-full max-w-[720px]"
            size="stretch"
            minWidth={200} // Reduced for very small screens
            maxWidth={720}
            minHeight={283} // 200 * 1.414
            maxHeight={1018} // 720 * 1.414
            drawShadow={true}
            flippingTime={400}
            useMouseEvents={true}
            usePortrait={window.innerWidth <= 640}
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.2}
            swipeDistance={50} // Increased for easier mobile swiping
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
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
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