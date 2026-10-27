import { PUBLIC_ACCESS_CODE } from "@/lib/inauguralPhase";

export const PASAR_ENCARGO_URL = "https://ruana.app";

export type PasarEncargoDatos = { oficio: string; zona: string; linea: string };

const clean = (value: string) => value.replace(/\s+/g, " ").trim();

/** Quita el punto final para no duplicarlo en el mensaje. */
const withoutFinalStop = (value: string) => value.replace(/[.\s]+$/u, "");

export function pasarEncargoCompleto({ oficio, zona, linea }: PasarEncargoDatos): boolean {
  return Boolean(clean(oficio) && clean(zona) && clean(linea));
}

export function buildPasarEncargoMessage({ oficio, zona, linea }: PasarEncargoDatos): string {
  return (
    `Oye, me ha salido un encargo de ${clean(oficio)} en ${clean(zona)} que no puedo coger: ` +
    `${withoutFinalStop(clean(linea))}. ` +
    `Si te interesa, apúntate en RUANA con el código ${PUBLIC_ACCESS_CODE}, ` +
    `que ahí nos pasamos encargos entre profesionales: ${PASAR_ENCARGO_URL}`
  );
}

export function buildPasarEncargoWhatsAppUrl(datos: PasarEncargoDatos): string {
  return `https://wa.me/?text=${encodeURIComponent(buildPasarEncargoMessage(datos))}`;
}
