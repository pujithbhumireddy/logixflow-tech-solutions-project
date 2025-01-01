const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    const to = req.body.to;

    // Configure the email transport using the default SMTP transport and a GMail account.
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // use environment variable for email
            pass: process.env.EMAIL_PASS  // use environment variable for email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // list of receivers
        subject: 'New Subscription', // Subject line
        text: `New subscription from: ${email}` // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Subscription successful');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
