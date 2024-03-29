"use client";

import React, { useState, useEffect } from 'react';
import FormFields from '../data/gradingForm.json';


function randomNumber() {
    return Math.floor(Math.random() * 1000);
};


async function fetchFormFields() {
    /* try {
        const response = await fetch('../data/gradingForm.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.criteria;
    } catch (error) {
        console.error('Fetch failed, using local data:', error);
        return FormFields.criteria;
    } */

    // current debug statement
    return FormFields.criteria;
}

function Form({student}) {
    
    // attach form to specific student
    const studentId = student?.id;
    const hasStudentId = studentId ? true : false;
    //console.log('studentId:', studentId);

    const [formValues, setFormValues] = useState(() => {
        const initialFormStates = FormFields.criteria.reduce((acc, curr) => {
            acc[curr.label] = curr.label === 'Evaluation (total marks)' ? 3 : (curr.type === 'checkbox' ? false : '');
            return acc;
        }, {});
        return initialFormStates;
    });

    useEffect(() => {
        const initializeFormStates = async () => {
            const formFields = await fetchFormFields();
            const date = new Date();
            const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            const currentDate = localDate.toISOString().slice(0, 10);
            // const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
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
        initializeFormStates();
    }, []);

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
        /** Find a way to save this form form to a specific student */
        <form key= {hasStudentId ? student.id : randomNumber()} >
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div id="TypeA_Row1_Column1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {FormFields.criteria.filter(field => field.type !== 'checkbox').map((field, index) => (
                            <label key={index}>
                                {field.label}
                            </label>
                        ))}
                    </div>

                    <div id="TypeA_Row1_Column2" style={{ display: 'flex', flexDirection: 'column' }}>
                        {FormFields.criteria.filter(field => field.type !== 'checkbox').map((field, index) => (
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
                        {FormFields.criteria.filter(field => field.type === 'checkbox').map((field, index) => (
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
