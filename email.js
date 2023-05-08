const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

function sendEmail(email, username, password) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Welcome to the Money Transfer Portal!',
    html: `<p>Dear ${username},</p>
          <p>Thank you for registering with our portal. Your account has been successfully created with the following login details:</p>
          <p>Username: ${username}</p>
          <p>Password: ${password}</p>
          <p>You can now log in to our portal and start transferring money. We hope you have a great experience!</p>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;
