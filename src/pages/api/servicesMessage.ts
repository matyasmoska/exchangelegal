import { ServicesFormValues, ServicesFormValuesResponse } from './../../components/Pages/services/hooks/useServicesForm';
import { ContactFormValues } from './../../components/Pages/contact/hooks/useContactForm';
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

async function sendMail( { firstName, lastName, message, email, phone, checked, ico, businessAddress }: ServicesFormValues ) {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 465,
      secure: true,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
      }
    });
  
    await transporter.sendMail({
      from: process.env.SEND_FROM_EMAIL,
      to: process.env.SEND_TO_EMAIL,
      subject: `[15zisif.cz Kontaktní formulář se službami] Nová zpráva od ${firstName} ${lastName}`,
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
  const formValues: ServicesFormValues = req.body

  const mail = await sendMail(formValues)

  const responseValues: ServicesFormValuesResponse = {
    ...formValues,
    result: 'Success!',
    transactionId: uuidv4(),
    totalValue: formValues.checked.reduce((sum, { price }) => sum + price, 0),
    hashedEmail: createHash('sha256').update(formValues.email).digest('hex'),
    hashedPhone: createHash('sha256').update(formValues.phone).digest('hex')
  }

  console.log('MAIL: ', mail, responseValues)

  res.status(200).send(responseValues)
}
