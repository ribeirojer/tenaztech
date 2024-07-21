// infrastructure/email-templates/OrderStatusEmailTemplate.ts
export class OrderStatusEmailTemplate {
	static getSubject(): string {
		return "Your Order Status Update";
	}

	static getHtmlContent(orderId: string, status: string): string {
		return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #333;">Order Status Update</h1>
                <p style="color: #555;">Your order with ID ${orderId} is now ${status}.</p>
                <p style="color: #555;">Thank you for shopping with us!</p>
                <p style="color: #555;">Best regards,<br>Acme Team</p>
            </div>
        `;
	}
}
