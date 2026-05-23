import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function NoteDetail({ open, note, category, onEdit, onDelete, onClose }) {
  if (!note) return null;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const createdDate = formatDate(note.createdAt);
  const updatedDate = note.updatedAt ? formatDate(note.updatedAt) : null;
  const showBoth = updatedDate && note.createdAt !== note.updatedAt;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
        {note.title}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 3 }}>
          {note.content}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>
              Categoría:
            </Typography>
            <Chip
              label={category?.name ?? "Sin categoría"}
              size="small"
              sx={{
                backgroundColor: category?.color ?? "grey.400",
                color: "common.white",
                fontWeight: 500,
              }}
            />
          </Box>

          {note.tags?.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>
                Tags:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {note.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Typography variant="caption" color="text.disabled" display="block">
          Creada el {createdDate}
        </Typography>
        {showBoth && (
          <Typography variant="caption" color="text.disabled" display="block">
            Última modificación el {updatedDate}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => onEdit(note)}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(note)}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
