
"use client";
import React, {useState, useEffect} from 'react'
import '../globals.css'
import SearchBar from './components/search-bar';


export default function Page() {

    // state to hold fetched data
    const [students, setStudents] = useState([]);
    

  const fetchData = async () => {
    try {
      const response = await fetch("/api/Students");
      const data = await response.json();
      setStudents(data); // Assuming data is an array of student objects
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // Fetch data from MongoDB when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-custom-black'>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md-text-2xl dark:text-white">Student Search Page</h1>
      <SearchBar data-testid="search-bar" data={students} />
    </div>
  );
}