import React, { useState, useEffect } from "react";

const GradingFormList = () => {
  const [gradingForms, setGradingForms] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({});

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

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditedData(student);
  };

  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSaveStudent = async () => {
    try {
      const encodedUsername = encodeURIComponent(editingStudent.username);
      const response = await fetch(`/api/updateStudent/${encodedUsername}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        console.log("Student updated successfully");
        setEditingStudent(null);
        setEditedData({});
        // Optionally, you can refetch the updated data from the server
      } else {
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

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
                <ul>
                  {form.fileContentJson.map((student, idx) => (
                    <li key={idx}>
                      {editingStudent === student ? (
                        <div>
                          <p>Username: {student.username} First Name: {student.firstName} Last Name: {student.lastName} Email: {student.email}</p>
                          <input
                            type="text"
                            value={editedData.firstName}
                            onChange={(e) => handleInputChange(e, "firstName")}
                          />
                          <input
                            type="text"
                            value={editedData.lastName}
                            onChange={(e) => handleInputChange(e, "lastName")}
                          />
                          <input
                            type="email"
                            value={editedData.email}
                            onChange={(e) => handleInputChange(e, "email")}
                          />
                          <button onClick={handleSaveStudent}>Save</button>
                        </div>
                      ) : (
                        <div>
                          <span>Username: {student.username} </span>
                          <span>First Name: {student.firstName} </span>
                          <span>Last Name: {student.lastName} </span>
                          <span>Email: {student.email} </span>
                          <button onClick={() => handleEditStudent(student)}>
                            Edit
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
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
