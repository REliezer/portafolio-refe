import { defineMiddleware } from 'astro:middleware';
import { 
  LANGUAGES, 
  DEFAULT_LANGUAGE, 
  getPreferredLanguage, 
  isValidLanguage,
  type Language 
} from './i18n/utils';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  // Do not interfere with API routes or static assets
  if (pathname.startsWith('/api') || pathname.startsWith('/_astro') || pathname.startsWith('/favicon') ) {
    return next();
  }

  // Map '/es' prefixed routes to root (default language) so '/es/...' serves same content as '/...'
  if (pathname === '/es' || pathname === '/es/') {
    return context.redirect('/', 302);
  }
  if (pathname.startsWith('/es/')) {
    const without = pathname.replace(/^\/es/, '') || '/';
    return context.redirect(without, 302);
  }
  
  // Extraer el código de idioma de la URL
  const segments = pathname.split('/').filter(Boolean);
  const maybeLanguage = segments[0];
  
  // Si ya hay un idioma válido en la URL, continuar
  if (maybeLanguage && isValidLanguage(maybeLanguage)) {
    return next();
  }
  
  // Si estamos en la raíz, redirigir según preferencias del usuario
  if (pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language');
    const preferredLang = getPreferredLanguage(acceptLanguage || '');
    
    // Si el idioma preferido no es el por defecto, redirigir
    if (preferredLang !== DEFAULT_LANGUAGE) {
      return context.redirect(`/${preferredLang}/`, 302);
    }
    
    // Continuar con el idioma por defecto
    return next();
  }
  
  // Si la URL no tiene idioma pero no es la raíz, verificar si existe la página
  // en el idioma por defecto
  const response = await next();
  
  // Si la página no existe (404), intentar con el idioma por defecto
  if (response.status === 404) {
    const acceptLanguage = context.request.headers.get('accept-language');
    const preferredLang = getPreferredLanguage(acceptLanguage || '');
    
    if (preferredLang !== DEFAULT_LANGUAGE) {
      // Redirigir a la versión localizada
      return context.redirect(`/${preferredLang}${pathname}`, 302);
    }
  }
  
  return response;
});