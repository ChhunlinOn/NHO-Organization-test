"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useCallback } from "react";
import "@/utils/pdfWorker";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { ChevronLeft, ChevronRight, Plus, Minus, Maximize, Download, Info } from "lucide-react";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFFlipViewerProps {
  filePath: string;
}

export default function PDFFlipViewer({ filePath }: PDFFlipViewerProps) {
  // State
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionState, setTransitionState] = useState<"next" | "prev" | "none">("none");
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Calculate responsive page width
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth * 0.85; // Default: 85% to leave room for buttons

      // Small screens (≤640px)
      if (windowWidth <= 640) {
        newWidth = windowWidth * 0.85;
      } 
      // Medium screens (640px–1024px)
      else if (windowWidth <= 1024) {
        newWidth = windowWidth * 0.8;
      } 
      // Large screens (>1024px)
      else {
        newWidth = Math.min(windowWidth * 0.7, 720); // 70%, max 720px
      }

      // Ensure minimum width for readability
      newWidth = Math.max(newWidth, 180);
      setPageWidth(Math.round(newWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setTransitionState("prev");
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTransitionState("none");
      }, 100);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (numPages && currentPage < numPages) {
      setTransitionState("next");
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTransitionState("none");
      }, 100);
    }
  }, [currentPage, numPages]);

  const jumpToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= (numPages || 1)) {
      setTransitionState(pageNumber > currentPage ? "next" : "prev");
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setTransitionState("none");
      }, 100);
    }
  }, [currentPage, numPages]);

  const zoomIn = useCallback(() => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  }, []);
  const zoomOut = useCallback(() => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = document.querySelector('.pdf-container');
    
    if (!document.fullscreenElement) {
      if (container?.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const downloadPDF = useCallback(() => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      // Show notification
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
  }, []);

  // Handle document load success
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setIsError(false);
  }, []);

  // Handle page load error
  const onPageError = useCallback((error: Error) => {
    console.error("Error loading PDF page:", error);
    setIsLoading(false);
    setIsError(true);
  }, []);

  // Handle document load error
  const onDocumentError = useCallback((error: Error) => {
    console.error("Error loading PDF document:", error);
    setIsLoading(false);
    setIsError(true);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Render page indicator dots
  const renderPageDots = useCallback(() => {
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
  }, [currentPage, numPages]);

  return (
<div className="flex flex-col items-center w-full min-h-screen p-4 box-border relative">
  <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Interactive PDF Flip Viewer</h2>
    </div>
    {/* Add your PDF viewer controls and Document/Page rendering here */}
    {/* Example: */}
    <div className="pdf-container flex justify-center items-center">
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentError}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF.</div>}
      >
        <Page
          pageNumber={currentPage}
          width={pageWidth}
          scale={scale}
          onRenderError={onPageError}
          loading={<div>Loading page...</div>}
          error={<div>Failed to load page.</div>}
        />
      </Document>
    </div>
    {/* Controls, navigation, etc. */}
    <div className="flex justify-center items-center mt-4 gap-2">
      <button onClick={goToPreviousPage} disabled={currentPage === 1} aria-label="Previous Page">
        <ChevronLeft />
      </button>
      <span>
        Page {currentPage} of {numPages || "?"}
      </span>
      <button onClick={goToNextPage} disabled={numPages ? currentPage === numPages : true} aria-label="Next Page">
        <ChevronRight />
      </button>
      <button onClick={zoomOut} aria-label="Zoom Out">
        <Minus />
      </button>
      <button onClick={zoomIn} aria-label="Zoom In">
        <Plus />
      </button>
      <button onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
        <Maximize />
      </button>
      <button onClick={downloadPDF} aria-label="Download PDF" disabled={isDownloading}>
        <Download />
      </button>
    </div>
    {renderPageDots()}
    {isLoading && <div className="mt-4 text-gray-500">Loading PDF...</div>}
    {isError && <div className="mt-4 text-red-500">Failed to load PDF.</div>}
  </div>
</div>
);
}