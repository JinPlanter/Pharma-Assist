"use client";

import React, { useState, useEffect } from 'react';
import classListData from '../data/classList.json';
import "../Styles/style.css";
import Navbar from '../navbar';


import GradingForm from '../components/gradingForm';


const ClassList = () => {
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleImport = () => {
        setClassList(classListData);
    };

    const handleSelect = (e) => {
        setSelectedClass(e.target.value);

        // Reset selected student when changing class
        setSelectedStudent(null);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };


    const renderClassList = () => {
        {classList.length > 0 && (
            <div>
                <select onChange={handleSelect}>
                    <option value="">Select a class</option>
                    {uniqueClasses.map((classItem, index) => (
                        <option key={index} value={classItem}>{classItem}</option>
                    ))}
                </select>

                {filteredStudents.map(student => (
                    <div key={student.id}>
                        <p>{student.name}</p>
                    </div>
                ))}
            </div>
        )}
      };

    const uniqueClasses = [...new Set(classList.map(item => item.class))];

    const filteredStudents = classList.filter(student => student.class === selectedClass);

    return (
        <div>
            <div>
                <h1>Display Class List</h1>
                <Navbar />
            </div>

            <div>
                <button onClick={handleImport}>Import Class List</button>
            </div>
            
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

export default ClassList;