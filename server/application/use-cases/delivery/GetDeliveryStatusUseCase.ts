import type { DeliveryRepository } from "../../../domain/interfaces/DeliveryRepository.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";

interface GetDeliveryStatusInput {
	orderId: string;
}

interface GetDeliveryStatusOutput {
	orderId: string;
	deliveryDate: Date;
	status: string;
}

export class GetDeliveryStatusUseCase {
	constructor(private readonly deliveryRepository: DeliveryRepository) {}

	async execute(
		input: GetDeliveryStatusInput,
	): Promise<GetDeliveryStatusOutput> {
		const orderId = new OrderId(input.orderId);
		const delivery = await this.deliveryRepository.getByOrderId(orderId);

		if (!delivery) {
			throw new Error("Delivery not found");
		}

		return {
			orderId: delivery.orderId.toString(),
			deliveryDate: delivery.date.getValue(),
			status: delivery.status,
		};
	}
}
