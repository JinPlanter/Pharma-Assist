"use client";

import React, { useState, useEffect } from "react";
import FormFields from "../data/gradingForm.json";

function randomNumber() {
  return Math.floor(Math.random() * 1000);
}

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

  // current debug statement
  return FormFields.criteria;
}

function Form({ student }) {
  // attach form to specific student
  const studentId = student?.id;
  const hasStudentId = studentId ? true : false;
  //console.log('studentId:', studentId);

  const [formValues, setFormValues] = useState(() => {
    const initialFormStates = FormFields.criteria.reduce((acc, curr) => {
      acc[curr.label] =
        curr.label === "Evaluation (total marks)"
          ? 3
          : curr.type === "checkbox"
          ? false
          : "";
      return acc;
    }, {});
    return initialFormStates;
  });

  useEffect(() => {
    const initializeFormStates = async () => {
      const formFields = await fetchFormFields();
      const date = new Date();
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const currentDate = localDate.toISOString().slice(0, 10);
      // const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
      console.log("currentDate:", currentDate);

      const updatedFormStates = formFields.reduce((acc, curr) => {
        if (curr.label === "Date") {
          acc[curr.label] = currentDate; // Set the current date
        } else {
          acc[curr.label] =
            curr.label === "Evaluation (total marks)"
              ? 3
              : curr.type === "checkbox"
              ? false
              : "";
        }
        return acc;
      }, {});

      setFormValues(updatedFormStates);
    };
    initializeFormStates();
  }, []);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    let newFormValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };

    // If the form field type is checkbox, adjust the "Evaluation (total marks)" value based on checkbox selection.
    if (type === "checkbox") {
      let evaluationTotalMarks = Number(
        newFormValues["Evaluation (total marks)"]
      );
      if (isNaN(evaluationTotalMarks)) {
        evaluationTotalMarks = 0;
      }
      newFormValues["Evaluation (total marks)"] = checked
        ? evaluationTotalMarks - 1
        : evaluationTotalMarks + 1;

      // Update the selectedCheckboxes state
      setSelectedCheckboxes({ ...selectedCheckboxes, [name]: checked });
    }

    setFormValues(newFormValues);
  };

  return (
    /** Find a way to save this form form to a specific student */
    <form key={hasStudentId ? student.id : randomNumber()}>
      <div className="min-h-screen p-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center text-black">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-bold text-5xl text-white mb-3">Grading Form</h2>

            <div className="bg-primary rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg text-gray-200">
                    Lab Details
                  </p>
                  <p className="text-gray-400">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5" id="TypeA_Row1_Column2">
                      {FormFields.criteria
                        .filter((field) => field.type !== "checkbox")
                        .map((field, index) => (
                          <div
                            key={index}
                            className="flex items-center mb-3 text-l"
                          >
                            <label className="mr-2">{field.label}</label>
                            {field.label === "Evaluation (total marks)" ? (
                              <p>{Math.max(0, formValues[field.label])}</p>
                            ) : (
                              <input
                                type={field.type}
                                name={field.label}
                                value={formValues[field.label] || ""}
                                onChange={handleChange}
                                className="h-6 border rounded px-4 bg-gray-50"
                              />
                            )}
                          </div>
                        ))}
                    </div>
                    <div className="md:col-span-3" id="TypeB_Row1_Column1">
                      {FormFields.criteria
                        .filter((field) => field.type === "checkbox")
                        .map((field, index) => (
                          <div key={index} class="flex items-center mb-2">
                            <label className="mr-2">
                              <input
                                type="checkbox"
                                name={field.label}
                                checked={formValues[field.label]}
                                onChange={handleChange}
                              />
                              {field.label}
                            </label>
                            {formValues[field.label] && (
                              <textarea
                                name={`${field.label}-input`}
                                value={formValues[`${field.label}-input`] || ""}
                                onChange={handleChange}
                                placeholder="Add comment..."
                                className="block h-10 p-2 border rounded-md resize"
                              />
                            )}
                          </div>
                        ))}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-neutral hover:bg-secondary text- font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
