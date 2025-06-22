"use client";

import { Document, Page, pdfjs } from "react-pdf"; // Import pdfjs
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
// Ensure this path is correct for your worker, or use CDN as in the sample
// import "@/utils/pdfWorker"; // If you're using a local worker file
// Or for CDN (more reliable for quick setup):
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  // Assuming '/chhunlin.pdf' is accessible publicly or correctly imported
  const pdfFile = "/chhunlin.pdf"; 

  // Function to get the total number of pages from the PDF
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <>
      {/* First, load the document to get the total number of pages */}
      <div style={{ display: 'none' }}> {/* Hide this initial document load */}
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
        />
      </div>

      {numPages && (
        <HTMLFlipBook
          width={600}
          height={800}
          showCover={true}
          className="flip-book"
          style={{}}
          startPage={0}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          flippingTime={250} // Keep this for snappy feel
          useMouseEvents={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.1} // Keep your preferred shadow
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {Array.from(new Array(numPages), (_, index) => (
            // Each page is now wrapped in its own Document component
            // This is the key change for potentially smoother rendering
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              <Document
                file={pdfFile}
                // No need for onLoadSuccess here, as numPages is already known
              >
                <Page
                  pageNumber={index + 1} // pageNumber is 1-based
                  width={600}
                  renderAnnotationLayer={false} // Disable these for potentially better performance/appearance
                  renderTextLayer={false}
                />
              </Document>
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </>
  );
}