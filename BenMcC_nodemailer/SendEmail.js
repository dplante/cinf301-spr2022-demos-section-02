const nodemailer = require("nodemailer");

//create a transport object that we will use to send mail
const transporter = nodemailer.createTransport({
  service: "hotmail", //hotmail because way back when outlook was hotmail
  auth: {
    user: "cinf301node@outlook.com",
    pass: "N0d3JSiscool!" //obviously, you never ever want to hardcode a password so don't do this
  }
});

//create an email, this would be something that you change in your fancy UI
const email = {
  from: "cinf301node@outlook.com",
  to: "bmccardle@stetson.edu",
  subject: "Hey! This is a Demo!",
  text: "haha yes",

  attachments: [
    {
      filename: 'yes.jpeg',
      path: './yes.jpeg'
    }
  ]
};

//now use the transporter to send the email, catch any errors that would happen (if there were issues authenticating, etc)
transporter.sendMail(email, function(err, info){
  if(err){
    console.log("Some sort of error happened :((((" + err);
    return;
  }
  console.log("Sent: " + info.response);
})






//---------------------------------------------------------- Other, more complex demo that wasn't working

// import nodemailer from nodemailer

// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// export default SendEmail;

// main().catch(console.error);