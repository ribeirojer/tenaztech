import { OrderRepository } from '../../../domain/interfaces/OrderRepository.ts';
import { Order } from '../../../domain/entities/Order.ts';

export class GetOrderDetailUseCase {
    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: string): Promise<Order | null> {
        return await this.orderRepository.getById(orderId);
    }
}
