"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Setup worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type FlipPageProps = {
  number: number;
  children?: React.ReactNode;
};

const FlipPage = React.forwardRef<HTMLDivElement, FlipPageProps>(({ number, children }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full flex flex-col items-center justify-start shadow-md pt-4"
    >
      <div>{children}</div>
      <p className="text-sm text-gray-600 mt-4">Page {number}</p>
    </div>
  );
});

FlipPage.displayName = "FlipPage";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Flip Viewer</h1>
      <FlipBook
        width={400}
        height={570}
        className="flip-book"
        startPage={0}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        showCover
        flippingTime={700}
        swipeDistance={20}
        useMouseEvents
        drawShadow
        maxShadowOpacity={0}
        showPageCorners
        disableFlipByClick={false}
        mobileScrollSupport
        usePortrait={false}
        startZIndex={1}
        autoSize={false}
        clickEventForward={false}
      >
        {numPages &&
          [...Array(numPages)].map((_, index) => (
            <FlipPage key={index} number={index + 1}>
              <Document file="/chhunlin.pdf" onLoadSuccess={handleLoadSuccess}>
                <Page
                  pageNumber={index + 1}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </FlipPage>
          ))}
      </FlipBook>
    </div>
  );
}
