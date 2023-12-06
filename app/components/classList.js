import React from "react";

const ClassList = ({ classlist, onStudentClick }) => {
  return (
    <ul className="space-y-1 mt-4 flex flex-col">
      {" "}
      {/* Added margin-top here */}
      {classlist.map((student) => (
        <li
          key={student.id}
          className="p-2 border bg-cyan-600 rounded-md cursor-pointer transition-all duration-300 hover:bg-yellow-200"
          onClick={() => onStudentClick(student)}
        >
          <span className="text-lg font-semibold border border-transparent transition-colors">
            {student.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ClassList;
