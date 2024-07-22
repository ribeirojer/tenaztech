import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";
import type { EmailService } from "../../../infrastructure/services/EmailService.ts";
import { DeliveryNotFoundException } from "../../exceptions/DeliveryNotFoundException.ts";

interface NotifyDeliveryDelayInput {
	orderId: string;
	delayReason: string;
}

export class NotifyDeliveryDelayUseCase {
	constructor(
		private readonly deliveryRepository: DeliveryRepository,
		private readonly orderRepository: OrderRepository,
		private readonly emailService: EmailService,
	) {}

	async execute(input: NotifyDeliveryDelayInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new DeliveryNotFoundException("Delivery not found");
		}

		const order = await this.orderRepository.getById(orderId.toString());

		if (!order) {
			throw new Error("Order not found");
		}

		const email = order.getOrderDetails().customerId.toString();
		const message = `Dear Customer, your delivery scheduled for ${delivery.date.getValue()} has been delayed. Reason: ${input.delayReason}`;

		await this.emailService.sendEmail(
			email,
			"Delivery Delay Notification",
			message,
		);
	}
}
