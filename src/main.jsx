import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Aquí configuras los colores de MindDrop
const theme = createTheme({
  palette: {
    mode: "light", // Cambiar a 'dark' más adelante para el modo oscuro
    primary: {
      main: "#3f51b5", // Un azul/violeta elegante para los botones principales
    },
    secondary: {
      main: "#f50057", // Color de acento
    },
    background: {
      default: "#f5f5f5", // Un gris muy sutil de fondo para que las notas resalten
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza el CSS en todos los navegadores, eliminando márgenes raros */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
