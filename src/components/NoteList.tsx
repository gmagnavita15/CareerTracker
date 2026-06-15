import { useState } from "react";
import toast from "react-hot-toast";
import type { CareerNote, NoteCategory, } from "../types";
import { NOTE_CATEGORIES } from "../constants";
import SectionHeader from "./SectionHeader";

type NoteListProps = {
  notes: CareerNote[];
  setNotes: React.Dispatch<React.SetStateAction<CareerNote[]>>;
};

function NoteList({ notes, setNotes }: NoteListProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Interview Prep");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const newNote: CareerNote = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
    };

    setNotes([...notes, newNote]);
    toast.success("Note added");

    setTitle("");
    setContent("");
    setCategory("Interview Prep");
  }

  function handleDelete(id: string) {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted");
  }

  return (
    <section className="section-card">
      <SectionHeader
        title="Career Notes"
        description="Save interview prep, networking, and technical notes."
      />

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as NoteCategory)}
        >
          {NOTE_CATEGORIES.map((categoryOption) => (
            <option key={categoryOption}>{categoryOption}</option>
          ))}
        </select>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your note..."
        />

        <button type="submit">Add Note</button>
      </form>

      {notes.length === 0 ? (
        <p className="empty-state">No notes yet. Add your first career note.</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <article className="note-card" key={note.id}>
              <div>
                <h3>{note.title}</h3>
                <p className="note-category">{note.category}</p>
                <p>{note.content}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default NoteList;