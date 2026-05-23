import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MAX_CONTENT_LENGTH = 60;

export default function NoteCard({ note, category, onEdit, onDelete, onClick }) {
  const truncated =
    note.content.length > MAX_CONTENT_LENGTH
      ? note.content.slice(0, MAX_CONTENT_LENGTH) + "..."
      : note.content;

  const wasModified = note.updatedAt && note.updatedAt !== note.createdAt;
  const displayDate = new Date(wasModified ? note.updatedAt : note.createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card
      onClick={() => onClick?.(note)}
      sx={{
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {note.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {truncated}
        </Typography>

        <Chip
          label={category?.name ?? "Sin categoría"}
          size="medium"
          sx={{
            backgroundColor: category?.color ?? "grey.400",
            color: "common.white",
            fontWeight: 500,
          }}
        />

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: "block", mt: 1 }}
        >
          {wasModified ? `Última modificación el ${displayDate}` : `Creada el ${displayDate}`}
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1 }}
        >
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            aria-label="Editar"
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(note); }}
            aria-label="Eliminar"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
