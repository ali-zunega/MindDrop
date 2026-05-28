import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { AuthContext } from "../../../context/authContext";
import LoginForm from "../../../components/auth/LoginForm";

function renderLoginForm(mockLogin = vi.fn()) {
  return render(
    <AuthContext.Provider value={{ login: mockLogin, user: null }}>
      <LoginForm />
    </AuthContext.Provider>,
  );
}

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    renderLoginForm();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  it("shows error when submitting with empty fields", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(screen.getByText("Completá todos los campos")).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByLabelText(/^Email/), "notanemail");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(screen.getByText("Ingresá un email válido")).toBeInTheDocument();
  });

  it("calls login with credentials on valid submit", async () => {
    const mockLogin = vi.fn().mockReturnValue({ success: true, user: {} });
    const user = userEvent.setup();
    renderLoginForm(mockLogin);
    await user.type(screen.getByLabelText(/^Email/), "a@b.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(mockLogin).toHaveBeenCalledWith({ email: "a@b.com", password: "123456" });
  });

  it("shows error from login result", async () => {
    const mockLogin = vi.fn().mockReturnValue({ success: false, error: "Email no registrado" });
    const user = userEvent.setup();
    renderLoginForm(mockLogin);
    await user.type(screen.getByLabelText(/^Email/), "no@existe.com");
    await user.type(screen.getByLabelText(/^Contraseña/), "123456");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(screen.getByText("Email no registrado")).toBeInTheDocument();
  });
});
