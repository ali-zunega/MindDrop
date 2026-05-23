import Grid from "@mui/material/Grid";
import NoteCard from "./NoteCard";

export default function NotesList({ notes, categories, onEdit, onDelete, onClick }) {
  return (
    <Grid container spacing={2}>
      {notes.map((note) => {
        const category = categories.find((c) => c.id === note.categoryId);
        return (
          <Grid key={note.id} size={{ xs: 12, sm: 6 }}>
            <NoteCard
              note={note}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
              onClick={onClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
