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
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <FlipBook
          width={600}  // adjust size as needed
          height={800}
          showCover={true}
          className="flip-book"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              <Page pageNumber={index + 1} width={600} />
            </div>
          ))}
        </FlipBook>
      )}
    </Document>
  );
}
