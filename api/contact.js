import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        // ✅ send from your verified domain on Resend
        from: 'Sovereignty Equestrian <no-reply@sovereigntyequestrian.com>',
        // ✅ send to your company inbox
        to: 'sovereigntyequestrian@gmail.com',
        subject: `New message from ${name}`,
        // ✅ so “Reply” goes to the person who filled out the form
        reply_to: email,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Resend send() error:', error);
      res.status(500).json({ success: false, error: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
