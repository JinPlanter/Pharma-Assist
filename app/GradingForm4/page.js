"use client";

import React, { useState, useEffect } from 'react';
import FormFields from '../data/FormFields.json';

async function fetchFormFields() {
    // Fetch form fields from the server

    return FormFields.criteria;
}

function Form() {
    const [formValues, setFormValues] = useState(fetchFormFields);

    useEffect(() => {
        const totalMarks = Object.values(formValues).filter(value => value === true).length;
        setFormValues(prevValues => ({ ...prevValues, 'Evaluation (total marks)': totalMarks }));


        fetchFormFields().then(data => setFormFields(data));
        
        const currentDate = new Date().toISOString().slice(0, 10);
        setFormValues(prevValues => ({ ...prevValues, 'Date': currentDate }));
    }, [formValues]);

    const handleChange = (event) => {
        const { name, type, checked } = event.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: type === 'checkbox' ? checked : prevValues[name] }));
    };

    return (
        <form>
            <label>
                Selected wrong drug
                <input
                    type="checkbox"
                    name="Selected wrong drug"
                    checked={formValues['Selected wrong drug']}
                    onChange={handleChange}
                />
            </label>
            <label>
                Patient profile/wrong patient
                <input
                    type="checkbox"
                    name="Patient profile/wrong patient"
                    checked={formValues['Patient profile/wrong patient']}
                    onChange={handleChange} />
            </label>
            {/* Add other fields as needed */}
            <label>
                Evaluation (total marks)
                <input
                    type="text"
                    name="Evaluation (total marks)"
                    value={formValues['Evaluation (total marks)']}
                    readOnly
                />
            </label>
        </form>
    );
}

export default Form;