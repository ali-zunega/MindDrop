import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NoteForm from "../../../components/notes/NoteForm";

const CATEGORIES = [
  { id: "cat-1", name: "Personal", slug: "personal", color: "#faa99d", icon: "user" },
  { id: "cat-2", name: "Trabajo", slug: "trabajo", color: "#fb8d8d", icon: "briefcase" },
];

function renderNoteForm(props = {}) {
  const defaultProps = {
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    categories: CATEGORIES,
    initialData: null,
    defaultCategoryId: null,
  };
  return render(<NoteForm {...defaultProps} {...props} />);
}

describe("NoteForm", () => {
  it("renders form fields", () => {
    renderNoteForm();
    expect(screen.getByLabelText(/^Título/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contenido/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Categoría/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Etiquetas/)).toBeInTheDocument();
  });

  it("shows 'Nueva nota' title when creating", () => {
    renderNoteForm();
    expect(screen.getByText("Nueva nota")).toBeInTheDocument();
  });

  it("shows 'Editar nota' title when editing", () => {
    renderNoteForm({ initialData: { id: "1", title: "Test", content: "Content here", tags: [] } });
    expect(screen.getByText("Editar nota")).toBeInTheDocument();
  });

  it("shows error when title is empty", async () => {
    const user = userEvent.setup();
    renderNoteForm();
    await user.type(screen.getByLabelText(/^Contenido/), "some content here");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
  });

  it("shows error when content is too short", async () => {
    const user = userEvent.setup();
    renderNoteForm();
    await user.type(screen.getByLabelText(/^Título/), "My Title");
    await user.type(screen.getByLabelText(/^Contenido/), "short");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Debe tener al menos 10 caracteres")).toBeInTheDocument();
  });

  it("calls onSubmit with note data on valid submit", async () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderNoteForm({ onSubmit, onClose });

    await user.type(screen.getByLabelText(/^Título/), "My Note");
    await user.type(screen.getByLabelText(/^Contenido/), "This is a valid content");
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "My Note",
        content: "This is a valid content",
        tags: [],
      }),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("pre-fills fields when editing", () => {
    renderNoteForm({
      initialData: {
        id: "n1",
        title: "Existing Title",
        content: "Existing content here",
        tags: ["tag1", "tag2"],
      },
    });
    expect(screen.getByDisplayValue("Existing Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing content here")).toBeInTheDocument();
  });
});
