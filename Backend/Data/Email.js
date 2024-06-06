const nodemailer = require("nodemailer");

const tran =
    nodemailer.createTransport({
        host : "smtp.gmail.com",
        port: 587,
        secure: false,
        auth : {
            user : "smartgardener123@gmail.com",
            pass : "hzwu wmfz jptq schy",
        }
    });


async function send_mail(email,subject,text)
{
    const opt =
        {
            from : '"SmartGardener" <smartgardener123@gmail.com>',
            to : email,
            subject : subject,
            text : text
        };

    await tran.sendMail(opt, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.send_mail = send_mail