import { describe, it, expect, beforeEach } from "vitest";
import {
  initUsers,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../../services/authService";

beforeEach(() => {
  localStorage.clear();
});

describe("initUsers", () => {
  it("seeds users on first call", () => {
    initUsers();
    const raw = localStorage.getItem("minddrop-users");
    expect(raw).not.toBeNull();
    const users = JSON.parse(raw);
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("ali@minddrop.com");
  });

  it("does not seed if users already exist", () => {
    localStorage.setItem("minddrop-users", JSON.stringify([{ id: "x", email: "custom@test.com" }]));
    initUsers();
    const users = JSON.parse(localStorage.getItem("minddrop-users"));
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("custom@test.com");
  });
});

describe("registerUser", () => {
  it("registers a new user and starts session", () => {
    const result = registerUser({ name: "Test", email: "test@test.com", password: "123456" });
    expect(result.success).toBe(true);
    expect(result.user.email).toBe("test@test.com");
    expect(result.user.name).toBe("Test");
    expect(result.user.id).toBeDefined();

    const session = JSON.parse(localStorage.getItem("minddrop-current-user"));
    expect(session.email).toBe("test@test.com");
  });

  it("returns error when email is already registered", () => {
    registerUser({ name: "Test", email: "dup@test.com", password: "123456" });
    const result = registerUser({ name: "Test 2", email: "dup@test.com", password: "abcdef" });
    expect(result.success).toBe(false);
    expect(result.error).toBe("El email ya está registrado");
  });
});

describe("loginUser", () => {
  beforeEach(() => {
    initUsers();
  });

  it("logs in with valid seed credentials", () => {
    const result = loginUser({ email: "ali@minddrop.com", password: "123456" });
    expect(result.success).toBe(true);
    expect(result.user.email).toBe("ali@minddrop.com");
    expect(result.user.name).toBe("Alita Ejemplo");
  });

  it("returns error for unregistered email", () => {
    const result = loginUser({ email: "no@existe.com", password: "123456" });
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email no registrado");
  });

  it("returns error for wrong password", () => {
    const result = loginUser({ email: "ali@minddrop.com", password: "wrong" });
    expect(result.success).toBe(false);
    expect(result.error).toBe("Contraseña incorrecta");
  });
});

describe("logoutUser", () => {
  it("removes session from localStorage", () => {
    localStorage.setItem("minddrop-current-user", JSON.stringify({ id: "1", email: "a@a.com" }));
    logoutUser();
    expect(localStorage.getItem("minddrop-current-user")).toBeNull();
  });
});

describe("getCurrentUser", () => {
  it("returns null when no session", () => {
    expect(getCurrentUser()).toBeNull();
  });

  it("returns user when session exists", () => {
    localStorage.setItem("minddrop-current-user", JSON.stringify({ id: "1", name: "A", email: "a@a.com" }));
    const user = getCurrentUser();
    expect(user.email).toBe("a@a.com");
  });
});
