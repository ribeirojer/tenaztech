import { OrderRepository } from '../../../domain/interfaces/OrderRepository.ts';
import { ProductRepository } from '../../../domain/interfaces/ProductRepository.ts';
import { Order } from '../../../domain/entities/Order.ts';
import { OrderItem } from '../../../domain/entities/OrderItem.ts';

export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepository, private productRepository: ProductRepository) {}

    async execute(customerId: string, items: { productId: string, quantity: number }[]): Promise<void> {
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
            orderItems.push(new OrderItem(product.id, product.name, product.price, item.quantity));
        }

        const order = new Order(crypto.randomUUID(), customerId, orderItems, new Date(), 'Pending');
        await this.orderRepository.add(order);
    }
}
