// api/contact.js (Resend v4 response handling)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Safely read raw JSON body (works even if req.body is empty)
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const { name, email, message } = JSON.parse(raw || "{}");

    if (!name || !email || !message) {
      console.log("Missing fields", { name, email, message });
      return res.status(400).json({ error: "Missing fields" });
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM ||
        "Sovereignty Equestrian <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "sovereigntyequestrian@gmail.com"],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Email failed to send" });
    }

    console.log("Resend id:", data?.id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
