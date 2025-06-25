export default async function loadPdfWorker() {
  if (typeof window === 'undefined') return;
  
  const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href;
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min.js');
  return pdfjsWorker;
}