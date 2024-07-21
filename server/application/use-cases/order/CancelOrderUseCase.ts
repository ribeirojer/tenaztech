import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

export class CancelOrderUseCase {
	constructor(
		private orderRepository: OrderRepository,
		private productRepository: ProductRepository,
	) {}

	async execute(orderId: string): Promise<void> {
		const order = await this.orderRepository.getById(orderId);
		if (!order) {
			throw new Error("Order not found");
		}
		/*
		order.items.forEach(async (item) => {
			await this.productRepository.increaseStock(item.productId, item.quantity);
		});

		order.status = "Cancelled";
		*/ await this.orderRepository.update(order);
	}
}
