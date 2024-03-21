
import React from 'react';


//metadata
export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const student = await getStudentData(parseInt(id));
  return {
    title: `Pharmacy Assistant Grading Tool: ${student[0].name}`,
    description: `Student: ${student[0].name}`
  }
};


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
    <div className="bg-custom-black">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md-text-2xl dark:text-white ">{student[0].name}</h1>
      <div className="text-center align-middle flex flex-col">
        <p>Class: {student[0].class}</p>
        <p>Id: {student[0].id}</p>
      </div>
      
    </div>
  );
}

export default StudentPage;