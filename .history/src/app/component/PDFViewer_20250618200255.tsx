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
    <div className="flex justify-center items-center relative">
      {/* Normal Flipbook View */}
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
            style={{}}
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
        className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow hover:bg-gray-200 text-sm"
      >
        Zoom
      </button>

      {/* Zoom Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-white px-3 py-1 rounded shadow hover:bg-gray-200 text-sm"
            >
              Close
            </button>

            {/* Zoomed Flipbook */}
            <Document file="/chhunlin.pdf">
              <HTMLFlipBook
                width={800}
                height={1100}
                showCover={true}
                size="fixed"
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
                {renderPages(800)}
              </HTMLFlipBook>
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
