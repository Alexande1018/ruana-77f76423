import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "./Landing";

vi.mock("@/components/NodeField", () => ({
  NodeField: () => null,
}));

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
  );
}

describe("Landing", () => {
  it("usa la propuesta de plazas y el CTA principal único", () => {
    renderLanding();

    expect(
      screen.getByRole("heading", {
        name: /Estamos formando la red de profesionales de tu zona/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/¿Está libre la plaza de tu oficio\?/i)).toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Ver si mi oficio tiene plaza" });
    expect(primary.length).toBeGreaterThan(1);
    expect(primary[0]).toHaveAttribute("href", "/register");

    expect(screen.getAllByText("Ya tengo un código").length).toBeGreaterThan(0);
    expect(screen.queryByText("Solicitar acceso")).not.toBeInTheDocument();
    expect(screen.queryByText(/tu calle/i)).not.toBeInTheDocument();
  });

  it("marca el grupo de plazas como ejemplo ilustrativo", () => {
    renderLanding();

    expect(screen.getByText(/Así puede verse un grupo RUANA/i)).toBeInTheDocument();
    expect(screen.getByText(/Ejemplo ilustrativo · no es disponibilidad real/i)).toBeInTheDocument();
    expect(screen.getByText("Plaza ocupada")).toBeInTheDocument();
  });

  it("abre el flujo de Aliado Fundador al pulsar el CTA principal", () => {
    renderLanding();

    fireEvent.click(screen.getAllByRole("link", { name: "Ver si mi oficio tiene plaza" })[0]);

    expect(
      screen.getByRole("dialog", { name: /Aliados Fundadores/i }),
    ).toBeInTheDocument();
  });
});
