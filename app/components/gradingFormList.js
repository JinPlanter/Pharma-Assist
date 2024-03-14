// components/GradingFormList.jsx
import React, { useState, useEffect } from "react";

const GradingFormList = () => {
  const [gradingForms, setGradingForms] = useState([]);

  useEffect(() => {
    const fetchGradingForms = async () => {
      try {
        const response = await fetch("/api/getFileContent");
        const data = await response.json();
        setGradingForms(data);
      } catch (error) {
        console.error("Error fetching grading forms:", error);
      }
    };

    fetchGradingForms();
  }, []);

  const downloadGradingForm = (form) => {
    const fileData = JSON.stringify(form.fileContentJson, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gradingForm_${form._id}.json`;
    link.click();
  };

  return (
    <div>
      <h2>Grading Forms</h2>
      {gradingForms.length === 0 ? (
        <p>No grading forms found.</p>
      ) : (
        <ul>
          {gradingForms.map((form, index) => (
            <li key={index}>
              <div>
                <h3>Grading Form {index + 1}</h3>
                <pre>{JSON.stringify(form.fileContentJson, null, 2)}</pre>
                <button onClick={() => downloadGradingForm(form)}>
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GradingFormList;
