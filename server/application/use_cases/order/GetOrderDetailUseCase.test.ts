import { assertEquals, assertThrowsAsync } from 'https://deno.land/std/testing/asserts.ts';
import { GetOrderDetailUseCase } from './GetOrderDetailUseCase.ts';
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

Deno.test('GetOrderDetailUseCase should return order details', async () => {
    const orderRepository = new MockOrderRepository();
    const useCase = new GetOrderDetailUseCase(orderRepository);

    const order = new Order('1', 'customer1', [new OrderItem('1', 'Product 1', 100, 2)], new Date(), 'Pending');
    await orderRepository.add(order);

    const result = await useCase.execute('1');
    assertEquals(result!.id, '1');
    assertEquals(result!.customerId, 'customer1');
    assertEquals(result!.items.length, 1);
    assertEquals(result!.items[0].productId, '1');
});

Deno.test('GetOrderDetailUseCase should return null if order not found', async () => {
    const orderRepository = new MockOrderRepository();
    const useCase = new GetOrderDetailUseCase(orderRepository);

    const result = await useCase.execute('1');
    assertEquals(result, null);
});
