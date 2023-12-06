// Import necessary modules from the React library
import React, { useState } from "react";

// DropdownMenu component that takes in classLists and onSelectClass as props
const DropdownMenu = ({ classLists, onSelectClass }) => {
  // State to track the selected class
  const [selectedClass, setSelectedClass] = useState(null);

  // Event handler for when the selected class changes
  const handleClassChange = (event) => {
    // Retrieve the selected class from the event
    const selectedClass = event.target.value;

    // Update the state with the selected class
    setSelectedClass(selectedClass);

    // Callback to notify parent component about the selected class
    onSelectClass(selectedClass);
  };

  // JSX rendering for the DropdownMenu component
  return (
    <div className="mt-4">
      {/* Label for the dropdown menu */}
      <label
        htmlFor="classSelect"
        className="block text-sm font-medium text-gray-700"
      >
        Select a Class:
      </label>

      {/* Dropdown menu with options */}
      <select
        id="classSelect"
        value={selectedClass}
        onChange={handleClassChange}
        className="mt-1 p-2 border rounded-md cursor-pointer transition-all duration-300 hover:bg-yellow-200 w-full"
      >
        {/* Default option prompting the user to select a class */}
        <option value="" disabled>
          Select a class
        </option>

        {/* Map through classLists to create options for each class */}
        {classLists.map((classList) => (
          <option key={classList} value={classList}>
            {classList}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the DropdownMenu component as the default export
export default DropdownMenu;
