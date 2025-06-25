import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

const Pages = React.forwardRef(({ number }, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div className="text-center font-bold">Page number: {number}</div>
      <Page
        pageNumber={number}
        width={400}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">FlipBook</h1>
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="text-white">Loading PDF…</p>}
      >
        {numPages && (
          <HTMLFlipBook
            width={400}
            height={570}
            drawShadow={true}
            showCover={true}
            flippingTime={600}
            useMouseEvents={true}
            clickEventForward={true}
            mobileScrollSupport={true}
          >
            {Array.from(new Array(numPages), (_, idx) => (
              <Pages key={idx} number={idx + 1} />
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}

export default Flipbook;
