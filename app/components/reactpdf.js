
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useFormValuesContext } from "../contexts/gradeform-context";


// Register the fonts with pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfViewer = () => {

    const { formValues, comments } = useFormValuesContext();
    const generatePdf = () => {
        const documentDefinition = {
            pageOrientation: "landscape",
            content: [
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*"],
                        title: "Graded Form",
                        body: [
                            ["Label", "Value"],
                            ...Object.entries(formValues).map(([label, value]) => [label, value]),
                        ],
                        layout: "lightHorizontalLines",
                    }
                },
                {
                    text: "Comments",
                    style: "subheader",
                },
                {
                    ul: Object.entries(comments).map(([label, value]) => value && { text: `${label}: ${value}` }),
                }
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
