"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "@/utils/pdfWorker";
// Set PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.7.76/build/pdf.worker.min.js`;

interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [scale, setScale] = useState(1);

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

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  }, []);

  const fitToWidth = useCallback(() => {
    setScale(1);
  }, []);

  const fitToHeight = useCallback(() => {
    setScale(1);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">PDF Viewer Pro</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-white text-indigo-700 rounded-md font-medium hover:bg-gray-100 transition">
                <i className="fas fa-upload mr-2"></i>Upload New
              </button>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-md font-medium hover:bg-indigo-600 transition">
                <i className="fas fa-cog mr-2"></i>Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Controls and Page Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Document Viewer</h2>
            <div className="flex space-x-2">
              <button 
                className="zoom-controls p-2 rounded-full hover:bg-gray-100" 
                title="Zoom Out"
                onClick={zoomOut}
              >
                <i className="fas fa-search-minus text-gray-600"></i>
              </button>
              <button 
                className="zoom-controls p-2 rounded-full hover:bg-gray-100" 
                title="Zoom In"
                onClick={zoomIn}
              >
                <i className="fas fa-search-plus text-gray-600"></i>
              </button>
              <button 
                className="zoom-controls p-2 rounded-full hover:bg-gray-100" 
                title="Fit Width"
                onClick={fitToWidth}
              >
                <i className="fas fa-arrows-alt-h text-gray-600"></i>
              </button>
              <button 
                className="zoom-controls p-2 rounded-full hover:bg-gray-100" 
                title="Fit Height"
                onClick={fitToHeight}
              >
                <i className="fas fa-arrows-alt-v text-gray-600"></i>
              </button>
            </div>
          </div>

          {/* PDF Viewer Container */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "500px" }}>
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
                <div className="loading-spinner w-12 h-12 border-4 border-gray-200 rounded-full mb-4" style={{ borderTopColor: '#3498db', animation: 'spinner 1.5s linear infinite' }}></div>
                <p className="text-gray-600 font-medium">Loading your document...</p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
                <div className="text-red-500 text-5xl mb-4">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <p className="text-gray-700 font-medium text-lg mb-2">Error loading document</p>
                <p className="text-gray-500 mb-4">Failed to load the PDF file. Please try again.</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
                  onClick={() => {
                    setIsLoading(true);
                    setIsError(false);
                    // Simulate reload
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* PDF Viewer */}
            <div id="pdf-viewer" className="w-full h-full flex justify-center items-center p-4">
              <Document 
                file={filePath} 
                onLoadSuccess={onDocumentLoadSuccess} 
                onLoadError={onDocumentError}
              >
                <Page 
                  pageNumber={currentPage} 
                  width={300 * scale}
                  className="pdf-page bg-white shadow-md rounded-lg p-2 transform transition-all duration-300"
                />
              </Document>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-gray-700 font-medium mr-2">Page:</span>
              <div className="flex items-center bg-gray-100 rounded-md">
                <button 
                  className="page-btn px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-l-md disabled:opacity-50"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left mr-1"></i> Prev
                </button>
                <div className="px-4 py-2 bg-white border-t border-b border-gray-300 flex items-center">
                  <span>{currentPage}</span>
                  <span className="text-gray-500 mx-1">of</span>
                  <span>{numPages || "?"}</span>
                </div>
                <button 
                  className="page-btn px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-r-md"
                  onClick={goToNextPage}
                  disabled={numPages ? currentPage >= numPages : true}
                >
                  Next <i className="fas fa-chevron-right ml-1"></i>
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="page-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                <i className="fas fa-th mr-1"></i> Thumbnails
              </button>
              <button className="page-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                <i className="fas fa-list mr-1"></i> Bookmarks
              </button>
              <button className="page-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                <i className="fas fa-download mr-1"></i> Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2023 PDF Viewer Pro. All rights reserved.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .page-btn {
          transition: all 0.2s ease;
        }
        
        .page-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pdf-page {
          transition: transform 0.3s ease;
        }
        
        .zoom-controls {
          transition: all 0.2s ease;
        }
        
        .zoom-controls:hover {
          background-color: #e2e8f0;
        }
      `}</style>
    </div>
  );
}