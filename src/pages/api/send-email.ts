export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    console.log('Received request to send email', request);
    const body = await request.json();
    console.log('Request body:', body);
    const { firstName, lastName, email, phone, message } = body;

    console.log('Parsed form data:', {
        firstName,
        lastName,
        email,
        phone,
        message,
    });
    
    const htmlContent = `
            <h2>Nuevo mensaje de: <strong>${firstName} ${lastName}</strong></h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
        `;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'rodrigofunes@hotmail.es',
            subject: 'Nuevo mensaje desde el formulario de contacto',
            html: htmlContent,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
    }
}
