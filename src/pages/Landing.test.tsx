import { describe, it, expect, beforeEach } from "vitest";
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

  it("muestra el copy de landing-02 y enlaza el alta y el login", () => {
    renderLanding();

    expect(
      screen.getByRole("heading", { level: 1, name: /Pasa el encargo que no haces/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Recibe el que sí.")).toBeInTheDocument();
    expect(screen.getByText("Oficios de Alicante · por código postal")).toBeInTheDocument();
    expect(
      screen.getByText(
        "¿Eres fontanero y te piden pintar? Se lo pasas a un pintor de tu zona. Y cuando a él le pidan lo tuyo, te llama a ti.",
      ),
    ).toBeInTheDocument();
    const text = document.body.textContent ?? "";
    expect(text.match(/Apuntarse no tiene cuota\./g)?.length).toBeGreaterThan(1);
    expect(screen.getByText("Estamos formando los primeros grupos en Alicante.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Cómo funciona" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Te llega un encargo que no haces" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Se lo pasas a alguien de tu zona" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cuando le pidan lo tuyo, te llama" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Oficios que encajan" })).toBeInTheDocument();
    expect(screen.getByText("Fontanería")).toBeInTheDocument();
    expect(screen.getByText("Más oficios")).toBeInTheDocument();
    expect(
      screen.getByText("Estamos formando los primeros grupos. Si tu oficio no está en la lista, apúntate igual."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Súmate a los primeros grupos de tu zona" }),
    ).toBeInTheDocument();

    expect(text).not.toMatch(/curro/i);
    expect(text).not.toMatch(/12\s*%/);
    expect(text).not.toMatch(/comisi[oó]n/i);
    expect(text).not.toMatch(/FUNDADOR/);
    expect(text).not.toMatch(/Score/);
    expect(text).not.toMatch(/profesionales reales/i);
    expect(text).not.toMatch(/Test Professional/i);
    expect(text).not.toMatch(/www\./i);

    const primary = screen.getAllByRole("link", { name: "Apúntate con tu oficio" });
    expect(primary).toHaveLength(2);
    for (const link of primary) {
      expect(link).toHaveAttribute("href", REGISTER_HREF);
      expect(link).not.toHaveAttribute("target");
    }

    const header = screen.getAllByRole("link", { name: "Apúntate" });
    expect(header).toHaveLength(1);
    expect(header[0]).toHaveAttribute("href", REGISTER_HREF);

    const login = screen.getAllByRole("link", { name: "Ya soy aliado · Entrar" });
    expect(login).toHaveLength(2);
    for (const link of login) {
      expect(link).toHaveAttribute("href", LOGIN_HREF);
      expect(link.getAttribute("href")).not.toContain("invite");
      expect(link).not.toHaveAttribute("target");
    }

    expect(screen.queryByRole("link", { name: "Tengo un código" })).not.toBeInTheDocument();
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href") ?? "").not.toContain("invite");
      expect(link.getAttribute("href") ?? "").not.toContain("ruana.app/register");
      expect(link.getAttribute("href") ?? "").not.toContain("FUNDADOR");
    }
  });

  it("el alta navega directo, sin modal", () => {
    renderLanding();

    const cta = screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0];
    cta.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(cta);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("conserva los UTM y sigue usando ALC-IG", () => {
    window.sessionStorage.setItem(
      LANDING_UTM_STORAGE_KEY,
      JSON.stringify({
        utm_source: "instagram",
        utm_medium: "paid",
        utm_campaign: "alc_d1",
      }),
    );

    renderLanding();

    const href =
      "https://ruana-4293f.web.app/register?codigo=ALC-IG&utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1";
    const registerLinks = [
      ...screen.getAllByRole("link", { name: "Apúntate" }),
      ...screen.getAllByRole("link", { name: "Apúntate con tu oficio" }),
    ];
    expect(registerLinks.length).toBeGreaterThan(0);
    for (const link of registerLinks) {
      expect(link).toHaveAttribute("href", href);
    }
    expect(screen.getAllByRole("link", { name: "Ya soy aliado · Entrar" })[0]).toHaveAttribute(
      "href",
      LOGIN_HREF,
    );
  });
});
