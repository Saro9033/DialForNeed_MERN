const nodemailer = require('nodemailer')
require('dotenv').config();

const sendEmail = async (options) => {
  console.log(process.env.SMTP_USER);

  // const transporter = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "0f07abddc01d44",
  //     pass: "2b07dcb0f3d09a"
  //   }
  // });

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'noreply.dialforneed@gmail.com', // Your Gmail address
      pass: process.env.APP_PASS // Your Gmail password or app password
    }
  })

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  }
  await transporter.sendMail(message)
}

module.exports = sendEmail