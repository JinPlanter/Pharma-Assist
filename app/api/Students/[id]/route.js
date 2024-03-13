
// not tottally working yet

import clientPromise from "../../../lib/mongodb";


export const GET = async (request, response) => {

    const { id } = request.query; // get the student id from the request

    if (!id){
        response.status(400).json({error: "Missing student id"});
        return;
    }

    try{
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        // fetch specific student data from collection
        const studentData = await db
        .collection("gradingForm")
        .findOne({ "fileContentJson.id": id });
        
        // if student data is not found
        if (!studentData){
            response.status(404).json({error: "Student data not found"});
            return;
        }

        // return data
        response.json(studentData);
    
    } catch (error){
        response.status(500).json({error: "Unable to fetch student data from gradingForm collection"});
        console.error("Error:", error);
    }
};