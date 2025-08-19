import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',   // ✅ hard-coded for now
        to: 'sovereigntyequestrian@gmail.com',     // change this to your own email
        subject: `New message from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
