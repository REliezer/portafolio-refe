export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    console.log('Received request to send email', request);
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;
    
    const htmlContent = `
  <div style="font-family: sans-serif; background-color: #f5f5f5; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding: 20px 30px;">
          <h2 style="margin-top: 0; color: #2c3e50;">📬 Nuevo mensaje desde el portafolio</h2>
          <p style="color: #333;"><strong>Nombre:</strong> ${firstName} ${lastName}</p>
          <p style="color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3498db;">${email}</a></p>
          <p style="color: #333;"><strong>Teléfono:</strong> ${phone}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #333;"><strong>Mensaje:</strong></p>
          <p style="color: #555; line-height: 1.6;">${message}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 15px 30px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} Rodrigo Funes — Portafolio Web
        </td>
      </tr>
    </table>
  </div>
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
