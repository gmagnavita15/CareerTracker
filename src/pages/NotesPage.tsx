import NoteList from "../components/NoteList";
import type { CareerNote } from "../types";

type NotesPageProps = {
    notes: CareerNote[];
    setNotes: React.Dispatch<React.SetStateAction<CareerNote[]>>;
};

function NotesPage({notes,setNotes,}: NotesPageProps) {
    return <NoteList notes={notes} setNotes={setNotes} />;
}

export default NotesPage;