import React, { useState } from "react";
import gradingForm from "../data/gradingForm.json";

const GradingForm = ({ student }) => {
  const [formValues, setFormValues] = useState({});
  const [comments, setComments] = useState({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const handleCheckboxChange = (criterion) => {
    setFormValues({
      ...formValues,
      [criterion.label]: !formValues[criterion.label],
    });
  };

  const handleTextChange = (criterion, value) => {
    setFormValues({
      ...formValues,
      [criterion.label]: value,
    });
  };

  const handleCommentChange = (criterion, value) => {
    setComments({
      ...comments,
      [criterion.label]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have a function to handle form submission
    handleSubmission();

    // Show success popup
    setIsSuccessPopupOpen(true);

    // Clear form values after submission
    setFormValues({});
    setComments({});
  };

  const handleSubmission = () => {
    // You can implement your logic for handling form submission here
    // For now, let's just log the form values to the console
    console.log("Form submitted:", formValues, comments);
  };

  const renderFormElement = (criterion) => {
    return (
      <div key={criterion.label} className="mb-4">
        {criterion.type === "text" && (
          <div className="mb-2">
            <label
              htmlFor={criterion.label}
              className="text-gray-300 font-bold"
            >
              {criterion.label}
            </label>
            <input
              type="text"
              id={criterion.label}
              value={formValues[criterion.label] || ""}
              onChange={(e) => handleTextChange(criterion, e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md"
            />
          </div>
        )}
        {criterion.type === "checkbox" && (
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={criterion.label}
              checked={formValues[criterion.label] || false}
              onChange={() => handleCheckboxChange(criterion)}
              className="mr-2"
            />
            <label
              htmlFor={criterion.label}
              className="text-gray-300 font-bold"
            >
              {criterion.label}
            </label>
          </div>
        )}
        {criterion.comment && (
          <textarea
            placeholder="Add comment..."
            value={comments[criterion.label] || ""}
            onChange={(e) => handleCommentChange(criterion, e.target.value)}
            className="h-10 w-full p-2 border rounded-md resize-y"
          />
        )}
      </div>
    );
  };

  const closeSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  return (
    <div className="mt-4 max-w-md mx-auto p-4 border rounded-md shadow-lg">
      <h2 className="text-gray-300 text-xl font-bold mb-4">
        Grading Form for {student.name}
      </h2>
      <form onSubmit={handleSubmit}>
        {gradingForm.criteria.map((criterion) => renderFormElement(criterion))}
        <div className="mt-6">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-600"
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
            <button
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-600"
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

export default GradingForm;
