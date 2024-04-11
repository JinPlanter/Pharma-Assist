

const downloadGradingForm = (form) => {
    const fileData = JSON.stringify(form.fileContentJson, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gradingForm_${form._id}.json`;
    link.click();
};

export default downloadGradingForm;