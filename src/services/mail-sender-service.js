import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "phuicmt@gmail.com",
    pass: "UndaMan1",
  },
});

export function MailSender(to, subject, body) {
  let mailOptions = {
    from: "phuicmt@gmail.com",
    to: "icmtchannel@gmail.com",
    subject: "Test MailSender",
    html: "<b>Do you receive this mail?</b>",
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

export default MailSender;
