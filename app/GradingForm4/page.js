"use client";

import React, { useState, useEffect } from 'react';
import FormFields from '../data/gradingForm.json';

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

function Form() {
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
        }

        setFormValues(newFormValues);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {FormFields.criteria.filter(field => ["Rx#", "Date", "Patient Name"].includes(field.label)).map((field, index) => (
                    <label key={index}>
                        {field.label}
                        <input type="text" name={field.label} value={formValues[field.label]} onChange={handleChange} />
                    </label>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {FormFields.criteria.filter(field => !["Rx#", "Date", "Patient Name"].includes(field.label)).map((field, index) => (
                    <label key={index}>
                        {field.label}
                        {field.type === 'checkbox' ? (
                            <input type="checkbox" name={field.label} checked={formValues[field.label]} onChange={handleChange} />
                        ) : (
                            field.label === 'Evaluation (total marks)' ? (
                                <p>{Math.max(0, formValues[field.label])}</p>
                            ) : (
                                <input type="text" name={field.label} value={formValues[field.label]} onChange={handleChange} />
                            )
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Form;