import { ServicesFormValues } from './../../components/Pages/services/hooks/useServicesForm';
import { ContactFormValues } from './../../components/Pages/contact/hooks/useContactForm';
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer";

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
      from: email,
      to: process.env.SEND_TO_EMAIL,
      subject: `[AMLSOLUTIONS.cz Kontaktní formulář se službami] Nová zpráva od ${firstName} ${lastName}`,
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
            ${ checked.map((item) => `<li>${item.name}</li>`).join(' ') }
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
  const mail = await sendMail( req.body );

  console.log( 'MAIL', mail )
    
	res.status(200).send( { result: 'Success!' } )
}