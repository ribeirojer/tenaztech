export class ResendEmailService {
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
