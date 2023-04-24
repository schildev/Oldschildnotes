import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../../db/db";
import {Note, INote} from "../../../../db/models/note";
import { HydratedDocument } from "mongoose";
let goodConn = false;

export async function GET(request:Request){
  await connectDB();
  const notes = await Note.find().sort({$natural:-1});
  return NextResponse.json(notes)
  
}

export async function POST(request:NextRequest){
    const {name, content, definitions, questions} = await request.json();
    if(content){
      await connectDB();
      const newNote : HydratedDocument<INote> = new Note(<INote>{
          name:name,
          content:content,
          definitions:definitions,
          questions:questions
      })
      const newNoteRenvoyer = await newNote.save();
      return NextResponse.json(newNoteRenvoyer);
    }
    return NextResponse.json({"error":"error with your request"}, {
      status:400
    })
}