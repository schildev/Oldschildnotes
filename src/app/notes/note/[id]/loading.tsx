const Loading = () => {
    return (
    <div className={"flex items-center min-h-[75dvh]"}>
        <div className={"basis-9/12 m-0 w-full"}>
                <div className={"flex w-full justify-beetween"}>
                <h1 className={"basis-10/12 p-0 ml-2 text-2xl text-slate-100 mb-2 pb-2 rounded-3xl bg-slate-100 animate-pulse "}>Loading...</h1>
                <p className={"px-2 py-3 basis-2/12 flex items-center justify-end mr-4 mb-[-82px]"}>
                    <span className={"material-symbols-outlined text-2xl cursor-pointer"}>
                        smart_display
                    </span>
                </p>
                </div>
                <div className={" p-3 border rounded-md border-blue-500 animate-pulse"}>
                    <div className={"m-0 flex-wrap flex w-full"}>
                        <h3 className={"basis-full text-indigo-600 text-2xl "}>Contenu de la note</h3>
                        <span className={"basis-full bg-slate-200 text-sm w-full text-slate-200 rounded-xl"}>Loading...</span>
                    </div>
                    
                </div>
            </div>
        </div>
        )
}
 
export default Loading;