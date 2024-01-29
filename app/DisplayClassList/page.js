"use client";

import React, { useState, useEffect } from 'react';
import classListData from '../data/classList.json';
import "../Styles/style.css";
import Navbar from '../navbar';


import GradingForm from '../components/gradingForm';


const ClassList = () => {
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleImport = () => {
        setClassList(classListData);
    };

    const uniqueClasses = [...new Set(classList.map(item => item.class))];
    const filteredStudents = classList.filter(student => student.class === selectedClass);

    // Selection Handling.
    const handleSelect = (e) => {
        setSelectedClass(e.target.value);

        // Reset selected student when changing class
        // setSelectedStudent(null);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };



    return (
        <div>
            <div>
                <h1>Display Class List</h1>
                <Navbar />
            </div>

            <div>
                <button onClick={handleImport}>Import Class List</button>



                {/* Display a dropdown menu to select a class. */}
                {classList.length > 0 && (
                    <div>
                        <select onChange={handleSelect}>
                            <option value="">Select a class</option>
                            {uniqueClasses.map((classItem, index) => (
                                <option key={index} value={classItem}>{classItem}</option>
                            ))}
                        </select>
                    </div>
                )}




                {/* Main content area with flex layout */}
                <div style={{ display: 'flex' }}>

                    {/* Left section for rendering the class list */}
                    <div style={{ flex: 1 }}>

                        {/* Display list of students for the selected class. */}
                        {filteredStudents.map(student => (
                            <div key={student.id} onClick={() => handleStudentClick(student)}>
                                <p>{student.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right section for rendering the grading form */}
                    <div style={{ flex: 2 }}>
                        {selectedStudent && <GradingForm student={selectedStudent} />}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ClassList;