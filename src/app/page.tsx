import NotesList from "@/components/NotesList";
import { INote } from "../../db/models/note";
import { HydratedDocument } from "mongoose";
import { Suspense } from "react";
import Loading from "@/components/loading";
async function getNotes(){
    const res = await fetch("http://localhost:3000/api/notes", {
        method:"GET",
        headers:new Headers({
            'Content-Type': 'application/json'
        }),
        cache:"no-store"
    });
    const notes : HydratedDocument<INote>[] = await res.json();
    return notes
}

export default async function Home() {
  const notesDB = await getNotes();
  return (
    <main>
      {notesDB.length > 0 && <Suspense fallback={<Loading/>}>
        <NotesList notes={notesDB} />
      </Suspense>}
    </main>
  )
}

export const dynamic = 'force-dynamic'