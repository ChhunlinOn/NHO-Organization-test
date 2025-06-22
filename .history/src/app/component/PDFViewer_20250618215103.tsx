```tsx
"use client";

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "@/utils/pdfWorker";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function PDFFlipViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 424 });

  // Calculate responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Base width on 95% of viewport for small screens, 90% for larger
      let newWidth = windowWidth <= 640 ? windowWidth * 0.95 : windowWidth * 0.9;
      newWidth = Math.min(newWidth, 720); // Cap at 720px for larger screens
      let newHeight = newWidth * 1.414; // A4 aspect ratio

      // Cap height to 90% of viewport to prevent overflow
      newHeight = Math.min(newHeight, windowHeight * 0.9);

      // Ensure minimum size for very small screens
      newWidth = Math.max(newWidth, 200);
      newHeight = Math.max(newHeight, 283); // 200 * 1.414

      setDimensions({ width: Math.round(newWidth), height: Math.round(newHeight) });

      // Debugging: Log dimensions to check values
      console.log(`Window: ${windowWidth}x${windowHeight}, Flipbook: ${newWidth}x${newHeight}`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-2 box-border">
      <Document
        file="/chhunlin.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(error) => console.error("PDF Load Error:", error)}
      >
        {numPages && (
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            showCover={true}
            className="flip-book w-full max-w-[720px] mx-auto"
            size="stretch"
            minWidth={200}
            maxWidth={720}
            minHeight={283}
            maxHeight={1018} // 720 * 1.414
            drawShadow={true}
            flippingTime={400}
            useMouseEvents={true}
            usePortrait={window.innerWidth <= 640}
            autoSize={true}
            clickEventForward={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.2}
            swipeDistance={50}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{ touchAction: "pan-y" }} // Prevent scroll interference on mobile
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="page-wrapper"
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                <Page
                  pageNumber={index + 1}
                  width={dimensions.width}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  onRenderError={(error) => console.error("Page Render Error:", error)}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}
```

### Key Changes in `PDFFlipViewer`
1. **Simplified Dimension Logic**:
   - Small screens (≤640px): `width = windowWidth * 0.95` to maximize space.
   - Larger screens: `width = windowWidth * 0.9`, capped at 720px.
   - Height: `width * 1.414`, capped at 90% of viewport height.
   - Minimums: `minWidth={200}`, `minHeight={283}` for very small screens.
   - Used `Math.round` to avoid fractional pixels.

2. **Flexible Container**:
   - Outer `div`: Added `box-border` to ensure padding doesn't affect width.
   - `flip-book` class: `w-full max-w-[720px]` ensures full width with a cap.
   - Removed restrictive Tailwind classes that might limit scaling.

3. **Mobile Optimization**:
   - `usePortrait={window.innerWidth <= 640}` for single-page view.
   - `swipeDistance={50}` for easier touch flipping.
   - `style={{ touchAction: "pan-y" }}` to prevent scroll conflicts on mobile.

4. **Debugging Aids**:
   - Added `console.log` for dimensions to verify calculated sizes.
   - Added `onLoadError` and `onRenderError` to catch PDF-related issues.

### Updated `MagazinePage` Component
The `MagazinePage` container might be contributing to the issue if its padding or parent styles are too restrictive. I'll minimize padding on small screens and ensure the container is fully flexible.

<xaiArtifact artifact_id="7145e5a2-d2ca-4cfe-a3a5-b85dcdbfbdd4" artifact_version_id="3365296f-3097-44d4-a45b-bfa4cd8061a0" title="MagazinePage.tsx" contentType="text/tsx">
```tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("../../component/PDFFlipViewer"), {
  ssr: false,
});

export default function MagazinePage() {
  return (
    <div className="w-full min-h-screen p-1 sm:p-2 lg:p-4 box-border">
      <PDFViewer />
    </div>
  );
}
```

### Key Changes in `MagazinePage`
1. **Minimal Padding**:
   - Changed to `p-1 sm:p-2 lg:p-4` to reduce padding on small screens, maximizing space for the PDF.
2. **Full-Width Container**:
   - `w-full` ensures the container doesn't restrict `PDFFlipViewer`.
   - `box-border` includes padding in the width calculation.
3. **SSR Handling**:
   - Kept dynamic import with `ssr: false` to avoid server-side rendering issues.

### Testing Steps
1. **Small Screens (≤640px)**:
   - Test on devices like iPhone 12 (390px) or Pixel 5 (~400px).
   - The PDF should occupy ~95% of the screen width, with height proportional (A4 ratio).
   - Swipe to flip pages; ensure no overflow or clipping.
2. **Browser Debugging**:
   - Open DevTools, set viewport to 320px–640px, and check if the PDF scales correctly.
   - Look at console logs for `Window` and `Flipbook` dimensions (e.g., `Window: 390x844, Flipbook: 370x523`).
3. **PDF Loading**:
   - Verify `/chhunlin.pdf` loads without errors (check console for `PDF Load Error` or `Page Render Error`).
4. **Layout Inspection**:
   - Use DevTools to inspect `.flip-book` and `.page-wrapper` for unexpected `max-width`, `overflow`, or parent constraints.
5. **Viewport Meta**:
   - Ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is in your HTML head.

### Troubleshooting
Since responsiveness is still an issue, please provide specific details to narrow it down:
- **Behavior**: Is the PDF too small, too large, misaligned, or cut off? Does it not resize when you shrink the window?
- **Device/Browser**: Which devices or browsers show the issue (e.g., iPhone 14, Chrome on Android)?
- **Console Output**: Share the console logs for dimensions (e.g., `Window: 390x844, Flipbook: 370x523`) or any errors.
- **Parent Components**: Are there other components/layouts wrapping `MagazinePage` that might apply restrictive styles (e.g., `max-width`, `overflow: hidden`)?
- **CSS Conflicts**: Check if global styles or Tailwind utilities override `.flip-book` or `.page-wrapper`.

### Potential Issues and Fixes
1. **Parent Container Restrictions**:
   - If `MagazinePage` is inside a parent with `max-width` or `overflow: hidden`, it could limit scaling. Inspect the DOM hierarchy and remove restrictive styles.
2. **react-pageflip Bug**:
   - `HTMLFlipBook` may not always respect `size="stretch"`. If this happens, try `size="fixed"` with dynamic `width`/`height` as a fallback:
     ```tsx
     size={window.innerWidth <= 640 ? "fixed" : "stretch"}
     ```
3. **PDF Rendering**:
   - If `/chhunlin.pdf` is too large or complex, it may render poorly on small screens. Optimize the PDF (compress images, reduce resolution) using tools like Adobe Acrobat or online compressors.
4. **Tailwind Reset**:
   - Add a CSS reset for `.flip-book` to avoid interference:
     ```css
     .flip-book {
       max-width: 100% !important;
       width: 100%;
       box-sizing: border-box;
     }
     ```
     Import in `PDFFlipViewer`: `import "./flipbook.css";`.

This update should make the PDF viewer responsive, especially on small screens, by maximizing viewport usage and simplifying the layout. If it’s still not working, please share the specific symptoms (e.g., "PDF is too narrow on iPhone") and console logs, and I’ll provide a targeted fix!