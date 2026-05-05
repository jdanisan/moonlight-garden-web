import { Resend } from "resend";

const resend = new Resend(process.env.VERCEL_OIDC_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, subject, message } = req.body;

    const data = await resend.emails.send({
      from: "MoonLight Garden <onboarding@resend.dev>",
      to: [email],
      subject: subject || "Recordatorio de Cultivo",
      html: `<strong>MoonLight Garden</strong><br/><p>${message}</p>`,
    });
    console.log("BODY:", req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}