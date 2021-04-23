import { ContactFormValues } from './../../components/Pages/contact/hooks/useContactForm';
import { NextApiRequest, NextApiResponse } from "next"
const nodemailer = require("nodemailer");

async function sendMail( { firstName, lastName, message, email, phone }: ContactFormValues ) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
      }
    });
  
    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `[AMLSOLUTIONS.cz Kontaktní formulář] Nová zpráva od ${firstName} ${lastName}`,
      text: message,
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mail = await sendMail( req.body );

  console.log( 'MAIL', mail )
    
	res.status(200).send( { result: 'Success!' } )
}