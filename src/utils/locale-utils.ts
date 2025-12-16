export function getRelativeLocaleUrl(
    pathname: string,
    targetLang: string,
    defaultLang = "es",
    locales: string[] = [defaultLang, "en"]
): string {
    let path = pathname || "/";
    // separate query/hash to preserve them
    const matchRest = path.match(/(\?.*|#.*)$/);
    const rest = matchRest ? matchRest[0] : "";
    const base = rest ? path.slice(0, -rest.length) : path;

    const normLocales = locales.map((l) => l.toLowerCase());
    // Detect leading locale segment (e.g. /en or /en/)
    const m = base.match(/^\/([a-z]{2})(?=\/|$)/i);
    if (m && normLocales.includes(m[1].toLowerCase())) {
        // remove the leading '/{lang}' part reliably
        path = base.replace(new RegExp(`^/${m[1]}`, "i"), "") || "/";
    } else {
        path = base || "/";
    }

    if (!path.startsWith("/")) path = "/" + path;

    // Default language uses no prefix
    if (targetLang === defaultLang) return (path === "/" ? "/" : path) + rest;

    // Other languages are prefixed with /{lang}
    return `/${targetLang}${path === "/" ? "" : path}` + rest;
}