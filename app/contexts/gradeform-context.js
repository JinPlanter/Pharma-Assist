// create context to share data from the GradeForm component to 
// the reactpdf/PdfViewer component

import React, { createContext, useState, useEffect, useContext } from "react";
import gradingForm from "../data/gradingForm.json";

export const FormValuesContext = createContext();

export const useFormValuesContext = () => {
    const context = useContext(FormValuesContext);
    if (!context) {
        throw new Error("useFormValuesContext must be used within a FormValuesProvider");
    }
    return context;

}

export default function FormValuesProvider({ children }) {

    const { criteria } = gradingForm;

    // use the criteria labels from gradingForm.json
    const initialValues = criteria.reduce((acc, { label }) => {
        acc[label] = "";
        return acc;
    }, {});

    // create the initial comments object
    const initialComments = criteria
        .filter(({ comment }) => comment)
        .reduce((acc, { label }) => {
            acc[label] = "";
            return acc;
        }, {});


    const [formValues, setFormValues] = useState(initialValues);

    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        //console.log("form values updated", formValues);
        //console.log("comments updated", comments);
    }, [formValues, comments]);

    return (
        <FormValuesContext.Provider value={{ formValues, setFormValues, comments, setComments }}>
            {children}
        </FormValuesContext.Provider>

    )
}