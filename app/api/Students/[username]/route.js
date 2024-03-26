// this file is used to get the student data from the database
//path: app/api/Students/route.js

import clientPromise from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request, response) => {

    try {
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        // fetch data from collection
        const data = await db
            .collection("classlist")
            .find({})
            .toArray();


        // parse the data to only get the student arrays,
        // and not the entire object
        let parsedData = [];
        const username = response.params.username;
        for (let i = 0; i < data.length; i++) {
            parsedData = parsedData.concat(data[i].fileContentJson);
        }

        //get the student array that 
        //match the id
        let studentData = [];
        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].username.includes(username)) {
                studentData = studentData.concat(parsedData[i]);
                break;
            }
        }


        if (!studentData || data.length === 0) {

            return NextResponse.error(
                new Error("No student found"),
                { status: 404 }
            );
        }


        //return new Response(JSON.stringify(studentData), { status: 200 });
        return NextResponse.json(studentData, { status: 200 });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.error(
            new Error("Unable to fetch student data from classList collection"),
            { status: 500 }
        );
    }
}