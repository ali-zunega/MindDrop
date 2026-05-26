import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      type="search"
      placeholder="Buscar notas…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.disabled", fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange("")} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
}
