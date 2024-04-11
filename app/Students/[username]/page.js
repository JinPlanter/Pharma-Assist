
//path: app/Students/%5Bid%5D/page.js
"use client"
import React, { useState, useEffect } from 'react';
import handleSaveStudent from '../../customHooks/handleSaveStudent';
import EditableField from '../../components/inputEditStudentInfo';


//get student data from api route
export const getStudentData = async (username) => {
    const res = await fetch(`/api/Students/${username}`);
    return res.json();
};


//update the student data in the database through the api route
export const updateStudentData = async (username, student) => {
    console.log("student: ", student);
    console.log("username: ", username);
    console.log('route: ', `/api/Students/${username}`)
    const res = await fetch(`/api/Students/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });


    if (!res.ok) {
        throw new Error(`Server responded with the status code ${res.status}`);
    }

    return res.json();
};



const StudentPage = ({ params }) => {

    const { username } = params;
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // for editing student data
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState({});
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStudentData(username);
                setStudent(data[0]);
                setEditedStudent({...data[0]}); // copy student data to editedStudent
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


    //handlers for editing student data

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "name") {
            const [firstName, lastName] = value.split(" ");
            setEditedStudent(prevState => ({
                ...prevState,
                firstName,
                lastName
            }));
        } else {
            setEditedStudent(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleEdit= () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedStudent(student);
    };


    const handleSave = async () => {
        try {
            // use the function updateStudentData to update student data in the db
            console.log("username: ", username, "editedStudent: ", editedStudent)
            await updateStudentData(username, editedStudent);
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving student data:", error);
        }
    };


    if (loading) {
        return <div className="text-neutral">Loading...</div>;
    }
    

    if (error) {
        return <div className="text-error">Error: {error.message}</div>;
    }

    return (
        <div className="bg-primary p-4 rounded-md justify-between">
            <div className='flex flex-row justify-between items-center mb-4'>
                <div className="flex flex-row justify-between">
                {isEditing ? (
                <input
                    data-testid="name"
                    className='text-lg bg-transparent rounded-md border border-white py-3 px-4'
                    type="text"
                    name= "name"
                    placeholder={student.firstName + " " + student.lastName}
                    value={editedStudent.firstName + " " + editedStudent.lastName}
                    onChange={handleInputChange}
                />
            ) : (
                <h1 data-testid="name" className="text-2xl font-bold leading-tight tracking-tight text-white md-text-3xl dark:text-white">
                    {student.firstName} {student.lastName}
                </h1>
            )}
                </div>
                <div className='flex items-end space-y-4 space-x-2 align-middle'>
                    <button
                        className="bg-accent pl-2 pr-2 text-lg text-white rounded-md hover:bg-secondary"
                        onClick={isEditing ? handleSave : handleEdit}>
                            {isEditing ? 'Save' : 'Edit'}
                    </button>
                    {isEditing && (
                        <button
                            className="bg-error pl-2 pr-2 text-white rounded-md hover:bg-secondary"
                            onClick={handleCancel}>Cancel</button>
                    )}
                </div>
            </div>
            
            <table className="table-auto text-white w-full mb-5 rounded-md">
                <tbody>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Username:</td>
                        <td data-testid="username" className="border px-4 py-4">
                            <EditableField
                                data-testid="username"
                                isEditing={isEditing}
                                name="username"
                                placeholder={student.username}
                                value={editedStudent.username}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Email:</td>
                        <td data-testid="email" className="border px-4 py-4">
                            <EditableField
                                data-testid="email"
                                isEditing={isEditing}
                                name="email"
                                placeholder={student.email}
                                value={editedStudent.email}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Phone:</td>
                        <td data-testid="phone" className="border px-4 py-4">
                            <EditableField
                                data-testid="phone"
                                isEditing={isEditing}
                                name="phone"
                                placeholder={student.phone}
                                value={editedStudent.phone}
                                onChange={handleInputChange}
                            />
                        </td>
                        
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Emergency Contact:</td>
                        <td data-testid="emergency-contact" className="border px-4 py-4">
                            <EditableField
                                data-testid="emergency-contact"
                                isEditing={isEditing}
                                name="emergencyContact"
                                placeholder={student.emergencyContact}
                                value={editedStudent.emergencyContact}
                                onChange={handleInputChange}
                            />
                        </td>
                        
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Address:</td>
                        <td data-testid="address" className="border px-4 py-4">
                           <EditableField
                                data-testid="address"
                                isEditing={isEditing}
                                name="address"
                                placeholder={student.address}
                                value={editedStudent.address}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">City:</td>
                        <td  data-testid="city" className="border px-4 py-4">
                            <EditableField
                                data-testid="city"
                                isEditing={isEditing}
                                name="city"
                                placeholder={student.city}
                                value={editedStudent.city}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Province:</td>
                        <td data-testid="province" className="border px-4 py-4">
                            <EditableField
                                data-testid="province"
                                isEditing={isEditing}
                                name="province"
                                placeholder={student.province}
                                value={editedStudent.province}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="py-4">
                        <td className="border px-4 py-4">Zip:</td>
                        <td data-testid="zip" className="border px-4 py-4">
                            <EditableField
                                data-testid="zip"
                                isEditing={isEditing}
                                name="zip"
                                placeholder={student.zip}
                                value={editedStudent.zip}
                                onChange={handleInputChange}
                            />
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