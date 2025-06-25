// Flipbook.tsx
"use client";

import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PagesProps = {
  children: React.ReactNode;
  number: number;
};

const Pages = React.forwardRef<HTMLDivElement, PagesProps>(({ children, number }, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{children}</p>
      <p>Page number: {number}</p>
    </div>
  );
});

Pages.displayName = 'Pages';

function Flipbook(): JSX.Element {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
    setNumPages(numPages);
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">FlipBook</h1>
      <HTMLFlipBook width={400} height={570}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Pages key={index} number={index + 1}>
              <Document file= onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={index + 1}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              <p>Page {index + 1} of {numPages}</p>
            </Pages>
          ))}
      </HTMLFlipBook>
    </div>
  );
}

export default Flipbook;
