"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div
      style={{
        background: "#f6f5f3", // subtle off-white page background
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
            style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: 12,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem 0",
                }}
              >
                <div style={{ flexGrow: 1, overflow: "hidden" }}>
                  <Page
                    pageNumber={index + 1}
                    width={560} // slightly smaller than container width to add margin
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                  />
                </div>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "#888",
                    padding: "0.5rem 0",
                    borderTop: "1px solid #eee",
                    fontFamily: "'Georgia', serif",
                    userSelect: "none",
                  }}
                >
                  Page {index + 1} / {numPages}
                </div>
              </div>
            ))}
          </FlipBook>
        )}
      </Document>
    </div>
  );
}
