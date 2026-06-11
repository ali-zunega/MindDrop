import { describe, it, expect, beforeEach, vi } from "vitest";
import { themeService } from "../../services/themeService";

beforeEach(() => {
  localStorage.clear();
});

function mockMatchMedia(matches) {
  const listeners = new Set();
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      addEventListener: (event, handler) => listeners.add(handler),
      removeEventListener: (event, handler) => listeners.delete(handler),
    })),
  });
  return listeners;
}

describe("themeService", () => {
  describe("getInitialTheme", () => {
    it("returns saved theme from localStorage", () => {
      localStorage.setItem("minddrop-theme", "dark");
      expect(themeService.getInitialTheme()).toBe("dark");
    });

    it("returns light when localStorage is light", () => {
      localStorage.setItem("minddrop-theme", "light");
      expect(themeService.getInitialTheme()).toBe("light");
    });

    it("returns dark when system prefers dark and no saved theme", () => {
      mockMatchMedia(true);
      expect(themeService.getInitialTheme()).toBe("dark");
    });

    it("returns light when system prefers light and no saved theme", () => {
      mockMatchMedia(false);
      expect(themeService.getInitialTheme()).toBe("light");
    });

    it("prioritizes saved theme over system preference", () => {
      localStorage.setItem("minddrop-theme", "light");
      mockMatchMedia(true);
      expect(themeService.getInitialTheme()).toBe("light");
    });
  });

  describe("setTheme", () => {
    it("saves theme to localStorage", () => {
      themeService.setTheme("dark");
      expect(localStorage.getItem("minddrop-theme")).toBe("dark");
    });

    it("overwrites previous theme", () => {
      localStorage.setItem("minddrop-theme", "light");
      themeService.setTheme("dark");
      expect(localStorage.getItem("minddrop-theme")).toBe("dark");
    });
  });

  describe("listenToSystemChanges", () => {
    it("calls callback with dark when system changes to dark and no saved theme", () => {
      const listeners = mockMatchMedia(false);
      const callback = vi.fn();

      themeService.listenToSystemChanges(callback);

      const handler = [...listeners][0];
      handler({ matches: true });

      expect(callback).toHaveBeenCalledWith("dark");
    });

    it("calls callback with light when system changes to light and no saved theme", () => {
      const listeners = mockMatchMedia(true);
      const callback = vi.fn();

      themeService.listenToSystemChanges(callback);

      const handler = [...listeners][0];
      handler({ matches: false });

      expect(callback).toHaveBeenCalledWith("light");
    });

    it("does not call callback when user has a saved theme", () => {
      localStorage.setItem("minddrop-theme", "dark");
      const listeners = mockMatchMedia(false);
      const callback = vi.fn();

      themeService.listenToSystemChanges(callback);

      const handler = [...listeners][0];
      handler({ matches: true });

      expect(callback).not.toHaveBeenCalled();
    });

    it("returns a cleanup function that removes the listener", () => {
      const listeners = mockMatchMedia(false);
      const callback = vi.fn();

      const cleanup = themeService.listenToSystemChanges(callback);
      cleanup();

      expect(listeners.size).toBe(0);
    });
  });
});
