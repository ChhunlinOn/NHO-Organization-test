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
          width={600} // [Required] Flipbook width in px
          height={800} // [Required] Flipbook height in px
          showCover={true} // [Optional] Show first child as cover page
          className="flip-book" // [Optional] Custom CSS class
          style={{}} // [Optional] Inline styles
          startPage={0} // [Optional] Initial page (0-based)
          size="fixed" // [Optional] Sizing mode: "fixed" or "stretch"
          minWidth={315} // [Optional] Minimum width in px
          maxWidth={1000} // [Optional] Maximum width in px
          minHeight={400} // [Optional] Minimum height in px
          maxHeight={1536} // [Optional] Maximum height in px
          drawShadow={true} // [Optional] Enable page shadows
          flippingTime={1000} // [Optional] Flip animation duration (ms)
          useMouseEvents={true} // [Optional] Enable mouse events
          usePortrait={false} // [Optional] Use portrait mode (single page)
          startZIndex={0} // [Optional] Starting z-index for pages
          autoSize={false} // [Optional] Auto-resize to container
          clickEventForward={true} // [Optional] Forward click events
          mobileScrollSupport={true} // [Optional] Enable mobile scroll
          maxShadowOpacity={0} // [Optional] Max shadow opacity (0-1)
          swipeDistance={-10} // [Optional] Min swipe distance to flip (px)
          showPageCorners={true} // [Optional] Show interactive page corners
          disableFlipByClick={false} // [Optional] Disable flip by click
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={index}
              className="page-wrapper"
              style={{ width: "100%", height: "100%" }}
            >
              <Page pageNumber={index + 1} width={600} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </Document>
  );
}
