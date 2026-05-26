import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteCard from "./NoteCard";

export default function NotesList({ notes, onClick, searchQuery }) {
  if (notes.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="body1">
          {searchQuery
            ? `No se encontraron notas para «${searchQuery}»`
            : "No hay notas en esta carpeta"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onClick={onClick} />
      ))}
    </Box>
  );
}
