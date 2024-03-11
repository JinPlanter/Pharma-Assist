"use client";

import React, { useState, useEffect } from 'react';
import FormFields from '../data/gradingForm.json';

async function fetchFormData() {
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

    return FormFields.criteria;
}

function MyForm() {
    const [formValues, setFormValues] = useState({});
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        /*
        `new Date()` creates a new date object.
        `toISOString()` converts the date to a string in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
        `.slice(0, 10)` extracts the date and removes the time.
        */

        fetchFormData().then(data => setFormData(data));
        setFormValues(prevValues => ({ ...prevValues, 'Date ': currentDate }));
        /*
        `prevValues` is the previous state of `formValues` that gets spread into the new state.
        The 'Date' form field is then autofilled with the value of `currentDate`.
        */
    }, []);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    if (!formData) return null;

    return (
        <form>
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ marginRight: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {formData.filter(field => field.type === 'checkbox').map((field, index) => (
                            field.comment ? (
                                <label key={index}>
                                    {field.label}
                                    <input
                                        type="checkbox"
                                        name={field.label}
                                        // onChange={handleChange}
                                        // `onChange={handleChange}` prints the value "on" into the comment form field.
                                    />
                                </label>
                            ) : (<br key={index} />
                            )))}
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {formData.map((field, index) => (
                            <label key={index}>
                                {field.label}:
                                <input
                                    type="text"
                                    name={field.label}
                                    value={formValues[field.label] || ''}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </form>
    );
}

export default MyForm;