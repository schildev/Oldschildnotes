import mongoose, { Model, Schema } from "mongoose";

export interface INote {
    name?:string,
    content:string,
    definitions:string[],
    questions:string[],
    password?:string
}

const noteSchema = new Schema<INote>({
    name:{
        type:String,
        required:false,
        text:true
    },
    content:{
        type:String,
        required:[true, "Une note doit avoir obligatoire un contenu !!!"],
        text:true
    },
    definitions:{
        type:[String],
        required:false,
    },
    questions:{
        type: [String],
        required:false
    },
    password:{
        type:String,
        required:false
    }
})
export const Note = (mongoose.models.Note || 
    mongoose.model<INote>("Note", noteSchema))