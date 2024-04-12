// UploadClassList.js
"use client";
import React, { useState } from "react";

export default function UploadClassList() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const fileReader = new FileReader();

            fileReader.onload = async () => {
                try {
                    const fileContentString = fileReader.result;

                    // Convert CSV string to an array of objects
                    const csvData = fileContentString
                        .trim()
                        .split("\n")
                        .slice(1) // Skip the header row
                        .map((row) => {
                            const cells = row.split(",");
                            const [username, lastName, firstName, email] = cells;
                            return { username, lastName, firstName, email };
                        });

                    console.log("Parsed CSV data:", csvData); // Debug

                    // Send csvData to the server as JSON
                    const response = await fetch("/api/upload", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(csvData), // Send the CSV data as JSON
                    });

                    if (response.ok) {
                        console.log("Upload successful");
                    } else {
                        console.error("Upload failed");
                    }
                } catch (error) {
                    console.error("Error processing file content:", error);
                }
            };

            fileReader.readAsText(file); // Read file as text
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <h1>Upload Class List</h1>
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={handleFileChange}
            />
            <button className="btn btn-ghost border-white" onClick={handleUpload}>Upload</button>
        </div>
    );
}