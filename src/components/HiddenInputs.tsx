import {ChangeEvent, MouseEvent, useState} from "react"
import { useImmer } from "use-immer";
import { KeyboardEvent } from "react";
const HiddenInputs = ({arr, updateNoteToCreate, name, attrName, color}:any) => {
    const [defText, updateDefText] = useImmer({
        defName:"", defValue:"", isVisible:false
    });
    const deleteHidden = (e:MouseEvent, id:string) => {
        updateNoteToCreate((draft:{[key:string]:string[]}) => {
            draft[attrName] = draft[attrName].filter(element => {
                return element !== id;
            })
        })
    }
    const handleInputEvent = (e:ChangeEvent<HTMLInputElement>, id:number) => {
        if(id === 0){
            updateDefText(draft => {
                draft.defName = e.target.value;
            })
        }
        else if(id === 1){
            updateDefText(draft => {
                draft.defValue = e.target.value;
            })
        }
    }
    const addDef = (e:KeyboardEvent<HTMLInputElement>, action:"add", id:string|null=null) => {
        const merge = defText.defName + " : " + defText.defValue
        if(e.key === "Enter" && (defText.defName !== "" && defText.defValue !== "")){
            e.preventDefault();
            updateNoteToCreate((draft:{[key:string]:string[]}) => {

                switch(action){
                    case "add":{
                        if(!draft[attrName].includes(merge)){
                            draft[attrName].push(merge)
                        }
                    }
                }
            })
            updateDefText(draft => {draft.defName="", draft.defValue=""})
        }
        else if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    return (
    <>
    <div className="field gap-0">
        <h3 className={`border px-2 py-1 border-r-0 ${color === null ? "border-emerald-300" : "border-blue-400"} rounded-sm basis-11/12 text-xl`}>{name}</h3>
        <div onClick={e => updateDefText(draft =>{draft.isVisible = !draft.isVisible})} className={`border flex ${color === null ? "border-emerald-300 hover:bg-emerald-300" : "border-blue-400 hover:bg-blue-400"} hover:text-white p-0 m-0 justify-center items-center hover:cursor-pointer rounded-sm basis-1/12`}>
            <a>{defText.isVisible ? "-" : "+"}</a>
        </div>
        {arr.length != 0 &&
        <div className={`border border-t-0 w-full grid py-1 gap-1 ${color === null ? "border-emerald-300" : "border-blue-400"} m-0 rounded-sm`}>
            {arr.map((def:string) => {
                    return (
                    <div key={"name "+def} className={"m-0 px-2 flex justify-between"}>
                        <p className={"flex items-center"} key={def}>{def}</p>
                        <span className={"text-xl material-symbols-outlined hover:text-red-500 pr-0 cursor-pointer"} onClick={(e) => deleteHidden(e, def)}>delete_sweep</span>
                    </div>)
            })}
        </div>
        }
    </div>
    <div className={`grid grid-cols-12 gap-1 ${!defText.isVisible ? "hidden" : ""}`}>
        <input className={`rounded-sm col-span-3 border outline-none ${color === null ? "border-emerald-300" : "border-blue-400"}`} value={defText.defName} onChange={(e) => {handleInputEvent(e, 0)}} onKeyDown={e => addDef(e, "add")} type="text" placeholder={`ajouter une ${name}`} />
        <input className={`rounded-sm border col-span-9 outline-none ${color === null ? "border-emerald-300" : "border-blue-400"}`} value={defText.defValue} onChange={(e) => {handleInputEvent(e, 1)}} onKeyDown={e => addDef(e, "add")} type="text" placeholder="" />
    </div>
    </>);
}
 
export default HiddenInputs;