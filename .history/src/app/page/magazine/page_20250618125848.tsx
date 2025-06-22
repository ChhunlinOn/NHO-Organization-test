export default function PDFViewer() {
  return (
    <div className="flex justify-center items-center h-screen">
      <iframe
        src="/chhunlin.pdf"
        width="80%"
        height="600px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}