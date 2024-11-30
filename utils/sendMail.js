require("dotenv").config();

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender(
  process.env.MAILERSEND_DOMAIN,
  "More More Productions"
);

const sendMail = async (body) => {
  const { firstname, lastname, email, subject, message } = body;
  const recipients = [new Recipient(email, `${firstname} ${lastname}`)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml("<i>" + message + "</i>")
    .setText(message);

  const sendMailResult = await mailerSend.email.send(emailParams);

  return sendMailResult;
};

module.exports = sendMail;
