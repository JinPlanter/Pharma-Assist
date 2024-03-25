// api/updateStudent/[username]/route.js
import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const { method, body } = req;
  // Manually parse the URL to extract the username
  const urlParts = req.url.split("/");
  const username = urlParts[urlParts.length - 1]; // Assuming the username is the last part of the URL
  try {
    const client = await clientPromise;
    const db = client.db("capstone");
    const collection = db.collection("classlist");

    if (method === "PUT") {
      const updatedStudent = await collection.updateOne(
        { username },
        { $set: body }
      );

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
