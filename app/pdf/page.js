"use client";

import React from "react";
import PdfViewer from "../components/reactpdf";
import "../globals.css";
import FormValuesProvider from "../contexts/gradeform-context";

const App = () => {
  return (
    <FormValuesProvider>
    <div>
      <PdfViewer />
    </div>
    </FormValuesProvider>
  );
};

export default App;
