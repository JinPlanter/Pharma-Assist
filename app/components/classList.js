// Import the React module
import React, { useState } from "react";

// ClassList component that takes in classlist and onStudentClick as props
const ClassList = ({ classlist, onStudentClick }) => {
  // make li highlighted once clicked
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Function to handle the click event on a student
  const handleClick = (student) => {
    // Call the onStudentClick function passed in as a prop
    onStudentClick(student);
    // Set the selected student to the student that was clicked
    setSelectedStudent(student);
  };

  // JSX rendering for the ClassList component
  return (
    <ul className="classList">
      {" "}
      {/* Added margin-top here for styling */}
      {/* Map through classlist to create list items for each student */}
      {classlist.map((student) => (
        <li
          key={student.id}
          className={`classListItem ${selectedStudent && selectedStudent.id === student.id ? "selected" : ""}`}
          onClick={() => handleClick(student)}
        >
          {/* Display the name of the student */}
          <span className="classListStudent">
            {student.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

// Export the ClassList component as the default export
export default ClassList;
