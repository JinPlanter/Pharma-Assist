

const handleInputChange = (e, field, { setEditedData }) => {


    setEditedData((prevData) => ({
        ...prevData,
        [field]: e.target.value,
    }));
};

export default handleInputChange;