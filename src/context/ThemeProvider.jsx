import { useMemo, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "./themeContext";
import { themeService } from "../services/themeService";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(themeService.getInitialTheme);

  useEffect(() => {
    themeService.setTheme(mode);
  }, [mode]);

  useEffect(() => {
    const cleanup = themeService.listenToSystemChanges((newMode) => {
      setMode(newMode);
    });
    return cleanup;
  }, []);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
          ...(mode === "light"
            ? { background: { default: "#f5f5f5" } }
            : { background: { default: "#121212" } }),
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
