const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'funtoplan100@gmail.com',
    pass: 'RHfuntoplan100@'
     //כתובת המייל הזאת עשיין לא קימת כי לא הצלחתי לתפתוח בלי SMS
     //אחרי שפותחים אותה צריך להגידר אימות דו שלבי, יתר הפרטים בGPT
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'funtoplan100@gmail.com',
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
