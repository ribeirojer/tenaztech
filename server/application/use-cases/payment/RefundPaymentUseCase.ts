import type { Payment } from "../../../domain/entities/Payment.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import type { PaymentRepository } from "../../../domain/interfaces/PaymentRepository.ts";
import { OrderStatus } from "../../../domain/value-objects/OrderStatus.ts";
import type { MercadoPagoService } from "../../../infrastructure/services/MercadoPagoService.ts";

export class RefundPaymentUseCase {
	constructor(
		private readonly paymentRepository: PaymentRepository,
		private readonly orderRepository: OrderRepository,
		private readonly mercadoPagoService: MercadoPagoService,
	) {}

	async execute(paymentId: string): Promise<void> {
		const payment: Payment = await this.paymentRepository.getById(paymentId);
		if (!payment) {
			throw new Error("Payment not found");
		}

		await this.mercadoPagoService.refundPayment(paymentId);

		payment.status = "refunded";
		await this.paymentRepository.refundPayment(payment.id);

		const order = await this.orderRepository.getById(payment.orderId);
		if (order) {
			order.updateStatus(new OrderStatus("refunded"));
			await this.orderRepository.update(order);
		}
	}
}
