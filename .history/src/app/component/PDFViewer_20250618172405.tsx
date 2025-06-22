"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import "./PDFFlipViewer.css"; // Add custom styles here

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="pdf-viewer-container">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <FlipBook
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
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.3}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
              >
                <Page pageNumber={index + 1} width={600} />
              </div>
            ))}
          </FlipBook>
        )}
      </Document>
    </div>
  );
}
