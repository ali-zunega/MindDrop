import { NotesProvider } from "./context/NotesProvider";
import Dashboard from "./views/Dashboard";

export default function App() {
  return (
    <NotesProvider>
      <Dashboard />
    </NotesProvider>
  );
}
