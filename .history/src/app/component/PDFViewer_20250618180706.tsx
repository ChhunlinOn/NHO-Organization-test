"use client";

import { Document, Page } from "react-pdf";
import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const bookRef = useRef<any>(null);

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <HTMLFlipBook
          width={600}
          height={800}
          showCover={true}
          className="flip-book"
          startPage={0}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          flippingTime={600}
          useMouseEvents={true}
          usePortrait={false}
          autoSize={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.5}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={handleFlip}
          ref={bookRef}
          style={{}} // Add a default empty style or customize as needed
          startZIndex={1} // Add a default z-index or customize as needed
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              {/* Only render the current page and its neighbor to simulate "closing" other pages */}
              {Math.abs(currentPage - index) <= 1 && (
                <Page pageNumber={index + 1} width={600} />
              )}
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </Document>
  );
}
