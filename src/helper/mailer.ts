import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000, // 1 hour
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        const url =
            emailType === "VERIFY"
                ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

        const mailOptions = {
            from: "pritish@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password",
            html: `
                <p>
                    Click <a href="${url}">here</a> to ${
                        emailType === "VERIFY"
                            ? "verify your email"
                            : "reset your password"
                    }.
                </p>

                <p>
                    Or copy and paste this link into your browser:
                </p>

                <p>${url}</p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("MAILER ERROR:", error);
        throw new Error(error.message);
    }
};