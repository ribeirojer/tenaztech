import { PaymentRepository } from "../../../domain/interfaces/PaymentRepository.ts";
import { Payment } from "../../../domain/entities/Payment.ts";
import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { MercadoPagoService } from "../../../infrastructure/services/MercadoPagoService.ts";
import { OrderStatus } from "../../../domain/value-objects/OrderStatus.ts";

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
		await this.paymentRepository.update(payment);

		const order = await this.orderRepository.getById(payment.orderId);
		if (order) {
			order.updateStatus(new OrderStatus("refunded"))
			await this.orderRepository.update(order);
		}
	}
}
