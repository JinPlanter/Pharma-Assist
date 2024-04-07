
//path: app/Students/%5Bid%5D/page.js
"use client"
import React, { useState, useEffect } from 'react';


//get student data from api route
export const getStudentData = async (username) => {
    const res = await fetch(`/api/Students/${username}`);
    return res.json();
};



const StudentPage = ({ params }) => {

    //test what are in params
    console.log(params);

    const { username } = params;
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStudentData(username);
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
    }, [username]);

    if (loading) {
        return <div className="text-neutral">Loading...</div>;
    }

    if (error) {
        return <div className="text-error">Error: {error.message}</div>;
    }

    return (
        <div className="bg-primary p-4 rounded-md justify-between">
            <h1
                data-testid="student-name"
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md-text-2xl dark:text-white md:text-2xl ">
                {student.firstName} {student.lastName}</h1>
            <table className="table-auto text-white w-full mb-5">
                <tbody>
                    <tr className="">
                        <td className="border px-4 py-2">Id:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                                <div data-testid="student-username">{student.username}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Email:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                                <div>{student.email}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Phone:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                                <div>{student.phone}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Emergency Contact:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                            <div>{student.emergencyContact}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Address:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                            <div>{student.address}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">City:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                            <div>{student.city}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Province:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                            <div>{student.province}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Zip:</td>
                        <td className="border px-4 py-2">
                            <div className="flex flex-row justify-between">
                            <div>{student.zip}</div>
                                <button
                                className="bg-accent pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                                onClick={() => {}}>Edit</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
        </table>
        <div className='mb-5'>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-white md-text-2xl dark:text-white">
                Courses</h2>
        </div>

        <div className='mb-5'>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-white md-text-2xl dark:text-white">Labs completed</h2>
        
        </div>

        </div>
    );
}

export default StudentPage;