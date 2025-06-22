export default async function loadPdfWorker() {
  if (typeof window === 'undefined') return;
  
  const workerUrl = new URL('pdfjs-dist@^4.0.2645/legacy/build/pdf.worker.min.js', import.meta.url).href;
  const pdfjsWorker = await import('pdfjs-dist/legacy/build/pdf.worker.min.js');
  return pdfjsWorker;
}