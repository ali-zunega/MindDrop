import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FolderCard from "./FolderCard";

export default function FolderList({ folders, onSelect, selectedId, variant = "grid" }) {
  if (variant === "list") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            category={folder}
            noteCount={folder.noteCount}
            onClick={onSelect}
            selected={folder.id === selectedId}
          />
        ))}
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {folders.map((folder) => (
        <Grid key={folder.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <FolderCard
            category={folder}
            noteCount={folder.noteCount}
            onClick={onSelect}
          />
        </Grid>
      ))}
    </Grid>
  );
}
