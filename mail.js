import { createTransport } from 'nodemailer';
import fs from 'fs';


const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
const transporter = createTransport({
  host: 'mail.spacemail.com',
  port: 465,
  secure: true,
  auth: {
    user: keys["email"],
    pass: keys["emailPassword"]
  }
});

async function sendConfirmationEmail(mail, link) {

  try {
    let info = await transporter.sendMail({
      from: '"With Arco" <no-reply@withar.co>',
      to: mail,
      subject: "Confirm your email address on withar.co",
      html:
        `<div style="display: block;">
        <p>Please click on the link to activate your withar.co account</p> 
        <a href="${link}">Activate my account</a> 
        </div>`
    });
    console.log(`Message sent to ${mail}`);
    return true

  } catch (error) {

    console.error("Error sending email:", error); return false

  }
}

export { sendConfirmationEmail }