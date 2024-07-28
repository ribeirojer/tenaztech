import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";
import type { ResendEmailService } from "../../../infrastructure/services/EmailService.ts";

interface NotifyDeliveryDelayInput {
	orderId: string;
	delayReason: string;
}

export class NotifyDeliveryDelayUseCase {
	constructor(
		private readonly deliveryRepository: DeliveryRepository,
		private readonly orderRepository: OrderRepository,
		private readonly emailService: ResendEmailService,
	) {}

	async execute(input: NotifyDeliveryDelayInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new Error("Delivery not found");
		}

		const order = await this.orderRepository.getById(orderId.toString());

		if (!order) {
			throw new Error("Order not found");
		}

		//const email = order.getOrderDetails().customerId.toString();
		//const message = `Dear Customer, your delivery scheduled for ${delivery.date.getValue()} has been delayed. Reason: ${input.delayReason}`;

		await this.emailService.DeliveryDelayEmail(order);
	}
}
