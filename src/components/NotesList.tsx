import {INote} from "@/../db/models/note";
import { HydratedDocument } from "mongoose";
import { Mukta, Rubik } from "next/font/google";
import Link from "next/link";

const MuktaFont = Mukta({
    weight:"400", subsets:["latin-ext"]
})
const RubikFont = Rubik({
    weight:"400", subsets:["latin-ext"]
})
const NotesList = (props:{notes:HydratedDocument<INote>[]}) => {
    return (
        <div className={"grid gap-3 grid-cols-1 hover:font-normal sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-1 my-2"}>
            {props.notes.map(note => {
                return (
            <Link href={`/notes/note/${note._id}`} className={"hover:font-normal max-h-[300px] overflow-hidden"} key={note._id.toString()}>
                <div className={"note p-3 border m-0 rounded-sm min-h-[25dvh] h-full shadow-md bg-sky-50 border-slate-300 hover:bg-sky-100"}>
                    <h4 className={"text-2xl text-emerald-300 capitalize " + MuktaFont.className}>{note?.name}</h4>
                    <p className={RubikFont.className + " text-sm"} style={{whiteSpace: "pre-wrap"}}>{note.content}</p>
                    {note.definitions.length > 0 && (
                    <>
                    <h5 className={"text-lg text-red-400 " + RubikFont.className}>Définitions</h5>
                    <ol className={RubikFont.className}>
                        {note.definitions.map(def => {
                            return <li className={"hover:font-normal"} key={def}>{def}</li>
                        })}
                    </ol>
                    </>)
                    }
                </div>
            </Link>
            )
            })}           
        </div>
    );
}
 
export default NotesList;
