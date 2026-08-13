export const DEFAULT_LANGUAGE = "es";
export const LANGUAGES = [DEFAULT_LANGUAGE, "en"];

export function languageFromPath(path = "/") {
  return path === "/en" || path.startsWith("/en/") ? "en" : DEFAULT_LANGUAGE;
}

export function stripLanguagePrefix(path = "/") {
  if (path === "/en") return "/";
  return path.startsWith("/en/") ? path.slice(3) || "/" : path;
}

export function localizedPath(path, language) {
  const [pathname, suffix = ""] = path.split(/(?=[?#])/u, 2);
  const unprefixedPath = stripLanguagePrefix(pathname || "/");

  if (language === "en") {
    return `${unprefixedPath === "/" ? "/en" : `/en${unprefixedPath}`}${suffix}`;
  }

  return `${unprefixedPath}${suffix}`;
}

export function withBasePath(path) {
  if (!path?.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
