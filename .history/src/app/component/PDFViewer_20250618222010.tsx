
"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);

  // Calculate responsive page width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.9; // Default: 90% of viewport

      // Small screens (≤640px, Tailwind 'sm')
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.95; // 95% for small screens
      }
      // Medium screens (640px–1024px)
      else if (windowWidth <= 1024) {
        newWidth = windowWidth * 0.85; // 85% for tablets
      }
      // Large screens (>1024px)
      else {
        newWidth = Math.min(windowWidth * 0.75, 720); // 75%, max 720px
      }

      // Ensure minimum width for readability
      newWidth = Math.max(newWidth, 200);

      setPageWidth(Math.round(newWidth));

      // Debugging: Log width
      console.log(`Window Width: ${windowWidth}, Page Width: ${newWidth}`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-2 box-border">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(error) => console.error("PDF Load Error:", error)}
      >
        {numPages &&
          Array.from(new Array(numPages), (_, index) => (
            <div
              key={index}
              className="page-wrapper mb-4 w-full max-w-[720px]"
              style={{ overflow: "hidden" }}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                onRenderError={(error) => console.error("Page Render Error:", error)}
                className="shadow-md"
              />
            </div>
          ))}
      </Document>
    </div>
  );
}
