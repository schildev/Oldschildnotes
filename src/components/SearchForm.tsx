'use client'
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import SearchList from "./SearchList";

const SearchForm = () => {
    const [query, setQuery] = useState("");
    const [querySearch, setQuerySearch] = useState(null);
    const [isQueryVisible, setQueryVisible] = useState(false);
    const deleteLister = () => {
        setQueryVisible(false);
    };
    useEffect(() => {
        if(isQueryVisible){
            document.querySelector("body")?.addEventListener("click", deleteLister);
        }else{
            document.querySelector("body")?.removeEventListener("click", deleteLister);
        }
        return () => {document.querySelector("body")?.removeEventListener("click", deleteLister);}
    }, [isQueryVisible]);
    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if(query === ""){
            return null;
        }
        const querySearchResults = await (await fetch(`/api/notes/search?query=${query}`, {
            method:"GET", 
            headers:new Headers({
                "Content-Type":"application/json"
            })
        })).json();
        setQuerySearch(querySearchResults);
        setQueryVisible(true);
    }
    return (
        <>
        <form onSubmit={handleSubmit} className={"search-form order-2 z-10 md:order-1 basis-full md:basis-6/12 lg:basis-8/12 grid"}>
            <input placeholder={"Cherchez une note"}
            className={"text-black rounded-sm w-full ring-2 transition-all duration-300 hover:ring-blue-300 focus:ring-blue-400 outline-none"} type="text" value={query}
            onClick={e => setQueryVisible(true)}
            onChange={handleInput} />
            <button 
            className={"absolute cursor-pointer transition-colors duration-200 glass rounded-e-sm justify-self-end self-center"}>
                <Image quality={100} width={25} height={25} 
                className={""} 
            src={"/search.svg"} alt={"search icon"} />
            </button>
        </form>
        {querySearch && isQueryVisible && <SearchList query={querySearch} />}
        </>
    );
}
 
export default SearchForm;