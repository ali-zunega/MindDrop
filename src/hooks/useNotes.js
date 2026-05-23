import { useContext } from "react";
import { NotesContext } from "../context/notesContext";

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes debe usarse dentro de NotesProvider");
  }
  return context;
}
