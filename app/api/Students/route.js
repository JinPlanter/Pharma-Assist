// this file is used to get the student data from the database
//path: app/api/Students/route.js

import clientPromise from "../../lib/mongodb";
import {NextRequest, NextResponse } from "next/server";


export const GET = async (request,response) => {

    try{
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        // fetch data from collection
        const data = await db
        .collection("classList")
        .find({})
        .toArray();

        
        // variable to hold parsed data
        let parsedData = [];
        for (let i = 0; i < data.length; i++){
            parsedData = parsedData.concat(data[i].fileContentJson);
        }

        
        // remove duplicate data
        // once input validation in the db is implemented, this code will be removed
        parsedData = [...new Set(parsedData.map(JSON.stringify))].map(JSON.parse);


        return NextResponse.json(parsedData);
    
    } catch (error){
        return NextResponse.error(
            new Error("Unable to fetch data from classList collection"),
            { status: 500 }
        );
    }
}