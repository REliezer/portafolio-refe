import type { Language } from "@/i18n/utils";

export const CONTACT_FORM_LABELS: Record<Language, Record<string, string>> = {
  es: {
    "firstName": "Nombre",
    "lastName": "Apellidos",
    "email": "Correo Electrónico",
    "phone": "Teléfono",
    "message": "Mensaje",
    "send": "Enviar Mensaje",
    "sending": "Enviando...",
    "success": "¡Mensaje enviado!. Tu mensaje ha sido enviado correctamente. Te responderé pronto.",
    "error": "Error al enviar. Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo."
  },
  en: {
    "firstName": "First Name",
    "lastName": "Last Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "send": "Send Message",
    "sending": "Sending...",
    "success": "Message sent! Your message has been sent successfully. I will get back to you soon.",
    "error": "Error sending. There was a problem sending your message. Please try again."
  },
};
