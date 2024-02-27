
"use client";
import React from 'react';

import { useRouter } from 'next/navigation';



const StudentPage = () => {
    const router = useRouter();
    console.log(router.query);

    const handleGoBack = () => {
        router.push('/Students');
    }
  return (
    <div>
        <button onClick={handleGoBack}>Go Back</button>
        <h1> Student Profile</h1>
        <p> render student details next: name, email, graded labs, in progress, ungraded labs</p>
    </div>
  )
}

export default StudentPage;