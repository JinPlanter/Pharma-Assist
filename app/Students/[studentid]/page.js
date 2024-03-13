"use client"
import React, { useEffect, useState } from 'react';

const StudentDetails = ({ id }) => {
  // State to store student data
  const [fetchedStudent, setFetchedStudent] = useState(null);

  // useEffect to fetch data on the client side
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`${process.env.API_BASE_URL}/api/Students/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch student data: ${res.status}`);
        }

        const data = await res.json();
        setFetchedStudent(data|| null);
      } catch (error) {
        console.error("Error fetching student data", error);
        setFetchedStudent(null);
      }
    };

    

    // Fetch data when the component mounts
    if (id){
      fetchStudentData();
    }

  }, [id]); // Dependency array ensures the effect runs when the 'student' prop changes

  // check if student data is available
  if (!fetchedStudent) return <div>Student is not found</div>;

  return (
    <div>
      <h1>Student Details</h1>
      <p>
        <strong>Name:</strong> {fetchedStudent.name} <br />
        <strong>Student ID:</strong> {fetchedStudent.id} <br />
        <strong>Class:</strong> {fetchedStudent.class} <br />
      </p>
    </div>
  );
};

export default StudentDetails;
