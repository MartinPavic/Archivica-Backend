import { createTransport, Transporter } from "nodemailer";

export default class EmailService {

	public static async sendEmail(email: string, subject: string, content: string): Promise<any> {
		const transporter: Transporter = createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.GMAIL_PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			text: content,
		};

		return await transporter.sendMail(mailOptions);
	}
}