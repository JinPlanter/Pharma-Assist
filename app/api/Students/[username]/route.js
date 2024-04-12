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
        //match the id / username
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

        return NextResponse.json(studentData, { status: 200 });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.error(
            new Error("Unable to fetch student data from classList collection"),
            { status: 500 }
        );
    }
}



//update student data
export const PUT = async (request, response) => {
    try {
        // connect to db
        const client = await clientPromise;
        const db = client.db("capstone"); //db name

        //check if connection is successful
        if (!db) {
            return NextResponse.error(
                new Error("Unable to connect to database"),
                { status: 500 }
            );
        } else{
            console.log("Connected to database successfully");
        }

        

        // read request body 
        const chunks = [];
        for await (const chunk of request.body) {
            chunks.push(chunk);
        }

        // parse the request body as JSON
        const updatedData = JSON.parse(Buffer.concat(chunks).toString());
        console.log("Updated data: ", updatedData);
        

        
        //update student data in collection
        const students = await db.collection("classlist")
        // create a filter to find the student with the username in the request
        console.log("fileContentJson.username: ", `#${response.params.username}` );
        const filter = { "fileContentJson": { $elemMatch: { "username": `#${response.params.username}` } } };

        // specify the update to set a value for the student with the username in the request
        // updatedData is a json object that contains the updated student data
        // use .$. to specify the index of the array element to update
        const updateDoc = {
            $set: { "fileContentJson.$.firstName": updatedData.firstName,
                    "fileContentJson.$.lastName": updatedData.lastName,
                    "fileContentJson.$.email": updatedData.email,
                    "fileContentJson.$.phone": updatedData.phone,
                    "fileContentJson.$.emergencyContact": updatedData.emergencyContact,
                    "fileContentJson.$.address": updatedData.address,
                    "fileContentJson.$.city": updatedData.city,
                    "fileContentJson.$.province": updatedData.province,
                    "fileContentJson.$.zip": updatedData.zip,
                },
        };
        
        // update the first document that matches the filter
        const result = await students.updateOne(filter, updateDoc);

        if (result) {
            // check if updated
            const updatedStudent = await students.findOne(filter);
            console.log("Updated student: ", updatedStudent);
            // if the update was successful, return a success response
            return NextResponse.json({ message: "Student data updated successfully" }, { status: 200 });
        } else{
            // if no document was modified, return a not found response
            return NextResponse.error(
                new Error("No student found"),
                { status: 404 }
            );
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.error(
            new Error("Unable to update student data"),
            { status: 500 }
        );
    }
}