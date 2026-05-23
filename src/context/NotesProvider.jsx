import { useState, useEffect } from "react";
import { INITIAL_NOTES } from "../mocks/initialNotes";
import { NotesContext } from "./notesContext";
import { loadNotes, saveNotes } from "../services/notesService";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => loadNotes(INITIAL_NOTES));

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (noteData) => {
    const now = new Date().toISOString();
    const newNote = { id: String(Date.now()), createdAt: now, updatedAt: now, ...noteData };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (noteData) => {
    setNotes((prev) => prev.map((n) => (n.id === noteData.id ? { ...noteData, updatedAt: new Date().toISOString() } : n)));
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
