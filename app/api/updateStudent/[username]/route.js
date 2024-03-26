// api/updateStudent/[username]/route.js
import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
    const { method } = req;
    // Decode the username
    const username = decodeURIComponent(req.url.split("/").pop());

    try {
        // Parse the request body
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db("capstone");
        const collection = db.collection("classlist");

        if (method === "PUT") {
            // Target the object within the 'fileContentJson' array where the 'username' matches
            const updatedStudent = await collection.updateOne(
                { "fileContentJson.username": username },
                {
                    $set: {
                        "fileContentJson.$.lastName": body.lastName,
                        "fileContentJson.$.firstName": body.firstName,
                        "fileContentJson.$.email": body.email,
                        // Include other fields you want to update
                    },
                }
            );
            console.log("Update result:", updatedStudent);
            if (updatedStudent.modifiedCount === 1) {
                return new Response(
                    JSON.stringify({ message: "Student updated successfully" }),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                return new Response(JSON.stringify({ message: "Student not found" }), {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        } else {
            return new Response(JSON.stringify({ message: "Method not allowed" }), {
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export { handler as PUT };
