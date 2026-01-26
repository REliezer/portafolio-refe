import type { MiddlewareHandler } from 'astro';
import { 
  LANGUAGES, 
  DEFAULT_LANGUAGE, 
  isValidLanguage,
  type Language 
} from '../i18n/utils';

/**
 * Middleware con logging detallado para desarrollo
 */
export const i18nMiddlewareWithLogging: MiddlewareHandler = async (context, next) => {
  const start = Date.now();
  const pathname = context.url.pathname;
  
  if (import.meta.env.DEV) {
    console.log(`🌐 [i18n] Processing: ${pathname}`);
  }
  
  try {
    const response = await i18nMiddleware(context, next);
    
    if (import.meta.env.DEV) {
      const duration = Date.now() - start;
      console.log(`✅ [i18n] Completed: ${pathname} (${duration}ms)`);
    }
    
    return response;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`❌ [i18n] Error processing ${pathname}:`, error);
    }
    throw error;
  }
};