import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NoteCard from "../../../components/notes/NoteCard";

const BASE_NOTE = {
  id: "1",
  title: "Test Note",
  content: "Some content here",
  tags: ["tag1", "tag2"],
  createdAt: new Date(2026, 4, 20).toISOString(),
};

describe("NoteCard", () => {
  it("renders title and tags", () => {
    render(<NoteCard note={BASE_NOTE} />);
    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("#tag1")).toBeInTheDocument();
    expect(screen.getByText("#tag2")).toBeInTheDocument();
  });

  it("shows creation date when not modified", () => {
    render(<NoteCard note={BASE_NOTE} />);
    expect(screen.getByText(/Creada el/)).toBeInTheDocument();
  });

  it("shows modification date when updatedAt differs", () => {
    const modified = {
      ...BASE_NOTE,
      updatedAt: new Date(2026, 4, 25).toISOString(),
    };
    render(<NoteCard note={modified} />);
    expect(screen.getByText(/Modificada el/)).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<NoteCard note={BASE_NOTE} onClick={onClick} />);
    await user.click(screen.getByText("Test Note"));
    expect(onClick).toHaveBeenCalledWith(BASE_NOTE);
  });

  it("renders without tags", () => {
    const noTags = { ...BASE_NOTE, tags: [] };
    render(<NoteCard note={noTags} />);
    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.queryByText("#tag1")).not.toBeInTheDocument();
  });
});
