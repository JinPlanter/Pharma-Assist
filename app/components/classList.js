// Import the React module
import React from "react";

// ClassList component that takes in classlist and onStudentClick as props
const ClassList = ({ classlist, onStudentClick }) => {
  // JSX rendering for the ClassList component
  return (
    <ul className="space-y-1 mt-4 flex flex-col">
      {" "}
      {/* Added margin-top here for styling */}
      {/* Map through classlist to create list items for each student */}
      {classlist.map((student) => (
        <li
          key={student.id}
          className="p-2 border bg-cyan-600 rounded-md cursor-pointer transition-all duration-300 hover:bg-yellow-200"
          onClick={() => onStudentClick(student)}
        >
          {/* Display the name of the student */}
          <span className="text-lg font-semibold border border-transparent transition-colors">
            {student.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

// Export the ClassList component as the default export
export default ClassList;
