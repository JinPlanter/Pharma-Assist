

const handleSaveStudent = async ({ setEditingStudent, setEditedData, setRefreshTimestamp }) => {
    try {
        const encodedUsername = encodeURIComponent(editingStudent.username);
        const response = await fetch(`/api/updateStudent/${encodedUsername}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
        });

        if (response.ok) {
            console.log("Student updated successfully");
            setEditingStudent(null);
            setEditedData({});
            setRefreshTimestamp(Date.now()); // Trigger refresh
        } else {
            console.error("Failed to update student");
        }
    } catch (error) {
        console.error("Error updating student:", error);
    }
};

export default handleSaveStudent;