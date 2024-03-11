// this file is used to get the student data from the database

import clientPromise from "../../lib/mongodb";


export default async function getStudentData(request, response){

    try{

        // get query parameters
        const { name, studentid } = request.query;
        
        // ensure both are provided
        if(!name || !studentid){
            return response.status(400).json({error: "Both name and studentid are required"});
        }


        // wait for mongoDB client to connect
        const client = await clientPromise;

        // Access a collection in the database
        const db = client.db(process.env.MONGODB_DB);
        const collection = await db.collection("students"); // replace with collection name that has students data


        // query the collection to get data
        const students = await collection.findOne({ name:name, studentid: studentid }).toArray();

        if(!students){
            return response.status(404).json({error: "Student not found"});
        }
        
        //send data as a response
        response.status(200).json({students});

    }
    catch(error){
        console.error("Error retrieving student data from MongoDB",error);
        response.status(500).json({error: "Failed to get student data"});

    }
}