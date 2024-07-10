import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { ListOrdersUseCase } from './ListOrdersUseCase.ts';
import { OrderRepository } from '../../../domain/interfaces/OrderRepository.ts';
import { Order } from '../../../domain/entities/Order.ts';
import { OrderItem } from '../../../domain/entities/OrderItem.ts';

class MockOrderRepository implements OrderRepository {
    private orders: Order[] = [];

    async getById(id: string): Promise<Order | null> {
        return this.orders.find(order => order.id === id) || null;
    }

    async getAll(): Promise<Order[]> {
        return this.orders;
    }

    async add(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async update(order: Order): Promise<void> {
        const index = this.orders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            this.orders[index] = order;
        }
    }

    async remove(id: string): Promise<void> {
        this.orders = this.orders.filter(order => order.id !== id);
    }
}

Deno.test('ListOrdersUseCase should return all orders', async () => {
    const orderRepository = new MockOrderRepository();
    const useCase = new ListOrdersUseCase(orderRepository);

    const order1 = new Order('1', 'customer1', [new OrderItem('1', 'Product 1', 100, 2)], new Date(), 'Pending');
    const order2 = new Order('2', 'customer2', [new OrderItem('2', 'Product 2', 200, 1)], new Date(), 'Shipped');
    await orderRepository.add(order1);
    await orderRepository.add(order2);

    const orders = await useCase.execute();
    assertEquals(orders.length, 2);
    assertEquals(orders[0].id, '1');
    assertEquals(orders[1].id, '2');
});
