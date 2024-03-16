// this file is used to get the student data from the database
//path: app/api/Students/route.js

import clientPromise from "../../../lib/mongodb";
import {NextRequest, NextResponse } from "next/server";


export const GET = async (request,response) => {
    // debug to see response object
    //console.log("Type of response: ", typeof response);
    //console.log("Response: ", response);
    //console.log(response.params);
    //console.log(response.params.id);
    //console.log( "type of", typeof response.params.id);
    //console.log(request);
    //console.log(request.query.id);
    //console.log(NextRequest.query.id);
    //console.log(NextRequest.params);
    //console.log(NextResponse);

    try{
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        // fetch data from collection
        const data = await db
        .collection("classList")
        .find({})
        .toArray();

        //console.log('data:',data);

        // parse the data to only get the student arrays,
        // and not the entire object
        let parsedData = [];
        const id = parseInt(response.params.id);
        for (let i = 0; i < data.length; i++){
            parsedData = parsedData.concat(data[i].fileContentJson);
        }

        //parse the data one more time to only get the student arrays that 
        //match the id
        let studentData = [];
        for (let i = 0; i < parsedData.length; i++){
            //console.log("parsedData[i].id: ", parsedData[i].id);
            //console.log("parsedData[i]: ", parsedData[i]);
            if (parsedData[i].id === id){
                studentData = studentData.concat(parsedData[i]);
                break;
            }
        }

        //console.log('student data:', studentData);

        if (!studentData || data.length === 0) {
            /*
            return new Response(
                JSON.stringify({ error: "No student found" }),
                { status: 404 }
            );
            */
            return NextResponse.error(
                new Error("No student found"),
                { status: 404 }
            );
        }


        //return new Response(JSON.stringify(studentData), { status: 200 });
        return NextResponse.json(studentData, {status: 200});
    
    } catch (error){
        console.log("Error: ", error);
        return NextResponse.error(
            new Error("Unable to fetch student data from classList collection"),
            { status: 500 }
        );
    }
}