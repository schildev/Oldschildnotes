'use client'
import {FormEvent, KeyboardEvent, useState, ChangeEvent} from "react";
import { INote } from "../../db/models/note";
import { useImmer } from "use-immer";
import { HydratedDocument } from "mongoose";
import HiddenInputs from "./HiddenInputs";
import { useRouter } from "next/navigation";
import DeleteWrapper from "./DeleteWrapper";
const EditNote = (props:{note:HydratedDocument<INote>}) => {
    const {note} = props;
    const  [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [NoteToUpdate, updateNoteToCreate] = useImmer<INote>(note);
    const [isDelete, updateIsDelete] = useImmer({isDeletingProcess:false, deleteCode:""});
    const router = useRouter();
    const handleInputEvent = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, attrName:("name"|"content"|"password")) => {
        updateNoteToCreate(draft => {
            draft[attrName] = e.target.value;
        })
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/notes/note/${note._id}`, {
            method:"POST",
            body:JSON.stringify({password:password})
        })
        if(!res.ok){
            setError((await res.json())["error"]);
        }
        else{
            setIsPasswordConfirmed((await res.json())["success"]);
            setError("");
        }
    }
    const handleUpdateNote = async function(e:FormEvent){
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("/api/notes/note/"+note._id, {
            method:"PATCH",
            body:JSON.stringify({...NoteToUpdate, password}),
            headers:new Headers({"Content-Type":"application/json"})
        });
        if(res.ok){
            router.refresh();
            router.replace("/");
        }
        else{
            const response = await res.json();
            setIsLoading(false);
            setError(response["error"]);
        }
    }
    
    return (
        <>
        {!isPasswordConfirmed ? (<>
            <h2 className={"text-xl text-center mt-2"}>Veuillez entrer le mot de passe de la note</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"field"}>
                        <label>Mot de passe</label>
                        <div className={"flex w-full m-0"}>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} 
                            className={`rounded-sm border border-r-0 basis-10/12 md:basis-11/12 lg:basis-11/12 outline-none ${!error ? "border-indigo-500" : "border-red-500"}`} />
                            <button className={"flex items-center hover:bg-indigo-500 transition-colors hover:text-white justify-center basis-2/12 md:basis-1/12 lg:basis-1/12 border border-indigo-500"} type="submit">
                                <span className="material-symbols-outlined" style={{fontSize:"26px"}}>
                                    lock_open
                                </span>
                            </button>
                        </div>
                        {error && <p className={"text-red-500"}>{error}</p>}
                    </div>
                </form>
            </>
        ) :
        (
            <>
            <form onSubmit={handleUpdateNote} className="flex flex-col p-0 mt-3 pb-4 gap-4">
                <div className={"basis-full relative md:left-0 lg:left-0 bottom-12 md:bottom-0 lg:bottom-0 right-[74px] lg:right-[78px] justify-end flex"}>
                    <span className={"absolute lg:top-[-8px] lg:right-[78px] material-symbols-outlined w-8 h-8 cursor-pointer text-red-500"} onClick={e => {
                        updateIsDelete(draft => {draft.isDeletingProcess=true})
                    }}>delete_forever</span>    
                </div>
                <div className={"field"}>
                    <label >Titre de la note</label>
                    <input value={NoteToUpdate.name} onChange={(e) => handleInputEvent(e, "name")}
                    className={" rounded-sm border outline-none border-blue-400"} type={"text"} name={"text"}  />
                </div>
                <div className="field">
                    <label >Contenu de la note</label>
                    <textarea value={NoteToUpdate.content} onChange={(e) => handleInputEvent(e, "content")} className={" rounded-sm border outline-none border-blue-400"} rows={4} />
                </div>
                <HiddenInputs color={"blue"} attrName="definitions" arr={NoteToUpdate.definitions} updateNoteToCreate={updateNoteToCreate} name={"Définitions | Dates"} />
                <HiddenInputs color={"blue"} attrName="questions" arr={NoteToUpdate.questions}
                updateNoteToCreate={updateNoteToCreate} name={"Questions Personnalisés"} />
                <div>
                    {error? <p className={"text-red-600 text-lg"}>fe</p> : ""}
                    <button type={"submit"} className={"transition-colors flex justify-center items-center duration-300 py-2 border border-sm w-full text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white " }>
                        {!isLoading ? "Mettre à jour la note" : <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{marginTop:"2px", marginBottom:"2px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
                    </button>
                </div>
            </form>
            {isDelete.isDeletingProcess ? (
                <DeleteWrapper password={password} updateIsDelete={updateIsDelete} isDelete={isDelete} note={note} />
            ) : ""}
            </>
        )
        }
        </>)
}
 
export default EditNote;