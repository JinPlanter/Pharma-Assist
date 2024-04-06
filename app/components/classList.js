// Import the React module
import React, {useState, useEffect } from "react";
import { removeHashtag } from "../Students/components/search-bar";


function useWindowSize(){
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

    return (
        <ul className="" 
        style={{
            height: size.width <= 768 ? '30vh': '80vh', 
            overflowY: 'auto'}}>
            {" "}
            {/* Added margin-top here for styling */}
            {/* Map through classlist to create list items for each student */}
            {classlist.map((student) => (
                <li
                    key={removeHashtag(student.username)}
                    className={`classListItem ${selectedStudent === student ? "bg-red-500" : ""}`}
                    onClick={() => onStudentClick(student)}
                >
                    {/* Display the name of the student */}
                    <span className="classListStudent">
                        {`${student.firstName} ${student.lastName}`}
                    </span>
                </li>
            ))}
        </ul>
    );
};

// Export the ClassList component as the default export
export default ClassList;
