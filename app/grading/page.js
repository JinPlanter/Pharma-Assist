"use client";

// Import necessary modules from the React library
import React, { useState } from 'react';

// Import components and data
import ClassList from '../components/classList';
import GradingForm from '../components/gradingForm';
import DropdownMenu from '../components/dropdown';
import classA from '../data/classA.json';
import classB from '../data/classB.json';
import '../Styles/style.css'; // Import styles
import Navbar from '../navbar';

// Grading component
const Grading = () => {
  // State variables to track selected class and student
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Event handler for selecting a class
  const handleClassSelect = (selectedClass) => {
    setSelectedClass(selectedClass);
    setSelectedStudent(null); // Reset selected student when changing class
  };

  // Event handler for clicking on a student in the class list
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Function to render the appropriate ClassList based on the selected class
  const renderClassList = () => {
    if (selectedClass === 'Class A') {
      return <ClassList classlist={classA} onStudentClick={handleStudentClick} />;
    } else if (selectedClass === 'Class B') {
      return <ClassList classlist={classB} onStudentClick={handleStudentClick} />;
    }
    // Add more conditions if you have additional class lists
    return null;
  };

  // JSX rendering for the Grading component
  return (
    <div>
      {/* Heading for the grading app */}
      <h1>Grading App</h1>
      
      {/* Navbar component */}
      <Navbar />
      
      {/* DropdownMenu component for selecting a class */}
      <DropdownMenu
        classLists={['', 'Class A', 'Class B']} // Add more class lists if needed
        onSelectClass={handleClassSelect}
      />
      
      {/* Main content area with flex layout */}
      <div style={{ display: 'flex' }}>
        
        {/* Left section for rendering the class list */}
        <div style={{ flex: 1 }}>
          {renderClassList()}
        </div>
        
        {/* Right section for rendering the grading form */}
        <div style={{ flex: 2 }}>
          {selectedStudent && <GradingForm student={selectedStudent} />}
        </div>
      </div>
    </div>
  );
};

// Export the Grading component as the default export
export default Grading;
