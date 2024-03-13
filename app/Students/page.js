
"use client"
import React, {useState, useEffect} from 'react'
import '../globals.css'
import SearchBar from './components/search-bar';



export default function Page() {

    // state to hold fetched data
    const [students, setStudents] = useState([]);

    // Fetch data from MongoDB when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Students");
      const data = await response.json();
      setStudents(data); // Assuming data is an array of student objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Student Search</h1>
      <SearchBar data={students} />
    </div>
  );
}