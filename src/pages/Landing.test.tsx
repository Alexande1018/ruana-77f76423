import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "./Landing";
import { PUBLIC_ACCESS_CODE } from "@/lib/inauguralPhase";
import { LANDING_UTM_STORAGE_KEY } from "@/lib/registerUrl";

const REGISTER_HREF = `https://ruana-4293f.web.app/register?codigo=${PUBLIC_ACCESS_CODE}`;
const LOGIN_HREF = "https://ruana-4293f.web.app/";

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
  );
}

describe("Landing", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.pushState({}, "", "/");
  });

  it("explica RUANA y mantiene el código de acceso y las llamadas a la acción", () => {
    renderLanding();

    expect(screen.getByRole("heading", { level: 1, name: /El trabajo no se compra/i })).toBeInTheDocument();
    expect(screen.getByText(/RUANA conecta a profesionales de una misma zona/i)).toBeInTheDocument();
    expect(screen.getByText(/Ejemplo ilustrativo\. No representa encargos realizados\./i)).toBeInTheDocument();
    expect(screen.getByText(/apoyo RUANA del 12%/i)).toBeInTheDocument();
    expect(screen.getAllByText(PUBLIC_ACCESS_CODE).length).toBeGreaterThan(0);

    const primary = screen.getAllByRole("link", { name: "Apúntate con tu oficio" });
    expect(primary.length).toBeGreaterThan(0);
    for (const link of primary) {
      expect(link).toHaveAttribute("href", REGISTER_HREF);
      expect(link).not.toHaveAttribute("target");
    }

    expect(screen.getByRole("link", { name: "Apúntate" })).toHaveAttribute("href", REGISTER_HREF);
    expect(screen.getAllByRole("link", { name: "Ya soy aliado · Entrar" })[0]).toHaveAttribute("href", LOGIN_HREF);
    expect(screen.getByRole("link", { name: "Tengo un código" })).toHaveAttribute(
      "href",
      "https://ruana-4293f.web.app/invite.html",
    );
  });

  it("explica el acceso en el diálogo y conserva el código aplicado al registro", () => {
    renderLanding();

    fireEvent.click(screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(PUBLIC_ACCESS_CODE);
    expect(dialog).toHaveTextContent("El alta no tiene cuota");
    expect(dialog).toHaveTextContent("12%");

    expect(screen.getByRole("link", { name: "Continuar al registro" })).toHaveAttribute("href", REGISTER_HREF);
  });

  it("conserva los UTM de Instagram en el registro y el acceso con código", () => {
    window.sessionStorage.setItem(
      LANDING_UTM_STORAGE_KEY,
      JSON.stringify({ utm_source: "instagram", utm_medium: "paid", utm_campaign: "alc_d1" }),
    );

    renderLanding();

    const href = "https://ruana-4293f.web.app/register?codigo=ALC-IG&utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1";
    expect(screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0]).toHaveAttribute("href", href);
    expect(screen.getByRole("link", { name: "Tengo un código" })).toHaveAttribute(
      "href",
      "https://ruana-4293f.web.app/invite.html?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1",
    );
  });
});
