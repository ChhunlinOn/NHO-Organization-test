// app/magazine/page.tsx or wherever you're using PDFViewer
"use client";

import dynamic from "next/dynamic";

// ✅ ssr must be false to avoid loading 'canvas'
const PDFViewer = dynamic(() => import('../../component/PDFViewer'), {
  ssr: false,
  loading: () => <p className="text-white">Loading PDF...</p>,
});

export default function MagazinePage() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <PDFViewer />
    </div>
  );
}
