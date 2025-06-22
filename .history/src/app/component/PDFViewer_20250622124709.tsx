"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import @u


interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setIsError(false);
  }, []);

  const onDocumentError = useCallback((error: Error) => {
    console.error("Document load error:", error.message);
    setIsLoading(false);
    setIsError(true);
  }, []);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (numPages && currentPage < numPages) setCurrentPage(currentPage + 1);
  }, [currentPage, numPages]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">PDF Viewer</h1>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: Failed to load PDF</div>}
        <Document file={filePath} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentError}>
          <Page pageNumber={currentPage} width={300} />
        </Document>
        <div className="flex justify-between mt-4">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {numPages || "?"}
          </span>
          <button onClick={goToNextPage} disabled={numPages ? currentPage >= numPages : true}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}