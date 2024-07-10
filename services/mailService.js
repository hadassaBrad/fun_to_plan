
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'funtoplan1@gmail.com',
    pass: 'znip ngnb tgom ptoq',

  
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'funtoplan1@gmail.com',
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendMail;
