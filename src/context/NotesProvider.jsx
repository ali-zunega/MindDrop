import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { INITIAL_NOTES } from "../mocks/initialNotes";
import { NotesContext } from "./notesContext";
import { loadNotes, saveNotes } from "../services/notesService";

export function NotesProvider({ children }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState(() => {
    const isSeed = user.id === "user-1";
    return loadNotes(user.id, isSeed ? INITIAL_NOTES : []);
  });

  useEffect(() => {
    if (user) saveNotes(user.id, notes);
  }, [notes, user]);

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
