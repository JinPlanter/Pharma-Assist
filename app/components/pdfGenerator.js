import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = async (element, fileName) => {
    const canvas = await html2canvas(element);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size: 210mm x 297mm
    pdf.save(fileName);
};

export default generatePDF;
