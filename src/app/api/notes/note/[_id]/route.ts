import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { INote, Note } from "../../../../../../db/models/note";
import dbConnect from "../../../../../../db/db";
import  { HydratedDocument, isValidObjectId } from "mongoose";
import {verify} from "argon2";

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
        questions:1,
        password:1
    })
    if(!note){
        return NextResponse.json({error:"no note found"}, {
            status:400
        })
    }
    return NextResponse.json(note);
}
export async function POST(request:NextRequest, {params}:Params) {
    const {_id} = params;
    const {password} = await request.json()
    if(isValidObjectId(_id)){
        await dbConnect();
        const noteToVerify : HydratedDocument<INote> | null = await Note.findById(_id);
        if(!noteToVerify){
            return NextResponse.json({error:"note introuvable veuillez recharger la page"},{
                status:400
            })
        }
        if(!noteToVerify.password){
            return NextResponse.json({error:"Cette note ne peux pas être modifier"}, {
                status:400
            })
        }
        if(!(await verify(noteToVerify.password, password))){
            return NextResponse.json({error:"Le mot de passe fournis n'est pas correct"}, {
                status:400
            });
        }
        return NextResponse.json({success:true})
    }
}

export async function PATCH(request:NextRequest, {params}:Params) {
    const {name, content, definitions, questions, password} = await request.json();
    const {_id} = params;
    if(name !== "" || content !== "" || (definitions as string[]).length > 0){
        await dbConnect();
        const NoteToUpdate : HydratedDocument<INote> | null = await Note.findById(_id);
        if(!NoteToUpdate){
            return NextResponse.json({"error":"Unable to find the note"},{status:400})
        }
        if(!NoteToUpdate.password){
            return NextResponse.json({error:"This note is not modifiable"}, {
                status:400
            });
        }
        const isGood = await verify(NoteToUpdate.password, password)
        if(!isGood){
            return NextResponse.json({"error":"Wrong password provided"}, {status:400})
        }
        
        const noteUpdate:INote = {
            name,
            content,
            definitions,
            questions
        };
        await NoteToUpdate.set(noteUpdate);
        await NoteToUpdate.save();
        return NextResponse.json({"success":true});
    }
}