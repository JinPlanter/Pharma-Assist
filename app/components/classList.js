// Import the React module
import React, {useState, useEffect } from "react";
import { removeHashtag } from "../Students/components/search-bar";



// Custom hook to get the window size
export function useWindowSize(){
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize(){
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

// ClassList component that takes in classlist and onStudentClick as props
const ClassList = ({ classlist, onStudentClick, selectedStudent }) => {
    
    const size = useWindowSize();

    // sort the students in alphabetical order by their first and last name
    const sortedClassList = [...classlist].sort((a, b) => {
        // compare first names
        const firstNameComparison = a.firstName.localeCompare(b.firstName);

        // if first names are the same, compare last names
        if (firstNameComparison === 0) {
            return a.lastName.localeCompare(b.lastName);
        }

        // otherwise, return the comparison of first names
        return firstNameComparison;
    });

    return (
        <ul className="bg-primary" 
        style={{
            height: size.width <= 768 ? '30vh': '80vh', 
            overflowY: 'auto'}}>
            {" "}
            {/* Added margin-top here for styling */}
            {/* Map through classlist to create list items for each student */}
            {sortedClassList.map((student) => (
                <li
                    key={removeHashtag(student.username)}
                    className={`rounded border-secondary text-center px-4 py-2 hover:bg-secondary dark:hover:bg-secondary cursor pointer ${selectedStudent === student ? 'bg-accent' : ''}`}
                    onClick={() => onStudentClick(student)}
                >
                    {/* Display the name of the student */}
                    <span className="text-custom-white font-semibold text-xl">
                        {`${student.firstName} ${student.lastName}`}
                    </span>
                </li>
            ))}
        </ul>
    );
};

// Export the ClassList component as the default export
export default ClassList;
