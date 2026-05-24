import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export default function NoteCard({ note, onClick }) {
  const wasModified = note.updatedAt && note.updatedAt !== note.createdAt;
  const displayDate = new Date(
    wasModified ? note.updatedAt : note.createdAt
  ).toLocaleDateString("es-AR", {
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

        {note.tags?.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
            {note.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}

        <Typography variant="caption" color="text.disabled">
          {wasModified
            ? `Modificada el ${displayDate}`
            : `Creada el ${displayDate}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
