import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "@/pages/Landing";

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
  );
}

describe("Landing RUANA", () => {
  it("explica en el hero para quién es y para qué sirve", () => {
    renderLanding();
    expect(
      screen.getByRole("heading", {
        name: /¿Tienes un negocio u oficio y quieres tener más clientes de tu zona\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("En RUANA, otros profesionales pueden ayudarte a conseguirlos."),
    ).toBeInTheDocument();
  });

  it("cuenta cómo se ayudan los profesionales con un ejemplo cotidiano", () => {
    renderLanding();
    expect(
      screen.getByText(/Imagínate que eres fontanero y conoces a un electricista/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Así funciona RUANA/i)).toBeInTheDocument();
    expect(
      screen.getByText(/se conocen, se ayudan y se pasan oportunidades de trabajo/i),
    ).toBeInTheDocument();
  });

  it("deja clara la diferencia y la idea de confianza", () => {
    renderLanding();
    expect(screen.getByText(/Muchos contactos, poca estructura/i)).toBeInTheDocument();
    expect(screen.getByText(/Muchos profesionales, poca confianza/i)).toBeInTheDocument();
    expect(screen.getByText(/Menos desconocidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Más profesionales de confianza/i)).toBeInTheDocument();
  });

  it("alinea el cobro con el trabajo real, sin cuota por estar", () => {
    renderLanding();
    expect(screen.getByText(/No pagas por estar aquí/i)).toBeInTheDocument();
    expect(screen.getByText(/RUANA gana cuando tú ganas/i)).toBeInTheDocument();
    expect(screen.getByText(/apoyo del 12%/i)).toBeInTheDocument();
  });

  it("mantiene los botones de acceso existentes", () => {
    renderLanding();
    const solicitar = screen.getAllByRole("link", { name: /Solicitar acceso/i });
    expect(solicitar.length).toBeGreaterThan(0);
    expect(solicitar[0]).toHaveAttribute("href", "/register");
    expect(screen.getAllByRole("link", { name: /Ya tengo (un )?código/i }).length).toBeGreaterThan(0);
  });

  it("usa capturas reales de la app como apoyo, no como galería", () => {
    renderLanding();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/landing/07-directorio-red.png");
    expect(images[1]).toHaveAttribute("src", "/landing/08-perfil-aliado.png");
  });

  it("no suena a startup ni explica el interior de la app", () => {
    renderLanding();
    const text = document.body.textContent?.toLowerCase() ?? "";
    const forbidden = [
      "ecosistema",
      "revolucionamos",
      "networking",
      "plataforma líder",
      "transformamos",
      "solución innovadora",
      "inteligencia",
      "nueva generación",
      "todo en uno",
      "siguiente nivel",
      "impulsa tu crecimiento",
      "optimiza tu operación",
      "competencia",
      "algoritmo",
      "el score",
    ];
    for (const word of forbidden) {
      expect(text).not.toContain(word);
    }
  });
});
