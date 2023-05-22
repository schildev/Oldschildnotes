import { HydratedDocument } from "mongoose";
import { INote } from "../../../../../db/models/note";
import {remark} from "remark"
import remarkRehype from "remark-rehype"
import rehypestringify from "rehype-stringify"
import sanatize from "rehype-sanitize";
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
const getHtml = async (content:string) => {
    const html = await remark()
        .use(remarkRehype)
        .use(sanatize)
        .use(rehypestringify)
        .process(content)
    return html.toString();
}

const Note = async ({params}:any) => {
    const {id} = params;
    const noteToShow = await getNote(id);
    const markdownToHtml = await getHtml(noteToShow.content);

    return (
        <div className={"flex items-center min-h-[75dvh]"} style={{marginInlineStart:"35px", listStyleType:"circle"}}>
            <NoteContent html={markdownToHtml} noteToShow={noteToShow} MuktaFont={MuktaFont} HeadingRubikFont={RubikFont} />
        </div>
    );
}
 
export default Note;