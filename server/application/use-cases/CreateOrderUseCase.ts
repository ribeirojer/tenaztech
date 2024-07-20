import { Order } from "../../domain/entities/Order.ts";
import { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";
import { ProductRepository } from "../../domain/interfaces/ProductRepository.ts";

export class CreateOrderUseCase {
	constructor(
		private orderRepository: OrderRepository,
		private productRepository: ProductRepository,
	) {}

	async execute(
		customerId: string,
		productIds: string[],
		totalAmount: number,
	): Promise<void> {
		// Verificar se os produtos estão em estoque
		for (const productId of productIds) {
			const product = await this.productRepository.getById(productId);
			if (!product || product.stock <= 0) {
				throw new Error(`Product ${productId} is out of stock`);
			}
		}

		// Calcular o valor total com possíveis descontos
		const discount = this.calculateDiscount(productIds);
		const finalAmount = totalAmount - discount;

		const order = new Order(
			crypto.randomUUID(),
			customerId,
			productIds,
			"pending",
			finalAmount,
		);
		await this.orderRepository.add(order);

		// Reduzir o estoque dos produtos
		for (const productId of productIds) {
			await this.productRepository.reduceStock(productId, 1);
		}
	}

	calculateDiscount(productIds: string[]): number {
		// Regra de negócio: aplicar um desconto de 10% se mais de 3 produtos forem comprados
		if (productIds.length > 3) {
			return 0.1 * productIds.length * 50; // Supondo que cada produto custa 50 unidades monetárias
		}
		return 0;
	}
}
