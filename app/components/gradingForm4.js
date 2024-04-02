"use client";

import React, { useState, useEffect, use } from 'react';
import { removeHashtag } from '../Students/components/search-bar';






// function to generate the current date
export const getCurrentDate = () => {
    const date = new Date();
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 10);
}


// function to handle the form submission and update the student's grading data in the database
    // put the code here to save the form data to the database? 
    // or call a function from the parent component to do so?


    // function to generate a unique key for each form instance to associate with a specific student
    // this key can be used to identify the form data when saving it to the database
    // or to differentiate between different form instances on the same page
    // e.g., if multiple students are being graded at the same time
    // how to generate a unique key for each form instance?
    // or use a combination of the student's identifier and the current date/time
    export const generateFormKey = (studentIdentifier) => {
        const currentDate = getCurrentDate();
        return `${studentIdentifier}-${currentDate}`;
    }





const  Form = ({ student }) => {

    
    const [formFields, setFormFields] = useState([]);


    // Fetch form fields from the server
    const  fetchFormFields = async () => {
        try {
            const response = await fetch("/api/grading");
            const data = await response.json();
            console.log('formFields:', data);
            // since the data has this structure:
            //         [{criteria:[{label:"",type:string, comment:false}, ...]}]
            // have to get just the criteria array
            setFormFields(data[0].criteria);
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    
    useEffect(() => {
        fetchFormFields();
    }, []);
    // note: have to initialize the form fields before the form values are set


    useEffect(() => {
        const initializeFormStates = () => {
            console.log('formFields:', formFields);
            const currentDate = getCurrentDate();
            console.log('currentDate:', currentDate);

            const updatedFormStates = formFields.reduce((acc, curr) => {
                if (curr.label === 'Date') {
                    acc[curr.label] = currentDate; // Set the current date
                } else {
                    acc[curr.label] = curr.label === 'Evaluation (total marks)' ? 3 : (curr.type === 'checkbox' ? false : '');
                }
                return acc;
            }, {});

            setFormValues(updatedFormStates);
        };
        
        if (formFields.length > 0) {
            initializeFormStates();
        }
    }, [formFields]);


    const [formValues, setFormValues] = useState({});
    useEffect(() => {
        const initializeFormStates = () => {
            console.log('formFields:', formFields);
            const currentDate = getCurrentDate();
            console.log('currentDate:', currentDate);

            const updatedFormStates = formFields.reduce((acc, curr) => {
                if (curr.label === 'Date') {
                    acc[curr.label] = currentDate; // Set the current date
                } else {
                    acc[curr.label] = curr.label === 'Evaluation (total marks)' ? 3 : (curr.type === 'checkbox' ? false : '');
                }
                return acc;
            }, {});

            setFormValues(updatedFormStates);
        };

        if (formFields.length > 0) {
            initializeFormStates();
        }
    }, [formFields]);



    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        let newFormValues = { ...formValues, [name]: type === 'checkbox' ? checked : value };

        // If the form field type is checkbox, adjust the "Evaluation (total marks)" value based on checkbox selection.
        if (type === 'checkbox') {
            let evaluationTotalMarks = Number(newFormValues['Evaluation (total marks)']);
            if (isNaN(evaluationTotalMarks)) {
                evaluationTotalMarks = 0;
            }
            newFormValues['Evaluation (total marks)'] = checked ? evaluationTotalMarks - 1 : evaluationTotalMarks + 1;

            // Update the selectedCheckboxes state
            setSelectedCheckboxes({ ...selectedCheckboxes, [name]: checked });
        }

        setFormValues(newFormValues);
    };


    

    return (
        /** use the key for saving the data of this form; change student.id for whatever identifier is used in the db*/
        <form key= {generateFormKey(removeHashtag(student.username))} data-testid= {generateFormKey(removeHashtag(student.username))}>
            <div>
                {/** change student.name to student.firstName or what the student object's variable name for the name */}
                <div>{`${student.firstName} ${student.lastName} (${removeHashtag(student.username)})`}</div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div id="TypeA_Row1_Column1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => field.type !== 'checkbox').map((field, index) => (
                            <label key={index}>
                                {field.label}
                            </label>
                        ))}
                    </div>

                    <div id="TypeA_Row1_Column2" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => field.type !== 'checkbox').map((field, index) => (
                            field.label === 'Evaluation (total marks)' ? (
                                <p key={index}>{Math.max(0, formValues[field.label])}</p>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.label}
                                    value={formValues[field.label] || ''}
                                    onChange={handleChange}
                                    key={index}
                                />
                            )
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div id="TypeB_Row1_Column1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => field.type === 'checkbox').map((field, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name={field.label}
                                    checked={formValues[field.label]}
                                    onChange={handleChange}
                                />
                                {field.label}<br />
                                {formValues[field.label] &&
                                    <textarea
                                        name={`${field.label}-input`}
                                        value={formValues[`${field.label}-input`] || ''}
                                        onChange={handleChange}
                                        placeholder="Add comment..."
                                        className="h-10 w-full p-2 border rounded-md resize"
                                    />
                                }
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Form;
