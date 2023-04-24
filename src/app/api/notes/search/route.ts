import { INote, Note } from "../../../../../db/models/note";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../db/db";

export async function GET(request:NextRequest){
    const {searchParams} = request.nextUrl
    const query = searchParams.get("query");
    if(query){
        await dbConnect();
        const projection  = {
            _id:1,
            name:1,
            content:1,
            score: { $meta: "textScore" }
        }
        const search = await Note.find({$text:{$search:query}}, projection)
        .sort({ score : { $meta: "textScore" }});
        console.log(search);
        return NextResponse.json(search);
    }
    else{
        return NextResponse.json({"error":"Query not gived"}, {
            status:400
        })
    }
}