import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv"

dotenv.config()
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

    
    static async sendEmail(): Promise<void> {
        if (!NodeMailer.transporter) {
            NodeMailer.initializeTransporter();
        }
        try {
            // send mail with defined transport object
            const info = await NodeMailer.transporter.sendMail({
                from: "info@mailtrap.com", // sender address
                to: "bus@example.com, baz@example.com", // list of receivers
                subject: "First email test", // Subject line
                text: "testing if the email works", // plain text body
                html: "<button>Click me</button>", // html body
            });

            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log("Error sending email:", error);
        }
    }
}
