// pages/api/upload
import clientPromise from "../../lib/mongodb";

async function handler(request) {
  console.log("Request body:", request.body); // Debug
  const  fileContentJson  = await request.json();
console.log("Parsed JSON content:", fileContentJson); // Debug
  try {
    // Save the file content JSON to the database
    const client = await clientPromise;
    const db = client.db("capstone");
    const collection = db.collection("gradingForm");

    // Example: Save file content JSON to MongoDB
    await collection.insertOne({ fileContentJson });

    return new Response("Upload successful", { status: 200 });
  } catch (error) {
    console.error("Error uploading file content JSON:", error);
    throw new Error("Upload failed");
  }
}

export { handler as POST };
