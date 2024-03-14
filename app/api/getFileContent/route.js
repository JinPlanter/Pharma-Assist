// api/getFileContent/route.js
import clientPromise from "../../lib/mongodb";

async function handler(res) {
  try {
    const client = await clientPromise;
    const db = client.db("capstone");
    const collection = db.collection("gradingForm");

    // Find all documents in the collection
    const gradingForms = await collection.find({}).toArray();

    if (gradingForms.length === 0) {
      throw new Error("No grading forms found", { status: 404 });
    }

    // Return the grading forms as JSON
    return new Response(JSON.stringify(gradingForms), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching grading forms:", error);
    throw new Error("fetch failed");
  }
}
export { handler as GET };
