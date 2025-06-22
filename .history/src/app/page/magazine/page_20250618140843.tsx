"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Load PDF.js worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// ✅ Dynamically import react-pdf components to prevent SSR issues
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

type PagesProps = {
  children: React.ReactNode;
  number: number;
};

const Pages = React.forwardRef<HTMLDivElement, PagesProps>(({ children, number }, ref) => (
  <div className="demoPage" ref={ref}>
    {children}
    <p className="text-white text-center mt-2">Page {number}</p>
  </div>
));

Pages.displayName = "Pages";

function Flipbook(): React.ReactElement {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
    setNumPages(numPages);
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white font-bold">FlipBook</h1>

      {/* Render Document only once, then render each Page inside */}
      <Document file="/chhunlin.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <HTMLFlipBook
          width={400}
          height={570}
          className="flipbook"
          startPage={0}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Pages key={index} number={index + 1}>
                <Page
                  pageNumber={index + 1}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Pages>
            ))}
        </HTMLFlipBook>
      </Document>
    </div>
  );
}

export default Flipbook;
