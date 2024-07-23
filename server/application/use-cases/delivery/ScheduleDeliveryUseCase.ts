import { Delivery } from "../../../domain/entities/Delivery.ts";
import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { DeliveryDate } from "../../../domain/value-objects/DeliveryDate.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";

interface ScheduleDeliveryInput {
	orderId: string;
	deliveryDate: Date;
}

export class ScheduleDeliveryUseCase {
	constructor(
		private readonly deliveryRepository: DeliveryRepository,
		private readonly orderRepository: OrderRepository,
	) {}

	async execute(input: ScheduleDeliveryInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const order = await this.orderRepository.getById(orderId.toString());

		if (!order) {
			throw new Error("Order does not exist");
		}

		const deliveryDate = new DeliveryDate(input.deliveryDate);
		const delivery = new Delivery(orderId, deliveryDate);

		await this.deliveryRepository.add(delivery);
	}
}
