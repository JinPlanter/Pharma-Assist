// UploadClassList.js
"use client";
// UploadClassList.js
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
          const fileContentJson = JSON.parse(fileContentString);

          console.log("Parsed JSON content:", fileContentJson); // Debug

          // Send fileContentJson to the server as JSON
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fileContentJson), // Send the JSON content directly
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
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
