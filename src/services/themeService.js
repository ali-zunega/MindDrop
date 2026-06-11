const STORAGE_KEY = "minddrop-theme";

export const themeService = {
  // Obtiene el tema inicial
  getInitialTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) return savedTheme;

    // detecta la preferencia del sistema si no hay guardado
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  },

  // Guarda la preferencia manual
  setTheme(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
  },

  // Escucha los cambios del sistema operativo
  listenToSystemChanges(callback) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e) => {
      // Solo ejecuta el callback si el usuario NO tiene una preferencia guardada
      if (!localStorage.getItem(STORAGE_KEY)) {
        callback(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handler);

    // Retorna la función de limpieza (cleanup)
    return () => mediaQuery.removeEventListener("change", handler);
  },
};
