import type { Order } from "../../../domain/entities/Order.ts";
import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";

export class ListOrdersUseCase {
	constructor(private orderRepository: OrderRepository) {}

	async execute(): Promise<Order[]> {
		return await this.orderRepository.getAll();
	}
}
