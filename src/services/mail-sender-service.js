let nodemailer = require("nodemailer");
let { ipcMain } = require("electron");

export function MailSender(to, subject, body) {
  ipcMain.on("sendMail", (event, args) => {
    console.log("ipcMain: Executing SendIt");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "phq.9.thesis@gmail.com",
        pass: "4847_5523",
      },
    });

    let mailOptions = {
      from: "phq.9.thesis@gmail.com",
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
  });
}

export default MailSender;
