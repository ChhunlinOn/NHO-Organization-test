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
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <HTMLFlipBook
          width={300}  // adjust size as needed
          height={600}
          showCover={true}
          className="flip-book"
          style={{}} // provide a default style
          startPage={0}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.5} // default value, adjust as needed
          swipeDistance={30} // default value, adjust as needed
          showPageCorners={true} // default value, adjust as needed
          disableFlipByClick={false} // default value, adjust as needed
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              <Page pageNumber={index + 1} width={600} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </Document>
  );
}
