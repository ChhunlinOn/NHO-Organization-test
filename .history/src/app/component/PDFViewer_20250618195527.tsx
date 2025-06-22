"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex justify-center items-center">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={450}        // Reduced width
            height={500}       // Reduced height
            showCover={true}
            className="flip-book"
            size="fixed"
            minWidth={315}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={600} // Slightly faster animation
            useMouseEvents={true}
            usePortrait={false}
            autoSize={true}    // Enable auto resize
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0}
            swipeDistance={0}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}                // Provide an empty style object or customize as needed
            startPage={0}             // Set the initial page (0-based index)
            startZIndex={1}           // Set the starting z-index
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <Page
                  pageNumber={index + 1}
                  width={350} // Match flipbook width
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
