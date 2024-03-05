
"use client";
import React from 'react'
// import '../Styles/style.css';
import '../globals.css'
import { useState } from 'react';
import classA from '../data/classA.json';
import classB from '../data/classB.json';
import SearchBar from './components/search-bar';



export default function Page() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const handleStudentClick = (student) => {
        setSelectedStudent(student);
      };
    return (
        <div>
            <main>
                <h1>ClassStudentPage</h1>
                <SearchBar data={[...classA,...classB]}/>

            </main>
        </div>
    )
}