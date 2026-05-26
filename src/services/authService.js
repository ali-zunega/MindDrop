import { SEED_USERS } from "../mocks/users";

const USERS_KEY = "minddrop-users";
const SESSION_KEY = "minddrop-current-user";

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function initUsers() {
  const users = getUsers();
  if (users.length > 0) return;
  saveUsers(SEED_USERS);
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return { success: false, error: "El email ya está registrado" };
  }
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
  };
  users.push(newUser);
  saveUsers(users);
  const session = { id: newUser.id, name: newUser.name, email: newUser.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { success: false, error: "Email no registrado" };
  }
  if (user.password !== password) {
    return { success: false, error: "Contraseña incorrecta" };
  }
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

export function logoutUser() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}
