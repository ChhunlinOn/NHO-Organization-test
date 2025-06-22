"use client";

import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomedPage, setZoomedPage] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1.5);
  const flipBookRef = useRef<any>(null);

  const fileUrl = "/chhunlin.pdf";

  const handlePrev = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.flipPrev();
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (flipBookRef.current && numPages && currentPage < numPages - 1) {
      flipBookRef.current.flipNext();
      setCurrentPage((prev) => Math.min(prev + 1, numPages - 1));
    }
  };

  const openZoom = (pageNumber: number) => {
    setZoomedPage(pageNumber);
    setZoomScale(1.5);
  };

  const closeZoom = () => {
    setZoomedPage(null);
  };

  const zoomIn = () => {
    setZoomScale((scale) => Math.min(scale + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomScale((scale) => Math.max(scale - 0.25, 1));
  };

  const downloadPdf = () => {
    // Simple link download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "chhunlin.pdf";
    link.click();
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, position: "relative" }}>
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Loading PDF...</p>}
        error={<p>Failed to load PDF.</p>}
      >
        {numPages && (
          <>
            <FlipBook
              ref={flipBookRef}
              width={600}
              height={800}
              showCover={true}
              startPage={currentPage}
              size="fixed"
              drawShadow={true}
              flippingTime={700}
              useMouseEvents={true}
              usePortrait={false}
              maxShadowOpacity={0.5}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div
                  key={index}
                  className="page-wrapper"
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => openZoom(index + 1)}
                >
                  <Page pageNumber={index + 1} width={580} />
                </div>
              ))}
            </FlipBook>

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                marginTop: 15,
              }}
            >
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                style={{ padding: "8px 16px", fontSize: 16 }}
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === numPages - 1}
                style={{ padding: "8px 16px", fontSize: 16 }}
              >
                Next →
              </button>
              <button onClick={downloadPdf} style={{ padding: "8px 16px", fontSize: 16 }}>
                ⬇️ Download PDF
              </button>
            </div>

            {/* Page number display */}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 14, color: "#555" }}>
              Page {currentPage + 1} / {numPages}
            </div>
          </>
        )}
      </Document>

      {/* Zoom Overlay */}
      {zoomedPage && (
        <div
          onClick={closeZoom}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <Page
              pageNumber={zoomedPage}
              width={600 * zoomScale}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
            {/* Zoom controls */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <button onClick={zoomOut} style={{ padding: "6px 12px" }}>
                ➖ Zoom Out
              </button>
              <button onClick={zoomIn} style={{ padding: "6px 12px" }}>
                ➕ Zoom In
              </button>
              <button onClick={closeZoom} style={{ padding: "6px 12px" }}>
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
