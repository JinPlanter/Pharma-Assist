"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';

export default function ImportFile() {
    const [data, setData] = useState([]);
    const [fileType, setFileType] = useState('');
    const [parsedData, setParsedData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileType(file.type);
        const reader = new FileReader();
        reader.onload = (evt) => {
            let content = evt.target.result;
            if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
            }
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
                // set an error message or handle the error in another way
            }
        };
        reader.readAsText(file);
    };

    const handleParse = () => {
        try {
            console.log('Data before parsing:', data); // Log data to console
            if (fileType === 'application/json') {
                setParsedData(JSON.parse(data));
            } else if (fileType.includes('csv')) {
                setParsedData(Papa.parse(data, { header: true }).data);
            }
        } catch (error) {
            console.error('Error parsing data:', error);
            // set an error message or handle the error in another way
        }
    };

    return (
        <div>
            <input type="file" accept=".json,.csv" onChange={handleFileUpload} />
            <button onClick={handleParse}>Confirm</button>
            <ul>
                {Array.isArray(parsedData) ? parsedData.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                )) : <li>{JSON.stringify(parsedData)}</li>}
            </ul>
        </div>
    );
}