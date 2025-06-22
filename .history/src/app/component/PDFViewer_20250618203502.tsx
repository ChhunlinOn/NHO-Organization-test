"use client";

import { useEffect, useRef } from "react";

export default function FlowPaperViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if FlowPaper is loaded globally, or load from CDN
    if (!(window as any).FlowPaperViewer) {
      const script = document.createElement("script");
      script.src = "https://cdn.flowpaper.com/js/flowpaper.min.js"; // example CDN link
      script.onload = () => initializeViewer();
      document.body.appendChild(script);
    } else {
      initializeViewer();
    }

    function initializeViewer() {
      if (!(window as any).FlowPaperViewer) {
        console.error("FlowPaper library not loaded");
        return;
      }

      // Clear any existing content
      containerRef.current!.innerHTML = "";

      // Initialize the FlowPaper viewer
      (window as any).FlowPaperViewer(
        containerRef.current,
        {
          config: {
            DOC: "/chhunlin.pdf",   // path to your PDF file
            Scale: 1,
            ZoomTransition: "easeOut",
            ZoomTime: 0.5,
            ZoomInterval: 0.1,
            FitPageOnLoad: true,
            FitWidthOnLoad: false,
            FullScreenAsMaxWindow: false,
            ProgressiveLoading: true,
            MinZoomSize: 0.2,
            MaxZoomSize: 5,
            SearchMatchAll: false,
            InitViewMode: "Portrait",
            RenderingOrder: "html5,flash",
            ViewModeToolsVisible: true,
            ZoomToolsVisible: true,
            NavToolsVisible: true,
            CursorToolsVisible: true,
            SearchToolsVisible: true,
            localeChain: "en_US"
          },
          // Optional callbacks here
        }
      );
    }

  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", margin: "auto" }}
    ></div>
  );
}
