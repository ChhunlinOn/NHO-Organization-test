
"use client";

import dynamic from "next/dynamic";

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("../../component/PDFViewer"), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="container mx-auto py-8">
      <PDFViewer filePath="./chhunlin.pdf" />
    </div>
  );
}