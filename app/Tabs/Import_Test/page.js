"use client";

import React, { useState } from 'react';

import '../../Styles/style.css'; // Import styles
import Navbar from '../../navbar'; // Import Navbar component


const ImportButton = () => {
    const [students, setStudents] = useState([]);

    const handleImport = () => {
        fetch('../data/classList.json')
            .then(response => {
                if (!response.ok) {
                    console.error(response);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data === null) {
                    throw new Error('JSON data is null');
                }
                setStudents(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <button onClick={handleImport}>Import</button>
                {students.map(student => (
                    <div key={student.id}>
                        <p>Name: {student.name}</p>
                        <p>Class: {student.class}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ImportButton;