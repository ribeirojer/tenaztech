import { DeliveryCancelledEvent } from "../../../domain/events/DeliveryCancelledEvent.ts";
import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";

interface CancelDeliveryInput {
	orderId: string;
}

export class CancelDeliveryUseCase {
	constructor(private readonly deliveryRepository: DeliveryRepository) {}

	async execute(input: CancelDeliveryInput): Promise<void> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new Error("Delivery not found");
		}

		await this.deliveryRepository.delete(orderId);

		const deliveryCancelledEvent = new DeliveryCancelledEvent(
			orderId.toString(),
		);
	}
}
