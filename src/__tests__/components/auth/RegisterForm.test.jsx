import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { AuthContext } from "../../../context/authContext";
import RegisterForm from "../../../components/auth/RegisterForm";

function renderRegisterForm(mockRegister = vi.fn()) {
  return render(
    <AuthContext.Provider value={{ register: mockRegister, user: null }}>
      <RegisterForm />
    </AuthContext.Provider>,
  );
}

describe("RegisterForm", () => {
  it("renders all fields", () => {
    renderRegisterForm();
    expect(screen.getByLabelText(/^Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirmar contraseña/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
  });

  it("shows error when submitting with empty fields", async () => {
    const user = userEvent.setup();
    renderRegisterForm();
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("Completá todos los campos")).toBeInTheDocument();
  });

  it("shows error when name is too short", async () => {
    const user = userEvent.setup();
    renderRegisterForm();
    await user.type(screen.getByLabelText(/^Nombre/), "A");
    await user.type(screen.getByLabelText(/^Email/), "a@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("El nombre debe tener al menos 2 caracteres")).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    renderRegisterForm();
    await user.type(screen.getByLabelText(/^Nombre/), "Test User");
    await user.type(screen.getByLabelText(/^Email/), "invalid");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("Ingresá un email válido")).toBeInTheDocument();
  });

  it("shows error when password is too short", async () => {
    const user = userEvent.setup();
    renderRegisterForm();
    await user.type(screen.getByLabelText(/^Nombre/), "Test User");
    await user.type(screen.getByLabelText(/^Email/), "a@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "123");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("La contraseña debe tener al menos 6 caracteres")).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderRegisterForm();
    await user.type(screen.getByLabelText(/^Nombre/), "Test User");
    await user.type(screen.getByLabelText(/^Email/), "a@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "654321");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument();
  });

  it("calls register with user data on valid submit", async () => {
    const mockRegister = vi.fn().mockReturnValue({ success: true, user: {} });
    const user = userEvent.setup();
    renderRegisterForm(mockRegister);
    await user.type(screen.getByLabelText(/^Nombre/), "Test User");
    await user.type(screen.getByLabelText(/^Email/), "a@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(mockRegister).toHaveBeenCalledWith({
      name: "Test User",
      email: "a@b.com",
      password: "123456",
    });
  });

  it("shows error from register result", async () => {
    const mockRegister = vi.fn().mockReturnValue({ success: false, error: "El email ya está registrado" });
    const user = userEvent.setup();
    renderRegisterForm(mockRegister);
    await user.type(screen.getByLabelText(/^Nombre/), "Test User");
    await user.type(screen.getByLabelText(/^Email/), "dup@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.type(screen.getByLabelText(/^Confirmar contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("El email ya está registrado")).toBeInTheDocument();
  });
});
