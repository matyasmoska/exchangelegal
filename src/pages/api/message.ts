import { ContactFormValues } from './../../components/Pages/contact/hooks/useContactForm';
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer";

async function sendMail( { firstName, lastName, message, email, phone, ico, businessAddress }: ContactFormValues ) {
    const port = Number(process.env.SMTP_PORT || 465)

    const from = (process.env.SEND_FROM_EMAIL || process.env.SMTP_USER || '').trim()
    const to = (process.env.SEND_TO_EMAIL || process.env.SMTP_USER || '').trim()

    // temporary diagnostics: shows exactly what is handed to the SMTP server (no password)
    console.log('SMTP config', JSON.stringify({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT || '465 (default)',
      user: process.env.SMTP_USER,
      from,
      to,
      fromLength: from.length,
    }))

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port,
      // port 587 uses STARTTLS, 465 an implicit TLS connection
      secure: port === 465,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
      }
    });
  
    await transporter.sendMail({
      // the sender must belong to the authenticated mailbox, otherwise the server
      // rejects the MAIL FROM command with "550 invalid domain"
      from,
      to,
      // replies go straight to the person who filled in the form
      replyTo: email,
      subject: `[pravoprosmenarny.cz Kontaktní formulář] Nová zpráva od ${firstName} ${lastName}`,
      html:
      `
        <div>
          <div>
            <h3>Informace o uživateli:</h3>
            <ul>
              <li>Jméno: <b>${firstName} ${lastName}</b></li>
              <li>Email: <b>${email}</b></li>
              <li>Telefonní číslo: <b>${phone}</b></li>
              <li>IČO: <b>${ico || '-'}</b></li>
              <li>Adresa: <b>${businessAddress || '-'}</b></li>
            </ul>
          </div>
          <h3>Zpráva:</h3>
          <p>
            ${message}
          </p>
        </div>
      `,
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.SMTP_SERVER || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('SMTP is not configured - the enquiry could not be sent')
    return res.status(500).send({ error: { code: 'smtp_not_configured' } })
  }

  try {
    // the form must never report success when the message did not actually go out
    await sendMail(req.body)
    return res.status(200).send({ result: 'Success!' })
  } catch (error) {
    console.error('Contact form could not be sent', error)
    return res.status(500).send({ error: { code: 'send_failed' } })
  }
}
