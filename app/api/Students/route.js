// this file is used to get the student data from the database
//path: app/api/Students/route.js
// working
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";


export const GET = async (request) => {

    try{
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        // fetch data from collection
        const data = await db
        .collection("classList")
        .find({})
        .toArray();

        // return data
        return NextResponse.json(data);
        
    
    } catch (error){
        response.status(500).json({error: "Unable to fetch data from gradingForm collection"});
        console.error("Error:", error);
    }
}