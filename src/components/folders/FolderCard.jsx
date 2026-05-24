import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkIcon from "@mui/icons-material/Work";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FolderIcon from "@mui/icons-material/Folder";

const ICON_MAP = {
  user: PersonIcon,
  book: MenuBookIcon,
  briefcase: WorkIcon,
  lightbulb: LightbulbIcon,
  folder: FolderIcon,
};

export default function FolderCard({ category, noteCount, onClick, selected }) {
  const IconComponent = ICON_MAP[category.icon] || FolderIcon;

  return (
    <Card
      onClick={() => onClick?.(category)}
      sx={{
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
        borderLeft: 4,
        borderColor: category.color,
        ...(selected && {
          backgroundColor: `${category.color}18`,
          borderLeftWidth: 6,
        }),
      }}
    >
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: category.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconComponent sx={{ fontSize: 22, color: "common.white" }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant={selected ? "subtitle1" : "h6"}
              sx={{ fontWeight: selected ? 700 : 600 }}
              noWrap
            >
              {category.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {noteCount} {noteCount === 1 ? "nota" : "notas"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
