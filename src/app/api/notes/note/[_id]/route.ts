import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { INote, Note } from "../../../../../../db/models/note";
import dbConnect from "../../../../../../db/db";
import { isValidObjectId } from "mongoose";


type IProjection<T> = {
    [key in keyof T] : 1
}
type proj = IProjection<INote>
export async function GET(request:NextRequest, {params}:Params){
    const {_id} = params
    if(!_id || !isValidObjectId(_id)){
        return NextResponse.json({error:"No correct ID given !"}, {
            status:400
        })
    }
    await dbConnect();
    const note = await Note.findById(_id, <proj>{
        name:1,
        content:1,
        definitions:1,
        questions:1
    })
    if(!note){
        return NextResponse.json({error:"no note found"}, {
            status:400
        })
    }
    return NextResponse.json(note);
}