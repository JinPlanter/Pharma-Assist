"use client";

// Import necessary modules from the React library
import React, { useState, useEffect } from 'react';

// Import components and data
import ClassList from '../components/classList';
import Form from '../components/gradingForm4';
import DropdownMenu from '../components/dropdown';
import '../globals.css'
import FormValuesProvider from '../contexts/gradeform-context';
import PdfViewer from '../components/reactpdf';



// function to fetch class data from the database
export const getClassData = async () => {
    try {
        const response = await fetch("/api/getFileContent");
        const data = await response.json();

        console.log('unparsed data: ', data);

        // parse the data to only get the class list content
        // variable to hold parsed data
        let parsedData = [];
        for (let i = 0; i < data.length; i++) {
            parsedData = parsedData.concat([data[i].fileContentJson]);
        }

        console.log(parsedData);

        return parsedData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};


// function to create class names based on the number of objs or elements
// in the class list
// if i want a format: Class A, Class B, ... Class N
// is there an inbuilt function that can do this? generate chars: A to Z?
// or i could just use a simple counter...
// found one: String.fromCharCode(65 + i)
// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode

export const generateClassNames = (classLists) => {
    const baseClassName = 'Class';
    const classNames = [];

    if (classLists.length === 0) {
        return [];
    }
    else if (classLists.length > 0 && classLists.length < 27) {
        for (let i = 0; i < classLists.length; i++) {
            classNames.push(`${baseClassName} ${String.fromCharCode(65 + i)}`);
        }
        return classNames;  
    }
};



// Grading component
const Grading = () => {
    // State variables to hold class data
    const [classLists, setClassLists] = useState([]);
    // state variables to hold class names
   const [classNames, setClassNames] = useState([]);


    // Fetch class data from the database when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch class data from the database
                const data = await getClassData();
                console.log('data: ', data);

                // Fetch class data and set classLists state variable
                setClassLists(data);
                //console.log('class lists: ', classLists);

                // generate class names based
                // on the number of class lists
                const names = generateClassNames(data);
                //console.log('names: ', names);
                setClassNames(names);
                
                //check if data is added to classNames
                console.log('class names: ', classNames);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
      
        fetchData();
        
    }, []);

    // check state variables
    console.log('class lists: ', classLists);
    console.log('class names: ', classNames);

    // State variables to track selected class and student
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Event handler for selecting a class
    const handleClassSelect = (selectedClass) => {
        setSelectedClass(selectedClass);
        setSelectedStudent(null); // Reset selected student when changing class
    };

    // Event handler for clicking on a student in the class list
    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    // Function to render the appropriate ClassList based on the selected class
    const renderClassList = () => {
        // find index of selected class in classNames
        const classIndex = classNames.indexOf(selectedClass);
        //console.log('class index: ', classIndex);
        //console.log('selected class: ', selectedClass);
        //console.log('class names: ', classNames);

        // if selected class is found in classNames
        if (classIndex !== -1) {
            // get the class list data for the selected class
            const classListData = classLists[classIndex];
            console.log('class list data: ', classListData);

            // render the ClassList component with the class list data
            return (
                <ClassList
                    classlist={classListData}
                    onStudentClick={handleStudentClick}
                />
            );
        }

        // return null otherwise
        return null;
    };

    // JSX rendering for the Grading component
    return (
        <FormValuesProvider>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col md:flex-row mb-4 mx-4 w-full justify-between'>
                    {/* DropdownMenu component for selecting a class + class list */}
                    <div className='w-full md:w-1/3'>
                        <DropdownMenu
                            classLists={classNames} // Add more class lists if needed
                            onSelectClass={handleClassSelect}
                        />

                        {/* Left section for rendering the class list */}
                        <div className='mt-4'>
                            {renderClassList()}
                        </div>
                    </div>

                    {/* Right section for rendering the grading form */}
                    <div className="w-full md:w-2/3 ml-5 md:ml-5">
                        <div className="flex-grow mt-10 mr-5">
                            {selectedStudent && <Form student={selectedStudent} />}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center w-full mt-4'>
                    <PdfViewer />
                </div>

            </div>
        </FormValuesProvider>
    );
};

// Export the Grading component as the default export
export default Grading;
