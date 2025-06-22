"use client";

import dynamic from "next/dynamic";

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("../../component/p"), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PDFViewer />
    </div>
  );
}