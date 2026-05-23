import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { CATEGORIES } from "../mocks/categories";
import NotesList from "../components/notes/NotesList";
import NoteForm from "../components/notes/NoteForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteConfirmDialog from "../components/notes/DeleteConfirmDialog";
import NoteDetail from "../components/notes/NoteDetail";

export default function Dashboard() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [detailNote, setDetailNote] = useState(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setFormOpen(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormOpen(true);
  };

  const handleFormSubmit = (noteData) => {
    if (noteData.id) {
      updateNote(noteData);
    } else {
      addNote(noteData);
    }
    setFormOpen(false);
    setEditingNote(null);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingNote(null);
  };

  const handleDeleteConfirm = () => {
    deleteNote(deletingNote.id);
    setDeletingNote(null);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: { xs: 2, sm: 4 }, position: "relative" }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mb: { xs: 3, sm: 4 },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src="/minddrop-logo.png"
            alt="MindDrop logo"
            sx={{ width: { xs: 36, sm: 44 }, height: "auto" }}
          />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            MindDrop
          </Typography>
        </Stack>

        <Button
          variant="contained"
          startIcon={<NoteAddIcon />}
          onClick={handleCreateNote}
          sx={{
            display: { xs: "none", sm: "flex" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Nueva nota
        </Button>
      </Stack>

      <NotesList
        notes={notes}
        categories={CATEGORIES}
        onEdit={handleEdit}
        onDelete={setDeletingNote}
        onClick={setDetailNote}
      />

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleCreateNote}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { xs: "flex", sm: "none" },
        }}
      >
        <NoteAddIcon />
      </Fab>

      {formOpen && (
        <NoteForm
          key={editingNote ? editingNote.id : "create"}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          categories={CATEGORIES}
          initialData={editingNote}
        />
      )}

      <DeleteConfirmDialog
        open={!!deletingNote}
        note={deletingNote}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingNote(null)}
      />

      <NoteDetail
        open={!!detailNote}
        note={detailNote}
        category={CATEGORIES.find((c) => c.id === detailNote?.categoryId)}
        onEdit={(note) => { setDetailNote(null); handleEdit(note); }}
        onDelete={(note) => { setDetailNote(null); setDeletingNote(note); }}
        onClose={() => setDetailNote(null)}
      />
    </Container>
  );
}
