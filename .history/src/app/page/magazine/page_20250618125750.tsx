"use client";

export default function PDFViewer() {
  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href="/chhunlin.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-lg"
      >
        Open Chhunlin PDF
      </a>
    </div>
  );
}
