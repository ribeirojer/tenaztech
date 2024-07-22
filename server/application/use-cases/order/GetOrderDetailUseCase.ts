import type { Order } from "../../../domain/entities/Order.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";

export class GetOrderDetailUseCase {
	constructor(private orderRepository: OrderRepository) {}

	async execute(orderId: string): Promise<Order | null> {
		return await this.orderRepository.getById(orderId);
	}
}
