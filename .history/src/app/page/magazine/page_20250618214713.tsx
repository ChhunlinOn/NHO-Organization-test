"use client";

import dynamic from "next/dynamic";

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("../../component/p"), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      <PDFViewer />
    </div>
  );
}