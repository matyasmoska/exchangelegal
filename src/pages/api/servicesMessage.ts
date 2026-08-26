import { ServicesFormValues, ServicesFormValuesResponse } from './../../components/Pages/services/hooks/useServicesForm';
import { ContactFormValues } from './../../components/Pages/contact/hooks/useContactForm';
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

async function sendMail( { firstName, lastName, message, email, phone, checked, ico, businessAddress }: ServicesFormValues ) {
    const from = (process.env.SEND_FROM_EMAIL || process.env.SMTP_USER || '').trim()
    const to = (process.env.SEND_TO_EMAIL || process.env.SMTP_USER || '').trim()

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
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
      subject: `[pravoprosmenarny.cz Kontaktní formulář se službami] Nová zpráva od ${firstName} ${lastName}`,
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
          <h3>Vybrané služby:</h3>
          <ul>
            ${checked.map((item) => `<li>${typeof item.name === "string" ? item.name : item.name?.cs}</li>`).join(' ')}
          </ul>
          <h3>Zpráva:</h3>
          <p>
            ${message}
          </p>
        </div>
      `
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.SMTP_SERVER || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('SMTP is not configured - the order could not be sent')
    return res.status(500).send({ error: { code: 'smtp_not_configured' } })
  }

  const formValues: ServicesFormValues = req.body

  try {
    await sendMail(formValues)
  } catch (error) {
    console.error('Services form could not be sent', error)
    return res.status(500).send({ error: { code: 'send_failed' } })
  }

  // no personal data here - the conversion is measured anonymously
  const responseValues: ServicesFormValuesResponse = {
    ...formValues,
    result: 'Success!',
    transactionId: uuidv4(),
    totalValue: formValues.checked.reduce((sum, { price }) => sum + price, 0)
  }

  return res.status(200).send(responseValues)
}
