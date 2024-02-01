"use client";
// Import necessary modules from the React library
import React, { useState } from 'react';
import '../../Styles/style.css'; // Import styles
import Navbar from '../../navbar'; // Import Navbar component
import Papa from 'papaparse'; // Import Papa library for CSV parsing

// Import File component
export default function ImportFile() {
    // State variables for data, file type, and parsed data
    const [data, setData] = useState([]);
    const [fileType, setFileType] = useState('');
    const [parsedData, setParsedData] = useState(null);

    // Event handler for file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileType(file.type);

        // Use FileReader to read the content of the file
        const reader = new FileReader();
        reader.onload = (evt) => {
            let content = evt.target.result;

            // Remove the BOM character if present
            if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
            }

            // Set the data state with the trimmed content
            setData(content.trim());

            // Parse the data after it's read
            try {
                if (file.type === 'application/json') {
                    setParsedData(JSON.parse(content.trim()));
                } else if (file.type.includes('csv')) {
                    setParsedData(Papa.parse(content.trim(), { header: true }).data);
                }
            } catch (error) {
                console.error('Error parsing data:', error);
                // Handle the error in another way (e.g., set an error message)
            }
        };

        // Read the file as text
        reader.readAsText(file);
    };

    // Event handler for manually triggering parsing
    const handleParse = () => {
        try {
            console.log('Data before parsing:', data); // Log data to console

            // Parse the data based on the file type
            if (fileType === 'application/json') {
                setParsedData(JSON.parse(data));
            } else if (fileType.includes('csv')) {
                setParsedData(Papa.parse(data, { header: true }).data);
            }
        } catch (error) {
            console.error('Error parsing data:', error);
            // Handle the error in another way (e.g., set an error message)
        }
    };

    // JSX rendering for the ImportFile component
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <main>
                    {/* Input for file upload with accept attribute specifying allowed file types */}
                    <input type="file" accept=".json,.csv" onChange={handleFileUpload} />

                    {/* Button to manually trigger parsing */}
                    <button onClick={handleParse}>Confirm</button>

                    {/* Render parsed data in an unordered list */}
                    <ul>
                        {Array.isArray(parsedData) ? parsedData.map((item, index) => (
                            <li key={index}>{JSON.stringify(item)}</li>
                        )) : <li>{JSON.stringify(parsedData)}</li>}
                    </ul>
                </main>
            </div>

        </div>
    );
}
