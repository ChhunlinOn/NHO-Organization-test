```tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("../../component/PDFFlipViewer"), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="w-full min-h-screen p-1 sm:p-2 lg:p-3 box-border">
      <PDFViewer />
    </div>
  );
}
```