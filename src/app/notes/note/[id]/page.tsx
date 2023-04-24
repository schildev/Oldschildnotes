import { HydratedDocument } from "mongoose";
import { INote } from "../../../../../db/models/note";

import { Mukta, Rubik } from "next/font/google";
import NoteContent from "@/components/NoteContent";
const MuktaFont = Mukta({
    weight:"400", subsets:["latin-ext"]
})
const RubikFont = Rubik({
    weight:"400", subsets:["latin-ext"]
})
const getNote = async (_id:string) => {
    const note: HydratedDocument<INote> = await (await fetch(process.env.URL + `/api/notes/note/${_id}`, {
        method:"GET", headers:new Headers({"Content-Type":"application/json"}), cache:"no-store"
    })).json()
    return note
}

const Note = async ({params}:any) => {
    const {id} = params;
    const noteToShow = await getNote(id);
    return (
        <div className={"flex items-center min-h-[75dvh]"}>
            <NoteContent noteToShow={noteToShow} MuktaFont={MuktaFont} RubikFont={RubikFont} />
        </div>
    );
}
 
export default Note;