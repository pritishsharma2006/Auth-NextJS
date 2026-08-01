import nodemailer from 'nodemailer';
import User from "@/model/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email, emailType, userId}:any)=>{
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken,verifyTokenExpiry: Date.now() + 3600000},{new: true, runValidator: true})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken,forgetPasswordTokenExpiry: Date.now() + 3600000},{new: true, runValidator: true})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            }
        });

        const mailOptions = {
            from: 'pritish@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email": "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse; 




    } catch (error : any) {
        console.error("MAILER ERROR: ",error);
        throw new Error(error.message)
    }
}