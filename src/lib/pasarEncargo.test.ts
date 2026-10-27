import { describe, it, expect } from "vitest";
import {
  buildPasarEncargoMessage,
  buildPasarEncargoWhatsAppUrl,
  pasarEncargoCompleto,
} from "./pasarEncargo";

const datos = { oficio: "fontanero", zona: "Chamberí", linea: "cambiar un grifo y revisar una fuga." };

describe("pasar encargo", () => {
  it("escribe el mensaje con el código ALC-IG y el enlace", () => {
    expect(buildPasarEncargoMessage(datos)).toBe(
      "Oye, me ha salido un encargo de fontanero en Chamberí que no puedo coger: cambiar un grifo y revisar una fuga. " +
        "Si te interesa, apúntate en RUANA con el código ALC-IG, que ahí nos pasamos encargos entre profesionales: https://ruana.app",
    );
  });

  it("no usa «gratis» ni «curro»", () => {
    expect(buildPasarEncargoMessage(datos)).not.toMatch(/gratis|curro/i);
  });

  it("abre wa.me con el texto codificado", () => {
    const url = buildPasarEncargoWhatsAppUrl(datos);
    expect(url.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(url.slice("https://wa.me/?text=".length))).toBe(buildPasarEncargoMessage(datos));
  });

  it("pide los tres campos", () => {
    expect(pasarEncargoCompleto(datos)).toBe(true);
    expect(pasarEncargoCompleto({ ...datos, zona: "  " })).toBe(false);
  });
});
