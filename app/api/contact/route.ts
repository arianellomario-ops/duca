import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    await resend.emails.send({
      from: "DUCA <onboarding@resend.dev>",
      to: ["marioarianello@gmail.com"], 
      subject: "Nuevo contacto desde DUCA",
      html: `
        <h2>Nuevo mensaje</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `,
    });

    return Response.json({ ok: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error enviando email" }, { status: 500 });
  }
}