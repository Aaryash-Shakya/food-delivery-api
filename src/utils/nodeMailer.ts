import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv"

dotenv.config()

interface Email {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export class NodeMailer {
    private static transporter: nodemailer.Transporter;

    private static initializeTransporter() {
        console.log(process.env.NODEMAILER_USER);

        NodeMailer.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
    }
    
    static async sendEmail(email:Email): Promise<void> {
        if (!NodeMailer.transporter) {
            NodeMailer.initializeTransporter();
        }
        try {
            // send mail with defined transport object
            const info = await NodeMailer.transporter.sendMail({
                from: email.from, // sender address
                to: email.to, // list of receivers
                subject: email.subject, // Subject line
                text: email.text, // plain text body
                html: email.html, // html body
            });

            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log("Error sending email:", error);
        }
    }
}
