"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  const bookWidth = 400;
  const bookHeight = 550;

  return (
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <HTMLFlipBook
          width={bookWidth}
          height={bookHeight}
          showCover={true}
          className="flip-book"
          style={{}}
          startPage={0}
          size="fixed"
          minWidth={300}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.5}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              <Page pageNumber={index + 1} width={bookWidth} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </Document>
  );
}
