import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDateLong } from "../../utils/formatters";

export default function NoteDetail({ note, onBack, onEdit, onDelete }) {
  if (!note) return null;

  const createdDate = formatDateLong(note.createdAt);
  const updatedDate = note.updatedAt ? formatDateLong(note.updatedAt) : null;
  const showBoth = updatedDate && note.createdAt !== note.updatedAt;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 3,
        }}
      >
        <IconButton onClick={onBack} aria-label="Volver">
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {note.title}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-wrap", mb: 3, lineHeight: 1.7 }}
      >
        {note.content}
      </Typography>

      {note.tags?.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 3 }}>
          {note.tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} variant="outlined" />
          ))}
        </Box>
      )}
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="caption"
        color="text.disabled"
        component="p"
        sx={{ mb: 0.5 }}
      >
        Creada el {createdDate}
      </Typography>
      {showBoth && (
        <Typography variant="caption" color="text.disabled" component="p">
          Última modificación el {updatedDate}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mt: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => onEdit(note)}
          sx={{ textTransform: "none", fontWeight: 600, flex: 1 }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(note)}
          sx={{ textTransform: "none", fontWeight: 600, flex: 1 }}
        >
          Eliminar
        </Button>
      </Box>
    </>
  );
}
