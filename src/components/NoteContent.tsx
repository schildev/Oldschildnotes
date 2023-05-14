'use client'

import { useState } from "react";
import QuizzForm from "./QuizzForm";
import EditNote from "./EditNote";
import { HydratedDocument, ObjectId } from "mongoose";
import { INote } from "../../db/models/note";

const NoteContent = (props:{noteToShow:HydratedDocument<INote>, RubikFont:any, MuktaFont:any}) => {
    const [isQuizz, setIsQuizz] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const {noteToShow, RubikFont, MuktaFont} = props;
    return (
    <>
        <div className={"basis-full md:basis-9/12 lg:basis-9/12 m-0 w-full"}>
        {(!isQuizz || isEdit) ? (
            <>
            <div className={"flex w-full justify-end lg:justify-beetween m-0"}>
                <h1 className={" basis-full md:basis-11/12 lg:basis-10/12 p-0 ml-2 text-lg md:text-2xl lg:text-4xl text-blue-400 mb-1 " + RubikFont.className}>{noteToShow.name}</h1>
                <p className={"px-2 py-3 absolute md:static lg:static md:pr-0 md:basis-1/12 lg:basis-2/12 flex gap-2 items-center justify-end right-0 lg:mr-4 mt-[-15px] lg:mt-0 lg:mb-[-82px]"}>
                    {noteToShow.password && <span onClick={e => {setIsQuizz(false);setIsEdit(!isEdit)}} className={" relative z-50 material-symbols-outlined cursor-pointer"}>
                        edit_note
                    </span>}
                    <span onClick={e => {setIsEdit(false);setIsQuizz(!isQuizz)}} className={"relative z-50 material-symbols-outlined text-2xl cursor-pointer"}>
                        smart_display
                    </span>
                </p>
            </div>
            {!isEdit &&
            <div className={" p-3 border rounded-md border-blue-500 " + MuktaFont.className}>
                <h3 className={"text-indigo-600 text-2xl " + RubikFont.className}>Contenu de la note</h3>
                <p style={{whiteSpace: "pre-wrap"}}>{noteToShow.content}</p>
                {noteToShow.definitions.length > 0 && 
                (<>
                <h3 className={"text-red-400 text-2xl border-t pt-2 mt-1 border-indigo-400 " + RubikFont.className}>Définitions | Dates</h3>
                <ol>
                    {noteToShow.definitions?.map((def:string) => {
                        return <li key={def}>{def}</li>
                    })}
                </ol></>
                )
                }
            </div>
            }
            </>
        ) : !isEdit ? (
            <div className={"flex basis-full flex-wrap w-full justify-beetween wrap"}>
                <div className={"flex m-0 flex-wrap basis-full"}>
                    <div className={"basis-full md:basis-10/12 lg:basis-10/12 m-0 text-indigo-600 text-2xl text-center flex items-center justify-between " + RubikFont.className}>
                        <h3 className={"text-center basis-10/12"}>Quizz Time</h3>
                        <p className={"px-2 py-3 pr-0 basis-2/12 flex items-center justify-end"}>
                            <span onClick={e => {setIsEdit(false);setIsQuizz(!isQuizz)}} className={"material-symbols-outlined fillsymbol  text-2xl cursor-pointer"}>
                                smart_display
                            </span>
                        </p>
                    </div>
                </div>
                <div className={RubikFont.className + " basis-full md:basis-10/12 lg:basis-10/12 m-0"}>
                {(noteToShow.definitions.length > 0 || noteToShow.questions.length > 0) ? 
                <QuizzForm questions={noteToShow.questions} definitions={noteToShow.definitions} /> : 
                "Vous n'avez pas de définitions ou date ou de questions !"}
            </div>
            </div>
        ) : ""}
        {isEdit && (
            <>
            
            <EditNote note={noteToShow} />
            </>
        )}
    </div>
    </>
    
    )}
 
export default NoteContent;
