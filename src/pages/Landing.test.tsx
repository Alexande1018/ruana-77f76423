import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "./Landing";
import { LANDING_UTM_STORAGE_KEY } from "@/lib/registerUrl";

vi.mock("@/components/NodeField", () => ({
  NodeField: () => null,
}));

const FUNDADOR_HREF = "https://ruana-4293f.web.app/register?codigo=FUNDADOR";
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

  it("abre con el mensaje del anuncio y el alta sin modal", () => {
    renderLanding();

    expect(
      screen.getByRole("heading", { level: 1, name: /Pasa el curro que no haces/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Recibe el que sí.")).toBeInTheDocument();
    expect(screen.getByText("Oficios de Alicante · por código postal")).toBeInTheDocument();
    expect(
      screen.getByText(
        "¿Te piden algo que no haces? Pásaselo a un colega de tu zona. Y cuando a él le pidan lo tuyo, te llama a ti.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sin cuota mensual. Solo un 12% si cierras un curro que te llegó por RUANA."),
    ).toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Apúntate con tu oficio" });
    expect(primary.length).toBeGreaterThan(1);
    expect(primary[0]).toHaveAttribute("href", FUNDADOR_HREF);
    expect(primary[0]).not.toHaveAttribute("target");

    const header = screen.getAllByRole("link", { name: (name) => name === "Apúntate" });
    expect(header.length).toBeGreaterThan(0);
    expect(header[0]).toHaveAttribute("href", FUNDADOR_HREF);

    const login = screen.getAllByRole("link", { name: "Ya soy aliado · Entrar" });
    expect(login.length).toBeGreaterThan(0);
    expect(login[0]).toHaveAttribute("href", LOGIN_HREF);
    expect(login[0]).not.toHaveAttribute("target");

    expect(screen.queryByText("Solicitar acceso")).not.toBeInTheDocument();
    expect(screen.queryByText(/tu calle/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/plazas limitadas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sigue disponible/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/¿Está libre la plaza de tu oficio\?/i)).not.toBeInTheDocument();
  });

  it("marca el grupo de plazas como ejemplo ilustrativo", () => {
    renderLanding();

    expect(screen.getByText(/Así puede verse un grupo RUANA/i)).toBeInTheDocument();
    expect(screen.getByText(/Ejemplo ilustrativo · no es disponibilidad real/i)).toBeInTheDocument();
    expect(screen.getByText("Plaza ocupada")).toBeInTheDocument();
  });

  it("no abre el modal de memorizar el código", () => {
    renderLanding();

    const cta = screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0];
    cta.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(cta);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("conserva el código de Instagram y los UTM guardados en la sesión", () => {
    window.sessionStorage.setItem(
      LANDING_UTM_STORAGE_KEY,
      JSON.stringify({
        utm_source: "instagram",
        utm_medium: "paid",
        utm_campaign: "alc_d1",
      }),
    );

    renderLanding();

    expect(screen.getAllByRole("link", { name: "Apúntate con tu oficio" })[0]).toHaveAttribute(
      "href",
      "https://ruana-4293f.web.app/register?codigo=ALC-IG&utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1",
    );
  });
});
