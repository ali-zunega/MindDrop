import { describe, it, expect } from "vitest";
import { formatDate, formatDateLong, getInitial, nowISO } from "../../utils/formatters";

describe("formatDate", () => {
  it("formats an ISO date with short month", () => {
    const date = new Date(2026, 4, 20).toISOString();
    const result = formatDate(date);
    expect(result).toContain("20");
    expect(result).toContain("may");
    expect(result).toContain("2026");
  });
});

describe("formatDateLong", () => {
  it("formats an ISO date with long month and time", () => {
    const date = new Date(2026, 4, 20, 15, 30).toISOString();
    const result = formatDateLong(date);
    expect(result).toContain("20");
    expect(result).toContain("mayo");
    expect(result).toContain("2026");
    expect(result).toContain("2026");
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe("getInitial", () => {
  it("returns the first character uppercased", () => {
    expect(getInitial("alita")).toBe("A");
    expect(getInitial("María")).toBe("M");
    expect(getInitial("John")).toBe("J");
  });
});

describe("nowISO", () => {
  it("returns a valid ISO 8601 string", () => {
    const result = nowISO();
    expect(typeof result).toBe("string");
    expect(new Date(result).toISOString()).toBe(result);
  });
});
