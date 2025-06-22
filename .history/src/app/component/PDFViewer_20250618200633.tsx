"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const renderPages = (width: number) =>
    Array.from(new Array(numPages), (_, index) => (
      <div
        key={index}
        className="page-wrapper"
        style={{ width: "100%", height: "100%" }}
      >
        <Page pageNumber={index + 1} width={width} />
      </div>
    ));

  return (
    <div className="relative flex justify-center items-center">
      {/* Default Flipbook */}
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={350}
            height={500}
            minWidth={315}
            maxWidth={1000}
            minHeight={420}
            maxHeight={1536}
            style={{}}
            showCover={true}
            className="flip-book"
            size="fixed"
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
            {renderPages(350)}
          </HTMLFlipBook>
        )}
      </Document>

      {/* Zoom Button */}
      <button
        onClick={() => setIsZoomed(true)}
        className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow hover:bg-gray-100 text-sm z-10"
      >
        Zoom
      </button>

      {/* Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-[90vw] max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow hover:bg-gray-100 text-sm z-10"
            >
              Close
            </button>

            {/* Responsive Zoomed Flipbook */}
            <div className="w-full h-full">
              <Document file="/chhunlin.pdf">
                <HTMLFlipBook
                  width={window.innerWidth > 768 ? 700 : 350} // Responsive width
                  height={window.innerHeight > 768 ? 900 : 500}
                  showCover={true}
                  size="stretch"
                  drawShadow={true}
                  flippingTime={600}
                  useMouseEvents={true}
                  usePortrait={false}
                  autoSize={true}
                  clickEventForward={true}
                  mobileScrollSupport={true}
                  maxShadowOpacity={0.2}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {renderPages(window.innerWidth > 768 ? 700 : 350)}
                </HTMLFlipBook>
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
