import { DeliveryUpdatedEvent } from "../../../domain/events/DeliveryUpdatedEvent.ts";
import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { DeliveryDate } from "../../../domain/value-objects/DeliveryDate.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";

interface UpdateDeliveryDateInput {
	orderId: string;
	newDeliveryDate: Date;
}

export class UpdateDeliveryDateUseCase {
	constructor(private readonly deliveryRepository: DeliveryRepository) {}

	async execute(input: UpdateDeliveryDateInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new Error("Delivery not found");
		}

		const newDeliveryDate = new DeliveryDate(input.newDeliveryDate);
		delivery.updateDate(newDeliveryDate);

		await this.deliveryRepository.update(delivery);
	}
}
