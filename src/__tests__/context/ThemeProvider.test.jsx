import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../context/ThemeProvider";
import { useTheme } from "../../hooks/useTheme";

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

function renderWithProvider(initialStorage) {
  if (initialStorage !== undefined) {
    localStorage.setItem("minddrop-theme", initialStorage);
  }
  return render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("ThemeProvider", () => {
  it("renders children", () => {
    renderWithProvider("light");
    expect(screen.getByTestId("theme-value")).toBeInTheDocument();
  });

  it("provides light theme when localStorage says light", () => {
    renderWithProvider("light");
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  });

  it("provides dark theme when localStorage says dark", () => {
    renderWithProvider("dark");
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  it("falls back to system preference when localStorage is empty", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    renderWithProvider();
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  it("toggles from light to dark on toggleTheme", async () => {
    const user = userEvent.setup();
    renderWithProvider("light");
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    await user.click(screen.getByTestId("toggle-btn"));

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  it("toggles from dark to light on toggleTheme", async () => {
    const user = userEvent.setup();
    renderWithProvider("dark");
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");

    await user.click(screen.getByTestId("toggle-btn"));

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  });

  it("persists new theme to localStorage after toggle", async () => {
    const user = userEvent.setup();
    renderWithProvider("light");

    await user.click(screen.getByTestId("toggle-btn"));

    expect(localStorage.getItem("minddrop-theme")).toBe("dark");
  });
});

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme debe ser usado dentro de un ThemeProvider",
    );
    consoleSpy.mockRestore();
  });
});
