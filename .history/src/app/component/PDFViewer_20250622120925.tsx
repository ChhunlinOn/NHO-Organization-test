"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "@/utils/pdfWorker";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 box-border relative">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Interactive PDF Flip Viewer</h1>
        
        <div className="pdf-container relative mx-auto my-4 border border-gray-200 rounded-lg overflow-hidden">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={currentPage} width={300} />
          </Document>
        </div>
      </div>
    </div>
  );
}a