// api/contact.js (ESM)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Parse JSON body safely (works even if req.body is empty)
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const { name, email, message } = JSON.parse(raw || "{}");

    if (!name || !email || !message) {
      console.log("Missing fields", { name, email, message });
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await resend.emails.send({
      from:
        process.env.CONTACT_FROM ||
        "Sovereignty Equestrian <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "sovereigntyequestrian@gmail.com"],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    console.log("Resend send() OK. id:", result?.id || result);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Email failed" });
  }
}
