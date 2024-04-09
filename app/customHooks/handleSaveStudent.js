

import { removeHashtag } from "../Students/components/search-bar";

const handleSaveStudent = async ({ editingStudent, setEditingStudent, setEditedStudent, setRefreshTimestamp }) => {
    try {
        const encodedUsername = encodeURIComponent(removeHashtag(editingStudent.username));
        const response = await fetch(`/api/updateStudent/${encodedUsername}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editingStudent),
        });

        if (response.ok) {
            console.log("Student updated successfully");
            setEditingStudent(null);
            setEditedStudent({});
            setRefreshTimestamp(Date.now()); // Trigger refresh
        } else {
            console.error("Failed to update student");
        }
    } catch (error) {
        console.error("Error updating student:", error);
    }
};

export default handleSaveStudent;