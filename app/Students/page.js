
"use client";
import React from 'react'
// import '../Styles/style.css';
import '../globals.css'
import classA from '../data/classA.json';
import classB from '../data/classB.json';
import SearchBar from './components/search-bar';



export default function Page() {
    
    return (
        <div>
            <main>
                <h1>ClassStudentPage</h1>
                <SearchBar 
                data={[...classA, ...classB]}
                />

            </main>
        </div>
       
    )
}