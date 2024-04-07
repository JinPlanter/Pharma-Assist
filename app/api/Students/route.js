// this file is used to get the student data from the database

import clientPromise from "../../lib/mongodb";
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


        // variable to hold parsed data
        let parsedData = [];
        for (let i = 0; i < data.length; i++) {
            parsedData = parsedData.concat(data[i].fileContentJson);
        }

        // function to sort the properties of the object
        const sortObjectProperties = (obj) => {
            return Object.keys(obj)
                .sort()
                .reduce(function (result, key) {
                    result[key] = obj[key];
                    return result;
                }, {});
        };

        // remove duplicate data
        // once input validation in the db is implemented, this code will be removed
        parsedData = [...new Set(parsedData.map(item => JSON.stringify(sortObjectProperties(item))))].map(JSON.parse);

        parsedData = parsedData.filter((obj, index, self) => 
            index === self.findIndex((t) => (
                t.username === obj.username && 
                t.firstName === obj.firstName && 
                t.lastName === obj.lastName))
        );


        return NextResponse.json(parsedData);

    } catch (error) {
        return NextResponse.error(
            new Error("Unable to fetch data from classList collection"),
            { status: 500 }
        );
    }
}