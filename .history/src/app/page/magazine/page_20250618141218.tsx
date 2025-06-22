"use client";

import dynamic from 'next/dynamic';

// ❌ Problem was here: ssr: true (renders on server)
// ✅ Set ssr: false to avoid loading Node-only 'canvas' module
const PDFViewer = dynamic(() => import('../../component/PDFViewer'), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="p-6">
      <PDFViewer />
    </div>
  );
}
