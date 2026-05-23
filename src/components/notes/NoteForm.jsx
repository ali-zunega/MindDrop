import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function NoteForm({
  onClose,
  onSubmit,
  categories,
  initialData,
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialData?.tags || []);

  const isEditing = !!initialData;

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      ...(initialData && {
        id: initialData.id,
        createdAt: initialData.createdAt,
      }),
      title: title.trim(),
      content: content.trim(),
      categoryId: categoryId || null,
      tags,
    });

    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEditing ? "Editar nota" : "Nueva nota"}
      </DialogTitle>
      <Box
        component="form"
        name="noteForm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <DialogContent>
          {/* TÍTULO */}
          <TextField
            autoFocus
            id="title"
            name="title"
            label="Título"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
            autoComplete="off"
          />

          {/* CONTENIDO */}
          <TextField
            id="content"
            name="content"
            label="Contenido"
            inputprops={{
              id: "content",
              name: "content",
            }}
            autoComplete="off"
            fullWidth
            required
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* CATEGORÍA */}
          <TextField
            select
            id="category"
            name="category"
            label="Categoría"
            fullWidth
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Sin categoría</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          {/* ETIQUETAS */}
          <TextField
            id="tags"
            name="tags"
            label="Etiquetas"
            helperText="(Enter para agregar)"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />

          {tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => handleDeleteTag(tag)}
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
