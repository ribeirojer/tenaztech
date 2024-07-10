import { OrderRepository } from '../../../domain/interfaces/OrderRepository.ts';
import { Order } from '../../../domain/entities/Order.ts';

export class ListOrdersUseCase {
    constructor(private orderRepository: OrderRepository) {}

    async execute(): Promise<Order[]> {
        return await this.orderRepository.getAll();
    }
}
