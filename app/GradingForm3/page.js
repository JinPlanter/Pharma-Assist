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

    return FormFields.criteria;
}

function MyForm() {
    const [formValues, setFormValues] = useState({
        'Evaluation (total marks)': 3
    });
    const [formFields, setFormFields] = useState(null);
    // const [toggledItems, setToggledItems] = useState({});
    // const [isToggled, setIsToggled] = useState(false);
    // const [marks, setMarks] = useState(3);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        /*
        `new Date()` creates a new date object.
        `toISOString()` converts the date to a string in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
        `.slice(0, 10)` extracts the date and removes the time.
        */

        fetchFormFields().then(data => setFormFields(data));
        setFormValues(prevValues => ({ ...prevValues, 'Date': currentDate }));
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

    const handleToggle = (e, isActive) => {
        if (e.target.type === 'checkbox' && isActive) {
            setFormValues(prevValues => {


                let newMarks = e.target.checked ?
                    (prevValues['Evaluation (total marks)'] - 1) :
                    Math.min(prevValues['Evaluation (total marks)'] + 1, 3);

                return {
                    ...prevValues,
                    'Evaluation (total marks)': newMarks
                };
            });
        }
        console.log(e.target.name);
    };

    if (!formFields) return null;

    return (
        <form>
            <div>


                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div id="TypeA_Row1_Column1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => !field.comment).map((field, index) => (
                            <label key={index}>
                                {field.label}
                            </label>
                        ))}
                    </div>

                    <div id="TypeA_Row1_Column2" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => !field.comment).map((field, index) => (
                            <input
                                type="text"
                                name={field.label}
                                value={formValues[field.label] || ''}
                                onChange={handleChange}
                                key={index}
                            />
                        ))}
                    </div>
                </div>

                <br />

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div id="TypeB_Row1_Column1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {formFields.filter(field => field.type === 'checkbox').map((field, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name={field.label}
                                    onChange={handleToggle}
                                />
                                {field.label}<br />
                                <textarea
                                    placeholder="Add comment..."
                                    className="h-10 w-full p-2 border rounded-md resize"
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