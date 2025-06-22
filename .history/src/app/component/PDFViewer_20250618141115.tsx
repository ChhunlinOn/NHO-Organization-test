"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

// Dynamically import Document and Page with SSR disabled
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

// Optional: Load styles
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-2xl text-white font-bold">PDF Flip Viewer</h1>
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
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
                <Page pageNumber={index + 1} width={600} renderAnnotationLayer={false} renderTextLayer={false} />
              </div>
            ))}
          </FlipBook>
        )}
      </Document>
    </div>
  );
}
