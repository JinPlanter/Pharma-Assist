
//path: app/Students/%5Bid%5D/page.js
"use client"
import React, {useState, useEffect} from 'react';

//get student data from api route
export const getStudentData = async (id) => {
  const res = await fetch(`/api/Students/${id}`);
  return res.json();  
};



const StudentPage = ({ params }) => {
  const { id } = params;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentData(id);
        setStudent(data[0]);
        // student is an array of one object, so we can access the object at index 0
        // could change if database is collection / document changes
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // cleanup function
    return () => {
      setStudent(null);
      setLoading(true);
      setError(null);
    };
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className="bg-custom-black">
      <h1 
      className="text-xl font-bold leading-tight tracking-tight text-gray-900 md-text-2xl dark:text-white ">
        {student.name}</h1>
      <div className="text-center align-middle flex flex-col">
        <p>Class: {student.class}</p>
        <p>Id: {student.id}</p>
      </div>
      
    </div>
  );
}

export default StudentPage;