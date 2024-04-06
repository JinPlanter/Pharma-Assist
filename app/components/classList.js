// Import the React module
import React from "react";
import { removeHashtag } from "../Students/components/search-bar";

// ClassList component that takes in classlist and onStudentClick as props
const ClassList = ({ classlist, onStudentClick }) => {
    // JSX rendering for the ClassList component

    return (
        <ul className="classList" style={{height: '80vh', overflowY: 'auto'}}>
            {" "}
            {/* Added margin-top here for styling */}
            {/* Map through classlist to create list items for each student */}
            {classlist.map((student) => (
                <li
                    key={removeHashtag(student.username)}
                    className="classListItem"
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
