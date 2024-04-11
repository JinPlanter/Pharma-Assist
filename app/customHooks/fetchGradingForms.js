

const fetchGradingForms = async ({ setGradingForms }) => {
    try {
        const response = await fetch("/api/getFileContent");
        const data = await response.json();
        setGradingForms(data);
    } catch (error) {
        console.error("Error fetching grading forms:", error);
    }
};

export default fetchGradingForms;