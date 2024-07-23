import { DeliveryConfirmedEvent } from "../../../domain/events/DeliveryConfirmedEvent.ts";
import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";

interface ConfirmDeliveryInput {
	orderId: string;
}

export class ConfirmDeliveryUseCase {
	constructor(private readonly deliveryRepository: DeliveryRepository) {}

	async execute(input: ConfirmDeliveryInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new Error("Delivery not found");
		}

		delivery.confirm();

		await this.deliveryRepository.update(delivery);

		const deliveryConfirmedEvent = new DeliveryConfirmedEvent(
			orderId.toString(),
			delivery.date.getValue(),
		);
	}
}
