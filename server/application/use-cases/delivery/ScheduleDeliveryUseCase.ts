import { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { Delivery } from "../../../domain/entities/Delivery.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";
import { DeliveryDate } from "../../../domain/value-objects/DeliveryDate.ts";
import { DeliveryScheduledEvent } from "../../../domain/events/DeliveryScheduledEvent.ts";
import { EventPublisher } from "../../services/EventPublisher.ts";
import { InvalidOrderException } from "../../exceptions/InvalidOrderException.ts";

interface ScheduleDeliveryInput {
	orderId: string;
	deliveryDate: Date;
}

export class ScheduleDeliveryUseCase {
	constructor(
		private readonly deliveryRepository: DeliveryRepository,
		private readonly orderRepository: OrderRepository,
		private readonly eventPublisher: EventPublisher,
	) {}

	async execute(input: ScheduleDeliveryInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const order = await this.orderRepository.getById(orderId.toString());

		if (!order) {
			throw new InvalidOrderException("Order does not exist");
		}

		const deliveryDate = new DeliveryDate(input.deliveryDate);
		const delivery = new Delivery(orderId, deliveryDate);

		await this.deliveryRepository.add(delivery);

		const deliveryScheduledEvent = new DeliveryScheduledEvent(
			orderId.toString(),
			deliveryDate.getValue(),
		);
		this.eventPublisher.publish(deliveryScheduledEvent);
	}
}
