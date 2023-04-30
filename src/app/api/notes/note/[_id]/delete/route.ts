import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { isValidObjectId, HydratedDocument } from "mongoose";
import dbConnect from "../../../../../../../db/db";
import {INote, Note} from "../../../../../../../db/models/note";
import { verify } from "argon2";

export async function POST(request:NextRequest, {params}:Params){
    const {_id} = params;
    const {password} = await request.json();
    if(isValidObjectId(_id)){
        await dbConnect();
        const noteToDelete : HydratedDocument<INote> | null = await Note.findById(_id);
        if(!noteToDelete){
            return NextResponse.json({"error":"Unable to find this note"},{
                status:400
            });
        }
        if(noteToDelete.password && await verify(noteToDelete.password, password)){
            await noteToDelete.deleteOne();
            return NextResponse.json({"success":true})
        }
        else{
            return NextResponse.json({"error":"wrong password or the note isn't modifiable"}, {
                status:400
            })
        }
    }
}