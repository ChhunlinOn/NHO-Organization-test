"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  const bookWidth = 400;
  const bookHeight = 550;

  return (
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <HTMLFlipBook
          width={bookWidth}
          height={bookHeight}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={index}
              className="page-wrapper"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Page
                pageNumber={index + 1}
                scale={0.6}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </Document>
  );
}
