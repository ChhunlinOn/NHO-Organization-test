"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback } from "react";
import "@/utils/pdfWorker";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { ChevronLeft, ChevronRight, Plus, Minus, Maximize, Download, Info } from "lucide-react";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setIsError(false);
  }, []);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (numPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, numPages]);

  const jumpToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= (numPages || 1)) {
      setCurrentPage(pageNumber);
    }
  }, [currentPage, numPages]);

  const zoomIn = useCallback(() => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  }, []);

  const renderPageDots = () => {
    if (!numPages) return null;
    
    const dots = [];
    const maxVisibleDots = 5;
    let startDot = Math.max(1, currentPage - Math.floor(maxVisibleDots / 2));
    let endDot = Math.min(numPages, startDot + maxVisibleDots - 1);
    
    if (endDot - startDot + 1 < maxVisibleDots) {
      startDot = Math.max(1, endDot - maxVisibleDots + 1);
    }
    
    for (let i = startDot; i <= endDot; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            currentPage === i 
              ? 'bg-blue-500 transform scale-125' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to page ${i}`}
        />
      );
    }
    
    return (
      <div className="flex items-center justify-center gap-1 mt-4">
        {dots}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 box-border relative">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Interactive PDF Flip Viewer</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button 
              onClick={zoomIn}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Zoom In"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={zoomOut}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Zoom Out"
            >
              <Minus size={18} />
            </button>
          </div>
        </div>
        
        <div className="pdf-container relative mx-auto my-4 border border-gray-200 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-96 text-red-500">
              <Info size={48} />
              <p className="mt-4 text-center">Failed to load PDF. Please try again.</p>
            </div>
          ) : (
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={currentPage} width={300 * scale} />
            </Document>
          )}
        </div>
        
        <div className="pdf-controls flex items-center justify-between bg-white border-t border-gray-200 p-3">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              currentPage === 1 ? "pointer-events-none" : ""
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max={numPages || 1}
              value={currentPage}
              onChange={(e) => jumpToPage(parseInt(e.target.value))}
              className="w-32 md:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-3 text-sm text-gray-600">
              Page {currentPage} of {numPages || "?"}
            </span>
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={numPages ? currentPage >= numPages : true}
            className={`flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              numPages && currentPage >= numPages ? "pointer-events-none" : ""
            }`}
            aria-label="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {renderPageDots()}
        
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {numPages || "?"}
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Maximize size={16} />
            Fullscreen
          </button>
          
          <button
            onClick={() => {
              // Simulate download process
              setTimeout(() => {
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center';
                notification.innerHTML = `
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>PDF download started</span>
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                  notification.style.opacity = '0';
                  notification.style.transition = 'opacity 0.5s ease';
                  setTimeout(() => {
                    document.body.removeChild(notification);
                  }, 500);
                }, 3000);
              }, 1500);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}