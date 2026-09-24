import { describe, expect, it } from "vitest";
import {
  buildInviteUrl,
  buildRegisterUrl,
  LANDING_UTM_STORAGE_KEY,
  persistLandingUtms,
} from "./registerUrl";

function memoryStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(LANDING_UTM_STORAGE_KEY, initial);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    dump: () => data.get(LANDING_UTM_STORAGE_KEY) ?? null,
  };
}

const IG =
  "https://ruana-4293f.web.app/register?codigo=ALC-IG&utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1";

describe("buildRegisterUrl", () => {
  it("manda a ALC-IG y reenvía los UTM cuando la visita viene de Instagram", () => {
    expect(
      buildRegisterUrl("?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1", null),
    ).toBe(IG);
  });

  it("trata utm_source=instagram sin distinguir mayúsculas", () => {
    expect(buildRegisterUrl("?utm_source=Instagram", null)).toBe(
      "https://ruana-4293f.web.app/register?codigo=ALC-IG&utm_source=Instagram",
    );
    expect(buildRegisterUrl("?utm_source=INSTAGRAM", null)).toContain("codigo=ALC-IG");
  });

  it("usa FUNDADOR en una visita sin UTM", () => {
    expect(buildRegisterUrl("", null)).toBe(
      "https://ruana-4293f.web.app/register?codigo=FUNDADOR",
    );
  });

  it("añade utm_content y utm_term solo si vienen en la URL", () => {
    const href = buildRegisterUrl(
      "?utm_source=instagram&utm_content=story&utm_term=fontanero",
      null,
    );
    expect(href).toContain("utm_content=story");
    expect(href).toContain("utm_term=fontanero");
    expect(buildRegisterUrl("?utm_medium=paid", null)).not.toContain("utm_content");
    expect(buildRegisterUrl("?utm_medium=paid", null)).not.toContain("utm_term");
  });

  it("recupera los UTM guardados cuando la URL ya no los lleva", () => {
    const stored = JSON.stringify({
      utm_source: "instagram",
      utm_medium: "paid",
      utm_campaign: "alc_d1",
    });
    expect(buildRegisterUrl("", stored)).toBe(IG);
  });

  it("guarda los UTM de la primera llegada y no los pisa después", () => {
    const storage = memoryStorage();
    persistLandingUtms("?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1", storage);
    persistLandingUtms("?utm_source=newsletter", storage);
    expect(storage.dump()).toBe(
      JSON.stringify({
        utm_source: "instagram",
        utm_medium: "paid",
        utm_campaign: "alc_d1",
      }),
    );
    expect(buildRegisterUrl("", storage.dump())).toBe(IG);
  });

  it("no guarda nada si la primera llegada no trae UTM", () => {
    const storage = memoryStorage();
    persistLandingUtms("", storage);
    expect(storage.dump()).toBeNull();
  });
});

describe("buildInviteUrl", () => {
  it("abre invite.html y reenvía los UTM guardados, sin código", () => {
    expect(
      buildInviteUrl("?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1", null),
    ).toBe(
      "https://ruana-4293f.web.app/invite.html?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1",
    );
  });

  it("en una visita sin UTM no añade query", () => {
    expect(buildInviteUrl("", null)).toBe("https://ruana-4293f.web.app/invite.html");
  });

  it("recupera los UTM de la sesión cuando la URL ya no los lleva", () => {
    const stored = JSON.stringify({
      utm_source: "instagram",
      utm_medium: "paid",
      utm_campaign: "alc_d1",
    });
    expect(buildInviteUrl("", stored)).toBe(
      "https://ruana-4293f.web.app/invite.html?utm_source=instagram&utm_medium=paid&utm_campaign=alc_d1",
    );
    expect(buildInviteUrl("", stored)).not.toContain("codigo=");
  });
});
