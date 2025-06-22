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
    <div style={{ padding: 20, background: "#ddd", display: "flex", justifyContent: "center" }}>
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Loading PDF...</p>}
        error={<p>Failed to load PDF.</p>}
      >
        {numPages && (
          <FlipBook
            width={600}
            height={800}
            showCover={true}
            startPage={0}
            size="fixed"
            style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  boxSizing: "border-box",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  width={580}
                  renderAnnotationLayer={true}
                  renderTextLayer={true}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#444",
                    userSelect: "none",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Page {index + 1} / {numPages}
                </div>
              </div>
            ))}
          </FlipBook>
        )}
      </Document>
    </div>
  );
}
