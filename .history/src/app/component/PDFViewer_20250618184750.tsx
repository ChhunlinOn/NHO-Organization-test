"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef, useCallback, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

// Set up the PDF.js worker. Using CDN is often simplest.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Component to represent a single page in the flipbook
// We are passing the PDF file and page number to it.
type FlipPageProps = {
  pageNumber: number;
  pdfFile: string;
  pageRenderer: string[];
};

const FlipPage = React.forwardRef<HTMLDivElement, FlipPageProps>(
  ({ pageNumber, pdfFile, pageRenderer }, ref) => {
    return (
      <div ref={ref} className="page-wrapper" style={{ width: "100%", height: "100%", overflow: 'hidden' }}>
        {/* Render the actual PDF page */}
        {pageRenderer[pageNumber - 1] ? ( // Check if the page is pre-rendered
            <img 
                src={pageRenderer[pageNumber - 1]} 
                alt={`Page ${pageNumber}`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
        ) : (
            // Fallback: Render a loading state or the PDF directly if not pre-rendered yet
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Loading Page {pageNumber}...
                {/* You could also render the <Document><Page> here as a fallback */}
            </div>
        )}
      </div>
    );
  }
);

FlipPage.displayName = "FlipPage";


export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [renderedPageUrls, setRenderedPageUrls] = useState<string[]>([]); // To store URLs of pre-rendered pages
  const flipBookRef = useRef(null); // Reference to the HTMLFlipBook component
  const pdfFile = "/chhunlin.pdf"; // Your PDF file path
  const PAGE_WIDTH = 600; // Define a consistent width for rendering

  // 1. Load the document to get the total number of pages
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // 2. Function to render PDF page to a canvas and then to an image URL
  const renderPdfPageToImage = useCallback(async (pdfDocument, pageNum) => {
    try {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: PAGE_WIDTH / page.getViewport({ scale: 1 }).width }); // Scale to desired width
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport: viewport }).promise;
      return canvas.toDataURL(); // Get data URL of the rendered page
    } catch (error) {
      console.error(`Error rendering page ${pageNum}:`, error);
      return null;
    }
  }, [PAGE_WIDTH]);

  // 3. Effect to pre-render all pages when numPages is known
  useEffect(() => {
    if (numPages) {
      const loadPdfAndRenderPages = async () => {
        try {
          const pdfDoc = await pdfjs.getDocument(pdfFile).promise;
          const urls = await Promise.all(
            Array.from({ length: numPages }, (_, i) =>
              renderPdfPageToImage(pdfDoc, i + 1)
            )
          );
          setRenderedPageUrls(urls.filter(Boolean) as string[]); // Filter out any nulls
        } catch (error) {
          console.error("Error loading PDF for pre-rendering:", error);
        }
      };
      loadPdfAndRenderPages();
    }
  }, [numPages, pdfFile, renderPdfPageToImage]);

  return (
    <>
      {/* Initial hidden Document load to get numPages */}
      <div style={{ display: 'none' }}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} />
      </div>

      {numPages && renderedPageUrls.length === numPages ? ( // Only render flipbook when all pages are pre-rendered
        <HTMLFlipBook
          width={PAGE_WIDTH}
          height={(PAGE_WIDTH / 600) * 800} // Maintain aspect ratio if width changes
          showCover={true}
          className="flip-book"
          style={{}}
          startPage={0}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          flippingTime={250} // Fast flip animation
          useMouseEvents={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.1} // Subtle shadow
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          ref={flipBookRef}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <FlipPage 
                key={index} 
                pageNumber={index + 1} 
                pdfFile={pdfFile} 
                pageRenderer={renderedPageUrls} 
            />
          ))}
        </HTMLFlipBook>
      ) : (
        <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900'>
            <h1 className='text-3xl text-white text-center font-bold'>Loading PDF...</h1>
            <p className='text-white'>Preparing {numPages || 'all'} pages for the flipbook.</p>
        </div>
      )}
    </>
  );
}