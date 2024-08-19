import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


const email = process.env.MAIL_EMAIL
const password = process.env.MAIL_PASSWORD

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password
,  }
} as SMTPTransport.Options)

export const mailOptions =  {
  from: email,
  to: email,
}