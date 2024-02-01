// Import necessary modules from the React library
import React, { useState } from "react";

// Import the grading form data from a JSON file
import gradingForm from "../data/gradingForm.json";

// GradingForm component that takes in a student as a prop
const GradingForm = ({ student }) => {
  // State variables for form values, comments, and success popup
  const [formValues, setFormValues] = useState({});
  const [comments, setComments] = useState({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  // Event handler for checkbox changes
  const handleCheckboxChange = (criterion) => {
    setFormValues({
      ...formValues,
      [criterion.label]: !formValues[criterion.label],
    });
  };

  // Event handler for text input changes
  const handleTextChange = (criterion, value) => {
    setFormValues({
      ...formValues,
      [criterion.label]: value,
    });
  };

  // Event handler for comment changes
  const handleCommentChange = (criterion, value) => {
    setComments({
      ...comments,
      [criterion.label]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have a function to handle form submission
    handleSubmission();

    // Show success popup
    setIsSuccessPopupOpen(true);

    // Clear form values and comments after submission
    setFormValues({});
    setComments({});
  };

  // Placeholder for handling form submission logic
  const handleSubmission = () => {
    // You can implement your logic for handling form submission here
    // For now, let's just log the form values and comments to the console
    console.log("Form submitted:", formValues, comments);
  };

  // Function to render form elements based on gradingForm criteria
  const renderFormElement = (criterion) => {
    return (
      <div key={criterion.label} className="mb-4">
        {criterion.type === "text" && (
          <div className="mb-2">
            {/* Label for text input */}
            <label
              htmlFor={criterion.label}
              className="text-custom-blue font-bold"
            >
              {criterion.label}
            </label>
            {/* Text input */}
            <input
              type="text"
              id={criterion.label}
              value={formValues[criterion.label] || ""}
              onChange={(e) => handleTextChange(criterion, e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md text-custom-black bg-custom-light-gray"
            />
          </div>
        )}
        {criterion.type === "checkbox" && (
          <div className="flex items-center mb-2">
            {/* Checkbox input */}
            <input
              type="checkbox"
              id={criterion.label}
              checked={formValues[criterion.label] || false}
              onChange={() => handleCheckboxChange(criterion)}
              className="mr-2 text-custom-black bg-custom-light-gray"
            />
            {/* Label for checkbox */}
            <label
              htmlFor={criterion.label}
              className="text-custom-blue font-bold"
            >
              {criterion.label}
            </label>
          </div>
        )}
        {criterion.comment && (
          // Textarea for adding comments
          <textarea
            placeholder="Add comment..."
            value={comments[criterion.label] || ""}
            onChange={(e) => handleCommentChange(criterion, e.target.value)}
            className="text-custom-black h-10 w-full p-2 border rounded-md resize-y bg-custom-light-gray"
          />
        )}
      </div>
    );
  };

  // Event handler to close the success popup
  const closeSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  // JSX rendering for the GradingForm component
  return (
    <div className="mt-4 max-w mx-4 p-4 border rounded-md shadow-lg">
      {/* Heading for the grading form */}
      <h2 className="text-gray-300 text-xl font-bold mb-4">
        Grading Form for {student.name}
      </h2>

      {/* Form for grading with criteria */}
      <form onSubmit={handleSubmit}>
        {gradingForm.criteria.map((criterion) => renderFormElement(criterion))}

        {/* Submission button */}
        <div className="mt-6">
          <button
            className="bg-custom-light-blue text-custom-white py-2 px-4 rounded-md cursor-pointer hover:bg-custom-neon-blue"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-green-500 font-bold">
              Student marked successfully!
            </p>
            {/* Button to close the success popup */}
            <button
              className="mt-2 bg-custom-light-blue text-custom-white py-2 px-4 rounded-md cursor-pointer hover:bg-custom-neon-blue"
              onClick={closeSuccessPopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the GradingForm component as the default export
export default GradingForm;
