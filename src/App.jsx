import { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { NotesProvider } from "./context/NotesProvider";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

function AppContent() {
  const { user } = useAuth();
  const [authView, setAuthView] = useState("login");

  if (!user) {
    return authView === "login" ? (
      <Login onSwitch={() => setAuthView("register")} />
    ) : (
      <Register onSwitch={() => setAuthView("login")} />
    );
  }

  return (
    <NotesProvider>
      <Dashboard />
    </NotesProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
