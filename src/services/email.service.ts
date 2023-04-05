import { createTransport, Transporter } from "nodemailer";
import logger from "src/utils/logger";

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
		logger.info(`[EmailService] Sending email ${subject} to ${email}...`);
		await transporter.sendMail(mailOptions)
			.then((_) => logger.info(`[EmailService] Successfully sent email ${subject} to ${email}`))
			.catch((error) => logger.error(`[EmailService] Failed to send email ${subject} to ${email}, with exception ${error.toString()}`));
	}
}