import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Register the fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfViewer = () => {
  const generatePdf = () => {
    const documentDefinition = {
      content: [
        {
          text: "Hello, this is a PDF generated with pdfmake!",
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        {
          text: "You can add various elements like text, tables, and images to customize your PDF.",
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <div>
      <h2>Your PDF Viewer App</h2>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default PdfViewer;
