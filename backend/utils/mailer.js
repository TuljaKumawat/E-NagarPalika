const nodemailer = require('nodemailer');
require('dotenv').config(); // If using .env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,       // your email
        pass: process.env.EMAIL_PASS,       // app password
    },
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;