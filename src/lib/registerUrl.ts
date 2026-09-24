import { useEffect, useState } from "react";

/** App de aliados (Firebase). El login vive en la raíz; /login responde 404. */
export const APP_ORIGIN = "https://ruana-4293f.web.app";
export const APP_LOGIN_URL = `${APP_ORIGIN}/`;
export const REGISTER_PATH = "/register";
/** Pantalla que pide el código y, si vale, sigue al registro. */
export const INVITE_PATH = "/invite.html";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const LANDING_UTM_STORAGE_KEY = "ruana_landing_utms";

const INSTAGRAM_CODE = "ALC-IG";
const DEFAULT_CODE = "FUNDADOR";

export function readUtmsFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search.startsWith("?") || search === "" ? search : `?${search}`);
  const utms: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) utms[key] = value;
  }
  return utms;
}

export function parseStoredUtms(storedJson: string | null): UtmParams {
  if (!storedJson) return {};
  try {
    const parsed: unknown = JSON.parse(storedJson);
    if (!parsed || typeof parsed !== "object") return {};
    const utms: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value.trim()) utms[key] = value.trim();
    }
    return utms;
  } catch {
    return {};
  }
}

/** URL params overlay the first-landing set. An empty visit falls back to storage. */
export function resolveUtms(search: string, storedJson: string | null): UtmParams {
  return { ...parseStoredUtms(storedJson), ...readUtmsFromSearch(search) };
}

type UtmStorage = Pick<Storage, "getItem" | "setItem">;

/** Saves UTMs from the first landing that has any. Later navigations do not overwrite them. */
export function persistLandingUtms(search: string, storage: UtmStorage): void {
  if (storage.getItem(LANDING_UTM_STORAGE_KEY)) return;
  const fromUrl = readUtmsFromSearch(search);
  if (Object.keys(fromUrl).length === 0) return;
  storage.setItem(LANDING_UTM_STORAGE_KEY, JSON.stringify(fromUrl));
}

export function codigoForUtms(utms: UtmParams): string {
  return utms.utm_source?.toLowerCase() === "instagram" ? INSTAGRAM_CODE : DEFAULT_CODE;
}

function appendUtms(params: URLSearchParams, utms: UtmParams): void {
  for (const key of UTM_KEYS) {
    const value = utms[key];
    if (value) params.set(key, value);
  }
}

export function buildRegisterUrl(search: string, storedJson: string | null): string {
  const utms = resolveUtms(search, storedJson);
  const params = new URLSearchParams();
  params.set("codigo", codigoForUtms(utms));
  appendUtms(params, utms);
  return `${APP_ORIGIN}${REGISTER_PATH}?${params.toString()}`;
}

/** Invite page. Forwards stored UTM params only; the person types their own code. */
export function buildInviteUrl(search: string, storedJson: string | null): string {
  const params = new URLSearchParams();
  appendUtms(params, resolveUtms(search, storedJson));
  const query = params.toString();
  return query ? `${APP_ORIGIN}${INVITE_PATH}?${query}` : `${APP_ORIGIN}${INVITE_PATH}`;
}

function useResolvedUtms(): { search: string; stored: string | null } {
  const search = typeof window === "undefined" ? "" : window.location.search;
  const [stored, setStored] = useState<string | null>(() =>
    typeof window === "undefined" ? null : window.sessionStorage.getItem(LANDING_UTM_STORAGE_KEY),
  );

  useEffect(() => {
    persistLandingUtms(window.location.search, window.sessionStorage);
    setStored(window.sessionStorage.getItem(LANDING_UTM_STORAGE_KEY));
  }, []);

  return { search, stored };
}

export function useRegisterUrl(): string {
  const { search, stored } = useResolvedUtms();
  return buildRegisterUrl(search, stored);
}

export function useInviteUrl(): string {
  const { search, stored } = useResolvedUtms();
  return buildInviteUrl(search, stored);
}
