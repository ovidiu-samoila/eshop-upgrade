
var nodemailer = require("nodemailer");
var config = require("../../configMail");



// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: config.email.login
});


module.exports = function (toEmail, toName, Order) {

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.email.from.name + " <" + config.email.from.email + ">", // sender address
        to: toName + " <" + toEmail + ">", // list of receivers
        subject: "New order", // Subject line
        html: "<b>Hello "+ toName +"</b> your order was placed at " + Order.date // html body
    };

    return new Promise(function (resolve, reject) {
        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                reject(error);
            }else{
                console.log("Message sent: " + response.message);
                resolve(response);
            }
        });
    })

};
