import { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";

export class UpdateOrderUseCase {
	constructor(private orderRepository: OrderRepository) {}

	async execute(id: string, status: string): Promise<void> {
		const order = await this.orderRepository.getById(id);
		if (!order) {
			throw new Error("Order not found");
		}

		order.updateStatus(status);
		await this.orderRepository.update(order);
	}
}
