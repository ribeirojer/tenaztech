import type { Order } from "../../domain/entities/Order.ts";
import type { EmailService } from "../../domain/services/EmailService.ts";

export class ResendEmailService implements EmailService {
	sendPasswordResetEmail(arg0: string, resetToken: string): unknown {
		throw new Error("Method not implemented.");
	}
	sendWelcomeEmail(arg0: string, firstName: string): unknown {
		throw new Error("Method not implemented.");
	}
	sendOrderCreatedEmail(order: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	sendOrderCompletedEmail(order: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	sendOrderFailedEmail(order: Order, reason: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	private readonly RESEND_API_KEY = "re_123456789";

	async sendEmail(to: string, subject: string, html: string): Promise<void> {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "Acme <onboarding@resend.dev>",
				to: [to],
				subject,
				html,
			}),
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(`Failed to send email: ${errorData.message}`);
		}
	}
}
