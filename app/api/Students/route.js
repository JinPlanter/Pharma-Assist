// this file is used to get the student data from the database
//path: app/api/Students/route.js

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

        //before returning data, parse the data to only get the student arrays,
        //and not the entire object
        //console.log('first array of data fr api',data[0]);
        //console.log('fileContentJson: ',data[0].fileContentJson);
        
        // variable to hold parsed data
        let parsedData = [];
        for (let i = 0; i < data.length; i++){
            parsedData = parsedData.concat(data[i].fileContentJson);
        }
        //console.log('data after parsing:',parsedData);
        //console.log('unparsed data:',data);
        return NextResponse.json(parsedData);
        
    
    } catch (error){
        response.status(500).json({error: "Unable to fetch data from gradingForm collection"});
        console.error("Error:", error);
    }
}