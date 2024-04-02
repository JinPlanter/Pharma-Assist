"use client";

import React, { useState, useEffect} from 'react';
import { removeHashtag } from '../Students/components/search-bar';



//note: warning in uncontrolled input unresolved.
// reference for uncontrolled input warning: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable


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
    const [formValues, setFormValues] = useState({});
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const date = getCurrentDate();

    // Fetch form fields from the server
    const  fetchFormFields = async () => {
        try {
            const response = await fetch("/api/grading");
            const data = await response.json();
            //console.log('formFields:', data);
            
            // note: since the data has this structure:
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
            const updatedFormStates = formFields.reduce((acc, curr) => {
                if (curr.label === 'Date') {
                    acc[curr.label] = getCurrentDate(); // Set the current date
                } else {
                    acc[curr.label] = curr.label.includes('Evaluation (total marks)') ? 3 : (curr.type === 'checkbox' ? false : '');
                }
                return acc;
            }, {});

            setFormValues(updatedFormStates);
        };
        
        initializeFormStates();
    }, [formFields]);




    

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
        <form 
        key= {generateFormKey(removeHashtag(student.username))} 
        data-testid= {generateFormKey(removeHashtag(student.username))}
        className='flex  flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black'>
            <div className='mb-4'>
                {/** change student.name to student.firstName or what the student object's variable name for the name */}
                <div className='mb-2 text-lg font-bold' >{`${student.firstName} ${student.lastName} (${removeHashtag(student.username)})`}</div>
                <div className="flex flex-row justify-between" >
                    <div id="TypeA_Row1_Column1" className='flex flex-col justify-evenly'>
                        {formFields.filter(field => field.type !== 'checkbox').map((field, index) => (
                            <label key={index} className='block text-gray-700 text-sm font-bold mb-2'>
                                {field.label}
                            </label>
                        ))}
                    </div>

                    <div id="TypeA_Row1_Column2" className='flex flex-col'>
                        {formFields.filter(field => field.type !== 'checkbox').map((field, index) => (
                            field.label.includes('Evaluation (total marks)') ? (
                                <p key={index} className='mb-2'>{Math.max(0, formValues[field.label])}</p>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.label}
                                    value={field.label.includes('Date') ? date : formValues[field.label]}
                                    placeholder={field.label === 'Date ' ? `${getCurrentDate()}` : `Enter ${field.label}` } 
                                    onChange={handleChange}
                                    key={index}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            )
                        ))}
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div id="TypeB_Row1_Column1" className='flex flex-col justify-between'>
                        {formFields.filter(field => field.type === 'checkbox').map((field, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name={field.label}
                                    value={field.label}
                                    defaultChecked={false}
                                    checked={formValues[field.label]}
                                    onChange={handleChange}
                                    className='mr-2 leading-tight' 
                                />
                                {field.label}<br />
                                {formValues[field.label] &&
                                    <textarea
                                        name={`${field.label}-input`}
                                        value={formValues[`${field.label}-input`] || ''}
                                        defaultValue={''}
                                        onChange={handleChange}
                                        placeholder="Add comment..."
                                        className="h-10 w-full p-2 border rounded-md resize mt-2 shadow appearance-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
