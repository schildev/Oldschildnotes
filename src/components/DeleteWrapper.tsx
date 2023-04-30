'use client'
import { useState } from "react";
import { useImmer } from "use-immer";
import { useRouter } from "next/navigation";
const DeleteWrapper = ({note, isDelete, updateIsDelete, password}:any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); 
    const handleDeleteNote = async function(){
        if(isDelete.deleteCode === note._id.toString()){
            setIsLoading(true);
            setError("")
            const res = await fetch(`/api/notes/note/${note._id}/delete/`, {
                method:"POST",
                body:JSON.stringify({password:password}),
                headers:new Headers({
                    "Content-Type":"application/json"
                })
            });
            if(res.ok){
                router.refresh();
                router.replace("/");
            }
            else{
                setError((await res.json())["error"])
            }
        }
        else{
            setError("Wrong code provided");
        }
    }

    const cancelNote = function(){
        setIsLoading(false);
        setError("")
        updateIsDelete((draft:any) => {
            draft.isDeletingProcess = false;
            draft.deleteCode = ""
        })
    }

    return (  
        <div className={"absolute top-0 z-50 left-0 m-0 w-[100dvw] rounded-md backdrop-blur-sm h-[100dvh] flex items-center justify-center"}>
                        <div className={"field bg-white border-red-300 border  p-5"}>
                            <label>Veuillez entrer ce code pour confirmer la suppression : {note._id.toString()} </label>
                            <input type="text" className="rounded-sm border outline-none border-red-300 focus:border-red-300 hover:border-red-300" value={isDelete.deleteCode} onChange={(e) => {
                                updateIsDelete((draft:{deleteCode:string}) => {draft.deleteCode = e.target.value});
                            }} />
                            {error && <p className={"text-red-500 font-bold"}>{error}</p>}
                            <div className={"m-0 mt-1 flex w-full gap-1"}>
                                <button onClick={handleDeleteNote} className={"p-2 px-4 text-red-500 text-center hover:bg-red-500 hover:text-white transition-colors duration-200 border border-red-500 grid"}> <span className={isLoading ? "invisible" : ""}>Supprimer la note</span>
                                    {isLoading && <svg className="animate-spin h-5 w-5 absolute justify-self-center" style={{marginTop:"2px", marginBottom:"2px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                </button>
                                <button onClick={cancelNote} className={"p-2 px-4 hover:bg-slate-200 text-black border border-slate-400"}>Annuler</button>
                            </div>                        
                        </div>
                    </div>
    );
}
 
export default DeleteWrapper;