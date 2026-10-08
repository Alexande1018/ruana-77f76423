import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "./Landing";
import { PUBLIC_ACCESS_CODE } from "@/lib/inauguralPhase";
import { LANDING_UTM_STORAGE_KEY } from "@/lib/registerUrl";

vi.mock("@/components/NodeField", () => ({
  NodeField: () => null,
}));

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

  it("abre con el encargo, el código ALC-IG y el login de aliados", () => {
    renderLanding();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "¿Estás sin trabajo, pero sabes hacer un oficio? En RUANA otros profesionales de tu zona te recomiendan para los trabajos que ellos no pueden hacer.",
    );
    expect(screen.getAllByText(/Oye, ¿conoces a un buen electricista/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo tuyo, te llama a ti.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Apuntarse no tiene cuota.").length).toBeGreaterThan(0);
    expect(screen.getByText(/pasar el encargo/i)).toBeInTheDocument();

    expect(screen.queryByText(/curro/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/12%/)).not.toBeInTheDocument();
    expect(screen.queryByText(/comisi[oó]n/i)).not.toBeInTheDocument();
    expect(screen.queryByText("FUNDADOR")).not.toBeInTheDocument();
    expect(screen.queryByText(/Aliado Fundador/i)).not.toBeInTheDocument();
    expect(screen.queryByText("El grupo, en la aplicación")).not.toBeInTheDocument();
    expect(screen.queryByText(/Test Professional/i)).not.toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Apúntate con tu oficio" });
    expect(primary.length).toBeGreaterThan(1);
    for (const link of primary) {
      expect(link).toHaveAttribute("href", REGISTER_HREF);
      expect(link).not.toHaveAttribute("target");
    }

    const header = screen.getAllByRole("link", { name: (name) => name === "Apúntate" });
    expect(header.length).toBeGreaterThan(0);
    expect(header[0]).toHaveAttribute("href", REGISTER_HREF);

    const login = screen.getAllByRole("link", { name: "Ya soy aliado · Entrar" });
    expect(login.length).toBeGreaterThan(0);
    for (const link of login) {
      expect(link).toHaveAttribute("href", LOGIN_HREF);
      expect(link.getAttribute("href")).not.toContain("invite");
      expect(link).not.toHaveAttribute("target");
    }

    const haveCode = screen.getByRole("link", { name: "Tengo un código" });
    expect(haveCode).toHaveAttribute("href", "https://ruana-4293f.web.app/invite.html");

    expect(screen.getAllByText(PUBLIC_ACCESS_CODE).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "Los que abren el grupo entran con un código." }),
    ).toBeInTheDocument();
  });

  it("separa el número del título en cómo entrar", () => {
    renderLanding();

    const title = screen.getByRole("heading", { name: "Encuentra tu grupo" });
    expect(title).toHaveTextContent(/^Encuentra tu grupo$/);
    expect(title.parentElement?.textContent).not.toMatch(/01/);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("muestra un grupo de plazas de ejemplo", () => {
    renderLanding();

    expect(screen.getByText(/Así puede verse un grupo RUANA/i)).toBeInTheDocument();
    expect(screen.getByText("Plaza ocupada")).toBeInTheDocument();
  });

  it("abre el modal de invitación con ALC-IG y el alta usa ese código", () => {
    renderLanding();

    const cta = screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0];
    fireEvent.click(cta);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(PUBLIC_ACCESS_CODE);
    expect(dialog).not.toHaveTextContent("FUNDADOR");
    expect(dialog).not.toHaveTextContent("12%");
    expect(dialog).not.toHaveTextContent("Aliados Fundadores");

    const signup = screen.getByRole("link", { name: `Apuntarme con ${PUBLIC_ACCESS_CODE}` });
    expect(signup).toHaveAttribute("href", REGISTER_HREF);
  });

  it("conserva los UTM de Instagram y sigue usando ALC-IG", () => {
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
    expect(screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0]).toHaveAttribute(
      "href",
      href,
    );
    expect(screen.getByRole("link", { name: "Tengo un código" })).toHaveAttribute(
      "href",
      "https://ruana-4293f.web.app/invite.html?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1",
    );
  });
});
