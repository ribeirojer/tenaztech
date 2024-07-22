// infrastructure/services/AsyncPaymentProcessor.ts
import type { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";
import type { EmailService } from "../../domain/services/EmailService.ts";
import { OrderStatus } from "../../domain/value-objects/OrderStatus.ts";
import type { MercadoPagoService } from "../services/MercadoPagoService.ts";

export class AsyncPaymentProcessor {
	constructor(
		private orderRepository: OrderRepository,
		private paymentService: MercadoPagoService,
		private emailService: EmailService,
	) {}

	async processPendingOrders(): Promise<void> {
		const pendingOrders = await this.orderRepository.findByStatus(
			new OrderStatus("pending"),
		);

		for (const order of pendingOrders) {
			try {
				const paymentResponse = await this.paymentService.processPayment(
					order.getId().getValue(),
					order.getTotalAmount(),
					order.getPaymentData(),
				);

				order.updateStatus(new OrderStatus("completed"));
				await this.orderRepository.update(order);

				await this.emailService.sendOrderCompletedEmail(order);
			} catch (error) {
				order.updateStatus(new OrderStatus("payment_failed"));
				await this.orderRepository.update(order);

				await this.emailService.sendOrderFailedEmail(order, error.message);
			}
		}
	}
}
