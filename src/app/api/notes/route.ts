import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../../db/db";
import {Note, INote} from "../../../../db/models/note";
import { HydratedDocument } from "mongoose";
import { hash } from "argon2";
let goodConn = false;

export async function GET(request:Request){
  await connectDB();
  const notes = await Note.find().sort({$natural:-1});
  return NextResponse.json(notes)
  
}

export async function POST(request:NextRequest){
    const {name, content, definitions, questions, password} = await request.json();
    let pass = password;
    if(password === ""){
      pass = null;
    }
    if(pass != null){
      pass = await hash(pass);
    }
    if(name !== "" || content !== "" || (definitions as string[]).length > 0){
      await connectDB();
      const newNote : HydratedDocument<INote> = new Note(<INote>{
          name:name,
          content:content,
          definitions:definitions,
          questions:questions,
          password:pass
      })
      const newNoteRenvoyer = await newNote.save();
      return NextResponse.json(newNoteRenvoyer);
    }
    return NextResponse.json({"error":"error with your request"}, {
      status:400
    })
}