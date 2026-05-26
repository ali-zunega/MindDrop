import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotes } from "../hooks/useNotes";
import { CATEGORIES } from "../mocks/categories";
import FolderList from "../components/folders/FolderList";
import NotesList from "../components/notes/NotesList";
import NoteForm from "../components/notes/NoteForm";
import NoteDetail from "../components/notes/NoteDetail";
import DeleteConfirmDialog from "../components/notes/DeleteConfirmDialog";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [view, setView] = useState("folders");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [detailNote, setDetailNote] = useState(null);

  const folderList = useMemo(() => {
    const mapped = CATEGORIES.map((cat) => ({
      ...cat,
      noteCount: notes.filter((n) => n.categoryId === cat.id).length,
    }));
    const uncategorizedCount = notes.filter(
      (n) => !n.categoryId || n.categoryId === "",
    ).length;
    if (uncategorizedCount > 0) {
      mapped.push({
        id: null,
        name: "Sin categoría",
        slug: "sin-categoria",
        color: "#9e9e9e",
        icon: "folder",
        noteCount: uncategorizedCount,
      });
    }
    return mapped;
  }, [notes]);

  const filteredNotes = useMemo(
    () =>
      notes.filter((n) => {
        if (selectedFolder?.id === null) {
          return !n.categoryId || n.categoryId === "";
        }
        return n.categoryId === selectedFolder?.id;
      }),
    [notes, selectedFolder],
  );

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
      if (detailNote?.id === noteData.id) {
        setDetailNote({ ...noteData, updatedAt: new Date().toISOString() });
        const oldCategoryId = detailNote.categoryId ?? null;
        const newCategoryId = noteData.categoryId ?? null;
        if (oldCategoryId !== newCategoryId) {
          const newFolder = newCategoryId
            ? CATEGORIES.find((c) => c.id === newCategoryId)
            : { id: null, name: "Sin categoría", slug: "sin-categoria", color: "#9e9e9e", icon: "folder" };
          if (newFolder) setSelectedFolder(newFolder);
        }
      }
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
    if (view === "detail") {
      setView("notes");
      setDetailNote(null);
    }
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    setView("notes");
  };

  const handleNoteClick = (note) => {
    setDetailNote(note);
    setView("detail");
  };

  const handleBack = () => {
    if (view === "detail") {
      setView("notes");
      setDetailNote(null);
    } else if (view === "notes") {
      setView("folders");
      setSelectedFolder(null);
    }
  };

  const handleDeleteFromDetail = (note) => {
    setDeletingNote(note);
  };

  const sidebar = (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          Carpetas
        </Typography>
        <FolderList
          folders={folderList}
          onSelect={handleFolderSelect}
          selectedId={selectedFolder?.id}
          variant="list"
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
            {user.name}
          </Typography>
        </Stack>
        <IconButton size="small" onClick={logout} title="Cerrar sesión">
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 4 },
        position: "relative",
        minHeight: "100dvh",
      }}
    >
      {/* Mobile header */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mb: { xs: 3, sm: 4 },
          alignItems: "center",
          justifyContent: "space-between",
          display: { md: "none" },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", minWidth: 0 }}
        >
          {view !== "folders" && (
            <IconButton
              onClick={handleBack}
              aria-label="Volver"
              sx={{ mr: 0.5 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {view === "folders" && (
            <Box
              component="img"
              src="/minddrop-logo.png"
              alt="MindDrop logo"
              sx={{ width: { xs: 36, sm: 44 }, height: "auto" }}
            />
          )}
          <Typography variant="h5" sx={{ fontWeight: 700 }} noWrap>
            {view === "folders" && "MindDrop"}
            {view === "notes" && (selectedFolder?.name || "Notas")}
            {view === "detail" && "Nota"}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              bgcolor: "primary.main",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          {!formOpen && (
            <Button
              variant="contained"
              startIcon={<NoteAddIcon />}
              onClick={handleCreateNote}
              sx={{
                display: { xs: "none", sm: "flex" },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                flexShrink: 0,
              }}
            >
              Nueva nota
            </Button>
          )}
          <IconButton
            size="small"
            onClick={logout}
            title="Cerrar sesión"
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Desktop header */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mb: 4,
          alignItems: "center",
          justifyContent: "space-between",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src="/minddrop-logo.png"
            alt="MindDrop logo"
            sx={{ width: 40, height: "auto" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            MindDrop
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Button
            variant="contained"
            startIcon={<NoteAddIcon />}
            onClick={handleCreateNote}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Nueva nota
          </Button>
          <IconButton size="small" onClick={logout} title="Cerrar sesión">
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Mobile content */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {view === "folders" && (
          <FolderList folders={folderList} onSelect={handleFolderSelect} />
        )}

        {view === "notes" && (
          <NotesList notes={filteredNotes} onClick={handleNoteClick} />
        )}

        {view === "detail" && (
          <NoteDetail
            note={detailNote}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDeleteFromDetail}
          />
        )}
      </Box>

      {/* Desktop content */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: 260,
            flexShrink: 0,
            position: "sticky",
            top: 0,
          }}
        >
          {sidebar}
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            borderLeft: 1,
            borderColor: "divider",
            pl: 4,
          }}
        >
          {view === "folders" && (
            <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Seleccioná una carpeta
              </Typography>
              <Typography variant="body2">
                Elegí una categoría del panel lateral para ver tus notas
              </Typography>
            </Box>
          )}

          {view === "notes" && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {selectedFolder?.name || "Notas"}
              </Typography>
              <NotesList notes={filteredNotes} onClick={handleNoteClick} />
            </>
          )}

          {view === "detail" && (
            <NoteDetail
              note={detailNote}
              onBack={() => {
                setView("notes");
                setDetailNote(null);
              }}
              onEdit={handleEdit}
              onDelete={handleDeleteFromDetail}
            />
          )}
        </Box>
      </Box>

      {/* Mobile FAB */}
      {!formOpen && (
        <Fab
          color="primary"
          aria-label="Agregar nota"
          onClick={handleCreateNote}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", md: "none" },
          }}
        >
          <NoteAddIcon />
        </Fab>
      )}

      {formOpen && (
        <NoteForm
          key={editingNote ? editingNote.id : "create"}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          categories={CATEGORIES}
          initialData={editingNote}
          defaultCategoryId={selectedFolder?.id}
        />
      )}

      <DeleteConfirmDialog
        open={!!deletingNote}
        note={deletingNote}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingNote(null)}
      />
    </Container>
  );
}
