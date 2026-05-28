import { describe, it, expect } from "vitest";
import { isValidEmail, minLength, validateRequired, validateNoteForm } from "../../utils/validators";

describe("isValidEmail", () => {
  it("returns true for valid emails", () => {
    expect(isValidEmail("test@test.com")).toBe(true);
    expect(isValidEmail("user@domain.co")).toBe(true);
    expect(isValidEmail("a.b@c.d")).toBe(true);
  });

  it("returns false for invalid emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("test")).toBe(false);
    expect(isValidEmail("@test.com")).toBe(false);
    expect(isValidEmail("test@")).toBe(false);
  });
});

describe("minLength", () => {
  it("returns true when string meets minimum", () => {
    expect(minLength("abc", 3)).toBe(true);
    expect(minLength("hello", 1)).toBe(true);
  });

  it("returns true when trimmed string meets minimum", () => {
    expect(minLength("  abc  ", 3)).toBe(true);
  });

  it("returns false when string is too short", () => {
    expect(minLength("ab", 3)).toBe(false);
    expect(minLength("", 1)).toBe(false);
  });
});

describe("validateRequired", () => {
  it("returns valid for all filled fields", () => {
    const result = validateRequired({ name: "John", email: "j@j.com" });
    expect(result.valid).toBe(true);
    expect(result.field).toBeNull();
  });

  it("returns invalid with field name for empty value", () => {
    const result = validateRequired({ name: "", email: "j@j.com" });
    expect(result.valid).toBe(false);
    expect(result.field).toBe("name");
  });

  it("returns invalid for whitespace-only string", () => {
    const result = validateRequired({ name: "   " });
    expect(result.valid).toBe(false);
  });
});

describe("validateNoteForm", () => {
  it("returns error when title is empty", () => {
    const result = validateNoteForm({ title: "", content: "some content here" });
    expect(result.title).toBe("El título es obligatorio");
    expect(result.content).toBeUndefined();
  });

  it("returns error when content is empty", () => {
    const result = validateNoteForm({ title: "Title", content: "" });
    expect(result.content).toBe("El contenido es obligatorio");
    expect(result.title).toBeUndefined();
  });

  it("returns error when content is too short", () => {
    const result = validateNoteForm({ title: "Title", content: "short" });
    expect(result.content).toBe("Debe tener al menos 10 caracteres");
  });

  it("returns empty object for valid form", () => {
    const result = validateNoteForm({ title: "Title", content: "A longer content here" });
    expect(result).toEqual({});
  });
});
