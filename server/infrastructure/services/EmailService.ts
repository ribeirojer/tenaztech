import type { Order } from "../../domain/entities/Order.ts";
import type { EmailService } from "../../domain/services/EmailService.ts";
import { WelcomeEmailTemplate } from "../email-templates/WelcomeEmailTemplate.ts";
//import { PasswordResetEmailTemplate } from "../email-templates/PasswordResetEmailTemplate.ts";
//import { OrderCreatedEmailTemplate } from "../email-templates/OrderCreatedEmailTemplate.ts";
//import { OrderCompletedEmailTemplate } from "../email-templates/OrderCompletedEmailTemplate.ts";
//import { OrderFailedEmailTemplate } from "../email-templates/OrderFailedEmailTemplate.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env = await load();

export class ResendEmailService implements EmailService {
	DeliveryDelayEmail(order: Order) {
		throw new Error("Method not implemented.");
	}
	private readonly RESEND_API_KEY: string;
	private readonly SENDER_EMAIL = "Acme <onboarding@resend.dev>";

	constructor() {
		this.RESEND_API_KEY = env.RESEND_API_KEY || Deno.env.get("RESEND_API_KEY") || "";
		if (!this.RESEND_API_KEY) {
			throw new Error(
				"RESEND_API_KEY is not defined in the environment variables.",
			);
		}
	}
	sendPasswordResetEmail(arg0: string, resetToken: string): unknown {
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

	async sendWelcomeEmail(email: string, name: string): Promise<void> {
		const subject = WelcomeEmailTemplate.getSubject();
		const html = WelcomeEmailTemplate.getHtmlContent(name);
		await this.sendEmail(email, subject, html);
	}
	/**
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const subject = PasswordResetEmailTemplate.getSubject();
    const html = PasswordResetEmailTemplate.getHtmlContent(resetToken);
    await this.sendEmail(email, subject, html);
  }

  async sendOrderCreatedEmail(order: Order): Promise<void> {
    const subject = OrderCreatedEmailTemplate.getSubject(order);
    const html = OrderCreatedEmailTemplate.getHtmlContent(order);
    await this.sendEmail(order.customerEmail, subject, html);
  }

  async sendOrderCompletedEmail(order: Order): Promise<void> {
    const subject = OrderCompletedEmailTemplate.getSubject(order);
    const html = OrderCompletedEmailTemplate.getHtmlContent(order);
    await this.sendEmail(order.customerEmail, subject, html);
  }

  async sendOrderFailedEmail(order: Order, reason: string): Promise<void> {
    const subject = OrderFailedEmailTemplate.getSubject(order);
    const html = OrderFailedEmailTemplate.getHtmlContent(order, reason);
    await this.sendEmail(order.customerEmail, subject, html);
  }
 */
	private async sendEmail(
		to: string,
		subject: string,
		html: string,
	): Promise<void> {
		try {
			const res = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.RESEND_API_KEY}`,
				},
				body: JSON.stringify({
					from: this.SENDER_EMAIL,
					to: [to],
					subject,
					html,
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				console.error(`Failed to send email: ${errorData.message}`);
				throw new Error(`Failed to send email: ${errorData.message}`);
			}

			const data = await res.json();
			console.log(`Email sent successfully: ${JSON.stringify(data)}`);
		} catch (error) {
			console.error(`Error sending email: ${error.message}`);
			throw error;
		}
	}
}
