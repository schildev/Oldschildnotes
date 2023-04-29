'use client'
import {INote} from "../../../../db/models/note";
import { useImmer } from "use-immer";
import {Rubik, Mukta} from "next/font/google"
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import HiddenInputs from "@/components/HiddenInputs";
const RubikFont = Rubik({
    weight:"400",subsets:["latin"]
})
const DongleFont = Mukta({
    weight:"400",subsets:["latin-ext"]
})

const Create = () => {
    const [NoteToCreate, updateNoteToCreate] = useImmer<INote>({
         name:"",
         content:"",
         definitions:[],
         questions:[],
         password:undefined
    });

    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null|string>(null);
    const router = useRouter();

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if(NoteToCreate.content){
            const res = await fetch("/api/notes/", {
                method:"POST",
                headers:new Headers({
                    "Content-Type":"application/json"
                }),
                body:JSON.stringify(NoteToCreate)
            })
            if(res.ok){
                res.json().then(data => {
                    router.refresh();
                    router.replace("/");
                    
                });
            }
            else{
                setError((await res.json()).error);
                setIsLoading(false);
            }
        }
        else{
            setError("Vous devez au minimum remplir le contenu de la note !");
            setIsLoading(false);
        }
    }

    const handleInputEvent = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, attrName:("name"|"content"|"password")) => {
        updateNoteToCreate(draft => {
            draft[attrName] = e.target.value;
        })
    }
    return (
        <div className={"flex justify-center items-center min-h-[85dvh] mx-1 lg:m-0"}>    
            <form onSubmit={handleSubmit} className={"min-w-[100%] md:min-w-[75%] lg:min-w-[50%] max-w-[50%] flex flex-col p-2 pb-4 gap-4 bg-sky-50 " + DongleFont.className}>
                <div className="field" style={{marginBottom:"-12px"}}>
                    <h2 className={"text-3xl " + RubikFont.className}>Créer une <span className={"text-teal-300"}> Note</span></h2>
                </div>
                <div className={"field"}>
                    <label >Titre de la note</label>
                    <input value={NoteToCreate.name} onChange={(e) => handleInputEvent(e, "name")}
                    className={" rounded-sm border outline-none border-emerald-300"} type={"text"} name={"text"}  />
                </div>
                <div className="field">
                    <label >Contenu de la note</label>
                    <textarea value={NoteToCreate.content} onChange={(e) => handleInputEvent(e, "content")} className={" rounded-sm border outline-none border-emerald-300"} rows={4} />
                </div>
                <HiddenInputs attrName="definitions" arr={NoteToCreate.definitions} updateNoteToCreate={updateNoteToCreate} name={"Définitions | Dates"} />
                <HiddenInputs attrName="questions" arr={NoteToCreate.questions}
                updateNoteToCreate={updateNoteToCreate} name={"Questions Personnalisés"} />
                <div className="field">
                    <label>Mot de passe (il n'est pas requis)</label>
                    <input className={"rounded-sm border outline-none border-emerald-300"} type="password" onChange={(e) => handleInputEvent(e, "password")} value={NoteToCreate.password} />
                </div>
                <div>
                    {error? <p className={"text-red-600 text-lg"}>fe</p> : ""}
                    <button type={"submit"} className={"transition-colors flex justify-center items-center duration-300 py-2 border border-sm w-full text-indigo-500 border-emerald-300 hover:bg-indigo-500 hover:text-white " }>
                        {!isLoading ? "Créer une note" : <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{marginTop:"2px", marginBottom:"2px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;