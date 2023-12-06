"use client";

import React, { useState } from 'react';
import ClassList from '../components/classList';
import GradingForm from '../components/gradingForm';
import DropdownMenu from '../components/dropdown';
import classA from '../data/classA.json';
import classB from '../data/classB.json';
import "../Styles/style.css";
import Navbar from '../navbar';


const Grading = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClassSelect = (selectedClass) => {
    setSelectedClass(selectedClass);
    setSelectedStudent(null); // Reset selected student when changing class
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const renderClassList = () => {
    if (selectedClass === 'Class A') {
      return <ClassList classlist={classA} onStudentClick={handleStudentClick} />;
    } else if (selectedClass === 'Class B') {
      return <ClassList classlist={classB} onStudentClick={handleStudentClick} />;
    }
    // Add more conditions if you have additional class lists
    return null;
  };

  return (
    <div>
      <h1>Grading App</h1>
      <Navbar />
      <DropdownMenu
        classLists={['', 'Class A', 'Class B']} // Add more class lists if needed
        onSelectClass={handleClassSelect}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {renderClassList()}
        </div>
        <div style={{ flex: 2 }}>
          {selectedStudent && <GradingForm student={selectedStudent} />}
        </div>
      </div>
    </div>
  );
};

export default Grading;
