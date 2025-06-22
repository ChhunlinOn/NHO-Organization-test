"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Button to toggle overlay */}
      <button
        onClick={toggleOverlay}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open PDF in Overlay
      </button>

      {/* Flipbook viewer */}
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={350}
            height={500}
            showCover={true}
            className="flip-book"
            size="fixed"
            minWidth={315}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={600}
            useMouseEvents={true}
            usePortrait={false}
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0}
            swipeDistance={0}
            showPageCorners={true}
            disableFlipByClick={false}
            startPage={0}
            startZIndex={1}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <Page pageNumber={index + 1} width={350} />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {/* Overlay with iframe */}
      {showOverlay && (
<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="relative w-11/12 max-w-4xl h-5/6 bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={toggleOverlay}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Close
            </button>
            <iframe
              src="/chhunlin.pdf"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
