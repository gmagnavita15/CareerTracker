import { useState } from "react";
import toast from "react-hot-toast";
import { NOTE_CATEGORIES } from "../constants";
import { formatDate } from "../services/formatService";
import { validateRequired } from "../services/validationService";
import type { CareerNote, NoteCategory } from "../types";
import ConfirmDialog from "./ConfirmDialog";
import DetailPanel from "./DetailPanel";
import EmptyState from "./EmptyState";
import FilterBar from "./FilterBar";
import FormField from "./FormField";
import PageHeader from "./PageHeader";
import StatusBadge from "./StatusBadge";

type NoteListProps = {
  notes: CareerNote[];
  setNotes: React.Dispatch<React.SetStateAction<CareerNote[]>>;
};

function NoteList({ notes, setNotes }: NoteListProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Interview Prep");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | NoteCategory>("All");
  const [pendingDelete, setPendingDelete] = useState<CareerNote | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextTitleError = validateRequired(title, "Title", 120);
    const nextContentError = validateRequired(content, "Content", 4000);
    setTitleError(nextTitleError);
    setContentError(nextContentError);
    if (nextTitleError || nextContentError) {
      toast.error("Review the highlighted note fields.");
      return;
    }

    const timestamp = new Date().toISOString();
    setNotes((current) => [...current, {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: timestamp,
      updatedAt: timestamp,
    }]);
    toast.success("Note added");
    setTitle("");
    setContent("");
    setCategory("Interview Prep");
    setTitleError("");
    setContentError("");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    setNotes((current) => current.filter((note) => note.id !== pendingDelete.id));
    toast.success("Note deleted");
    setPendingDelete(null);
  }

  const filteredNotes = notes
    .filter((note) => {
      const search = searchTerm.trim().toLowerCase();
      return (
        (!search || [note.title, note.content, note.category]
          .some((value) => value.toLowerCase().includes(search))) &&
        (categoryFilter === "All" || note.category === categoryFilter)
      );
    })
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

  return (
    <>
      <PageHeader
        description="Keep interview preparation, research, networking context, and technical learning easy to retrieve."
        title="Notes"
      />

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Add a career note</h2>
            <p>Use focused categories so useful context stays searchable.</p>
          </div>
        </div>
        <form className="note-form" noValidate onSubmit={handleSubmit}>
          <FormField error={titleError} htmlFor="note-title" label="Title" required>
            <input
              aria-describedby={titleError ? "note-title-help" : undefined}
              id="note-title"
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </FormField>
          <FormField htmlFor="note-category" label="Category">
            <select id="note-category" onChange={(event) => setCategory(event.target.value as NoteCategory)} value={category}>
              {NOTE_CATEGORIES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </FormField>
          <FormField error={contentError} htmlFor="note-content" label="Content" required>
            <textarea
              aria-describedby={contentError ? "note-content-help" : undefined}
              id="note-content"
              maxLength={4000}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Capture decisions, questions, takeaways, or next actions"
              rows={6}
              value={content}
            />
          </FormField>
          <div className="form-actions"><button type="submit">Add note</button></div>
        </form>
      </section>

      <section className="section-card">
        <div className="panel-heading">
          <div>
            <h2>Knowledge base</h2>
            <p>Recently updated notes appear first.</p>
          </div>
        </div>
        <FilterBar resultCount={filteredNotes.length}>
          <input
            aria-label="Search notes"
            className="search-field"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, content, or category"
            type="search"
            value={searchTerm}
          />
          <select aria-label="Filter notes by category" onChange={(event) => setCategoryFilter(event.target.value as "All" | NoteCategory)} value={categoryFilter}>
            <option>All</option>
            {NOTE_CATEGORIES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FilterBar>

        {notes.length === 0 ? (
          <EmptyState description="Add a note above to build your career knowledge base." title="No notes yet" />
        ) : filteredNotes.length === 0 ? (
          <EmptyState description="Try a broader search or clear the current category filter." title="No notes match" />
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => {
              const isLong = note.content.length > 220;
              return (
                <article className="note-card" key={note.id}>
                  <div>
                    <div className="record-card-header">
                      <div>
                        <h3>{note.title}</h3>
                        <p className="note-date">Updated {formatDate(note.updatedAt)}</p>
                      </div>
                      <StatusBadge value={note.category} />
                    </div>
                    <p className={isLong ? "note-preview" : "note-content"}>{note.content}</p>
                    {isLong ? (
                      <DetailPanel label="Read full note">
                        <p className="note-content-full">{note.content}</p>
                      </DetailPanel>
                    ) : null}
                  </div>
                  <div className="note-actions">
                    <time dateTime={note.createdAt}>Created {formatDate(note.createdAt)}</time>
                    <button className="text-button danger-text" onClick={() => setPendingDelete(note)} type="button">
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <ConfirmDialog
        description={pendingDelete ? `This permanently removes “${pendingDelete.title}”.` : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        open={Boolean(pendingDelete)}
        title="Delete note?"
      />
    </>
  );
}

export default NoteList;
