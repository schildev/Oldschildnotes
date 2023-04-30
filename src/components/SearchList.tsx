import {INote} from "../../db/models/note";
import { HydratedDocument } from "mongoose";
import Link from "next/link";
type dbNotes = HydratedDocument<INote>[]
const SearchList = (props:{query:dbNotes}) => {
    const {query} = props;
    return (
        <div className={"w-full absolute z-20 m-0 text-black gap-2 grid grid-cols-12 justify-center top-24 md:top-[47px] lg:top-[48px]"}>
            <div className={"lg:ml-[16px] mr-[14px] m-0 col-span-12 md:col-start-5 md:col-end-11 md:ml-3 md:mr-1 rounded-sm border border-[#FF7F50] lg:col-start-4 lg:col-end-12 flex flex-wrap bg-white lg:mr-[8px]"}>
            {query?.map(note => {
                return (
                    <Link key={note._id.toString()} className={"basis-full py-2 px-2 hover:bg-[#FF7F50] transition-colors duration-200 hover:text-white border-emeral-500 "} href={`/notes/note/${note._id}`}>
                        {note.name ? <p>{note.name}</p> :
                        <p>{note.content}</p>}
                    </Link>
                    )
            })}
            </div>
        </div>
    );
}
 
export default SearchList;