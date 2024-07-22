import { DeliveryUpdatedEvent } from "../../../domain/events/DeliveryUpdatedEvent.ts";
import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { DeliveryDate } from "../../../domain/value-objects/DeliveryDate.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";
import { DeliveryNotFoundException } from "../../exceptions/DeliveryNotFoundException.ts";
import type { EventPublisher } from "../../services/EventPublisher.ts";

interface UpdateDeliveryDateInput {
	orderId: string;
	newDeliveryDate: Date;
}

export class UpdateDeliveryDateUseCase {
	constructor(
		private readonly deliveryRepository: DeliveryRepository,
		private readonly eventPublisher: EventPublisher,
	) {}

	async execute(input: UpdateDeliveryDateInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new DeliveryNotFoundException("Delivery not found");
		}

		const newDeliveryDate = new DeliveryDate(input.newDeliveryDate);
		delivery.updateDate(newDeliveryDate);

		await this.deliveryRepository.update(delivery);

		const deliveryUpdatedEvent = new DeliveryUpdatedEvent(
			orderId.toString(),
			newDeliveryDate.getValue(),
		);
		this.eventPublisher.publish(deliveryUpdatedEvent);
	}
}
