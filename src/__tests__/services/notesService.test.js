import { describe, it, expect, beforeEach } from "vitest";
import { loadNotes, saveNotes } from "../../services/notesService";

const USER_ID = "user-1";
const FALLBACK = [{ id: "1", title: "fallback note", content: "content", tags: [] }];

beforeEach(() => {
  localStorage.clear();
});

describe("loadNotes", () => {
  it("returns fallback when no data exists", () => {
    const notes = loadNotes(USER_ID, FALLBACK);
    expect(notes).toEqual(FALLBACK);
  });

  it("returns saved notes for the given user", () => {
    const data = [{ id: "n1", title: "My note", content: "hello", tags: [] }];
    saveNotes(USER_ID, data);

    const notes = loadNotes(USER_ID, FALLBACK);
    expect(notes).toEqual(data);
  });

  it("returns user-scoped notes even if global key exists", () => {
    const data = [{ id: "n1", title: "User note", content: "a", tags: [] }];
    saveNotes(USER_ID, data);

    localStorage.setItem("minddrop-notes", JSON.stringify([{ id: "old", title: "old", content: "b", tags: [] }]));

    const notes = loadNotes(USER_ID, FALLBACK);
    expect(notes).toEqual(data);
  });

  it("migrates from old global key when user key does not exist", () => {
    const oldData = [{ id: "old", title: "migrated", content: "migrated content", tags: [] }];
    localStorage.setItem("minddrop-notes", JSON.stringify(oldData));

    const notes = loadNotes(USER_ID, FALLBACK);
    expect(notes).toEqual(oldData);
    expect(localStorage.getItem("minddrop-notes")).toBeNull();
    expect(localStorage.getItem(`minddrop-notes-${USER_ID}`)).not.toBeNull();
  });

  it("returns structuredClone of fallback (not the same reference)", () => {
    const notes = loadNotes(USER_ID, FALLBACK);
    expect(notes).not.toBe(FALLBACK);
  });
});

describe("saveNotes", () => {
  it("persists notes to localStorage", () => {
    const data = [{ id: "1", title: "saved", content: "saved content", tags: ["tag"] }];
    saveNotes(USER_ID, data);

    const raw = localStorage.getItem(`minddrop-notes-${USER_ID}`);
    expect(JSON.parse(raw)).toEqual(data);
  });
});
