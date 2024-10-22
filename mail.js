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

async function sendEmail() {
    try {
      let info = await transporter.sendMail({
        from: '"With Arco" <no-reply@withar.co>',
        to: "achillerondo@gmail.com",
        subject: "Test Email from Node.js",
        text: "This is a test email sent from Node.js using Nodemailer",
        html: "<b>This is a test email sent from Node.js using Nodemailer</b>"
      });
  
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  
  sendEmail();