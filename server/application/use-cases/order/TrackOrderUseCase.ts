import { Order } from "../../../domain/entities/Order.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";

export class TrackOrderUseCase {
	constructor(private orderRepository: OrderRepository) {}

	async execute(orderId: string): Promise<string> {
		const order = await this.orderRepository.getById(orderId);
		if (!order) {
			throw new Error("Order not found");
		}
		return order.getOrderDetails().status.getStatus();
	}
}
