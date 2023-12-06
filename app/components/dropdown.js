import React, { useState } from "react";

const DropdownMenu = ({ classLists, onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    onSelectClass(selectedClass);
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="classSelect"
        className="block text-sm font-medium text-gray-700"
      >
        Select a Class:
      </label>
      <select
        id="classSelect"
        value={selectedClass}
        onChange={handleClassChange}
        className="mt-1 p-2 border rounded-md cursor-pointer transition-all duration-300 hover:bg-yellow-200 w-full"
      >
        <option value="" disabled>
          Select a class
        </option>
        {classLists.map((classList) => (
          <option key={classList} value={classList}>
            {classList}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
