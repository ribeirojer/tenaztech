import { assertEquals, assertThrowsAsync } from 'https://deno.land/std/testing/asserts.ts';
import { CancelOrderUseCase } from './CancelOrderUseCase.ts';
import { OrderRepository } from '../../../domain/interfaces/OrderRepository.ts';
import { ProductRepository } from '../../../domain/interfaces/ProductRepository.ts';
import { Order } from '../../../domain/entities/Order.ts';
import { OrderItem } from '../../../domain/entities/OrderItem.ts';
import { Product } from '../../../domain/entities/Product.ts';

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

class MockProductRepository implements ProductRepository {
    private products: Product[] = [];

    async getById(id: string): Promise<Product | null> {
        return this.products.find(product => product.id === id) || null;
    }

    async getAll(): Promise<Product[]> {
        return this.products;
    }

    async add(product: Product): Promise<void> {
        this.products.push(product);
    }

    async update(product: Product): Promise<void> {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.products[index] = product;
        }
    }

    async remove(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }

    async reduceStock(productId: string, quantity: number): Promise<void> {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock -= quantity;
        }
    }

    async increaseStock(productId: string, quantity: number): Promise<void> {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock += quantity;
        }
    }
}

Deno.test('CancelOrderUseCase should cancel an existing order', async () => {
    const orderRepository = new MockOrderRepository();
    const productRepository = new MockProductRepository();
    const useCase = new CancelOrderUseCase(orderRepository, productRepository);

    const originalOrder = new Order('1', 'customer1', [new OrderItem('1', 'Product 1', 100, 2)], new Date(), 'Pending');
    await orderRepository.add(originalOrder);
    await productRepository.add(new Product('1', 'Product 1', 100, 10));

    await useCase.execute('1');

    const cancelledOrder = await orderRepository.getById('1');
    assertEquals(cancelledOrder!.status, 'Cancelled');
});

Deno.test('CancelOrderUseCase should throw error if order not found', async () => {
    const orderRepository = new MockOrderRepository();
    const productRepository = new MockProductRepository();
    const useCase = new CancelOrderUseCase(orderRepository, productRepository);

    await assertThrowsAsync(
        async () => {
            await useCase.execute('1');
        },
        Error,
        'Order not found'
    );
});
