"use client";

import React, { useState, useEffect } from "react";
import FormFields from "../data/gradingForm.json";

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

function Form() {
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
    <form>
      <div class="min-h-screen p-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center text-black">
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <h2 class="font-bold text-5xl text-gray-600 mb-3">Grading Form</h2>

            <div class="bg-neutral rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">Lab Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    

                    <div class="md:col-span-5" id="TypeA_Row1_Column2">
                      {FormFields.criteria
                        .filter((field) => field.type !== "checkbox")
                        .map((field, index) => (
                          <div key={index} class="flex items-center mb-3 text-l">
                            <label class="mr-2">{field.label}</label>
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

                    <div class="md:col-span-3" id="TypeB_Row1_Column1">
                      {FormFields.criteria
                        .filter((field) => field.type === "checkbox")
                        .map((field, index) => (
                          <div key={index} class="flex items-center mb-2">
                            <label class="mr-2">
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
                                className="h-10 w-full p-2 border rounded-md resize"
                              />
                            )}
                          </div>
                        ))}
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
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
