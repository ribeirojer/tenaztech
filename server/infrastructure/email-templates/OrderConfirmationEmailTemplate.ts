// infrastructure/email-templates/OrderConfirmationEmailTemplate.ts
export class OrderConfirmationEmailTemplate {
    static getSubject(): string {
        return "Your Order Confirmation";
    }

    static getHtmlContent(orderId: string, totalAmount: number): string {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #333;">Order Confirmation</h1>
                <p style="color: #555;">Thank you for your order!</p>
                <p style="color: #555;">Order ID: ${orderId}</p>
                <p style="color: #555;">Total Amount: $${totalAmount.toFixed(2)}</p>
                <p style="color: #555;">We will notify you once your order is shipped.</p>
                <p style="color: #555;">Best regards,<br>Acme Team</p>
            </div>
        `;
    }
}
