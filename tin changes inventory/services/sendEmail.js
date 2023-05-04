const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    // create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        // port is 587 according to documentation
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // solves emails not sending sometimes
        tls: {
            rejectUnauthorized: false
        }
    })

    // options for sending emails
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    // send the email
    // err contains info about error sending, info contains info about success
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail