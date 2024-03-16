"use client"
import React, { useEffect, useState } from 'react';


//get student data from api route
const getStudentData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Students/${id}`);
  return res.json();  
}

const StudentPage = async ({ params }) => {
  const { id } = params;
  const student = await getStudentData(parseInt(id));
  // student is an array of one object, so we can access the object at index 0
  // could change if database is collection / document changes
  return (
    <div>
      <h1>{student[0].name}</h1>
      <p>Class: {student[0].class}</p>
      <p>Id: {student[0].id}</p>
    </div>
  );
}

export default StudentPage;