import type { Order } from "../../domain/entities/Order.ts";
import type { EmailService } from "../../domain/services/EmailService.ts";

export class SMTPService implements EmailService {
	async sendOrderCreatedEmail(order: Order): Promise<void> {
		// Lógica para enviar email de pedido criado
		console.log(
			`Email sent to ${order.getOrderDetails().customerId}: Order created.`,
		);
	}

	async sendOrderCompletedEmail(order: Order): Promise<void> {
		// Lógica para enviar email de pedido concluído
		console.log(
			`Email sent to ${order.getOrderDetails().customerId}: Order completed.`,
		);
	}

	async sendOrderFailedEmail(order: Order, reason: string): Promise<void> {
		// Lógica para enviar email de falha no pagamento do pedido
		console.log(
			`Email sent to ${order.getOrderDetails().customerId}: Payment failed. Reason: ${reason}`,
		);
	}
}
