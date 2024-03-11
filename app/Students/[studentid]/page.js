"use client"
import React, { useEffect, useState } from 'react';

const StudentDetails = ({ student }) => {
  // State to store student data
  const [fetchedStudent, setFetchedStudent] = useState(null);

  // useEffect to fetch data on the client side
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`${process.env.API_BASE_URL}/api/studentData/studentData?studentid=${student.studentid}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch student data: ${res.status}`);
        }

        const { students } = await res.json();
        setFetchedStudent(students || null);
      } catch (error) {
        console.error("Error fetching student data", error);
        setFetchedStudent(null);
      }
    };

    // Fetch data when the component mounts
    fetchStudentData();
  }, [student]); // Dependency array ensures the effect runs when the 'student' prop changes

  // check if student data is available
  if (!fetchedStudent) return <div>Student not found</div>;

  return (
    <div>
      <h1>Student Details</h1>
      <p>
        <strong>Name:</strong> {fetchedStudent.name} <br />
        <strong>Student ID:</strong> {fetchedStudent.studentid} <br />
        <strong>Course:</strong> {fetchedStudent.course} <br />
        <strong>Year:</strong> {fetchedStudent.year} <br />
        <strong>Grade:</strong> {fetchedStudent.grade} <br />
      </p>
    </div>
  );
};

export default StudentDetails;
