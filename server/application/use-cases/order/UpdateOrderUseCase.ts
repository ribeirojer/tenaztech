import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Order } from "../../../domain/entities/Order.ts";
import { OrderItem } from "../../../domain/value-objects/OrderItem.ts";

export class UpdateOrderUseCase {
	constructor(
		private orderRepository: OrderRepository,
		private productRepository: ProductRepository,
	) {}

	async execute(
		orderId: string,
		items: { productId: string; quantity: number }[],
	): Promise<void> {
		const order = await this.orderRepository.getById(orderId);
		if (!order) {
			throw new Error("Order not found");
		}

		const orderItems: OrderItem[] = [];

		for (const item of items) {
			const product = await this.productRepository.getById(item.productId);
			if (!product) {
				throw new Error(`Product with ID ${item.productId} not found`);
			}
			if (product.stock < item.quantity) {
				throw new Error(`Not enough stock for product ${product.name}`);
			}

			await this.productRepository.reduceStock(product.id, item.quantity);
			orderItems.push(
				new OrderItem(product.id, item.quantity, product.price.getValue()),
			);
		}

		//order.items = orderItems;
		await this.orderRepository.update(order);
	}
}
