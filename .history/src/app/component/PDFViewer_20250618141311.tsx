// components/PDFViewer.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

// 👇 Dynamically import Document and Page with SSR disabled
const Document = dynamic(() => import("react-pdf").then(m => m.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(m => m.Page), { ssr: false });

// Optional styles
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <Document
      file="/chhunlin.pdf"
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {numPages && (
        <FlipBook width={600} height={800} showCover={true}>
          {Array.from({ length: numPages }, (_, index) => (
            <div key={index} className="page-wrapper" style={{ width: "100%", height: "100%" }}>
              <Page
                pageNumber={index + 1}
                width={600}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </FlipBook>
      )}
    </Document>
  );
}
