import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { CreateOrderUseCase } from "./CreateOrderUseCase.ts";
import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Order } from "../../../domain/entities/Order.ts";
import { Product } from "../../../domain/entities/Product.ts";

class MockOrderRepository implements OrderRepository {
	private orders: Order[] = [];

	async getById(id: string): Promise<Order | null> {
		return this.orders.find((order) => order.id === id) || null;
	}

	async getAll(): Promise<Order[]> {
		return this.orders;
	}

	async add(order: Order): Promise<void> {
		this.orders.push(order);
	}

	async update(order: Order): Promise<void> {
		const index = this.orders.findIndex((o) => o.id === order.id);
		if (index !== -1) {
			this.orders[index] = order;
		}
	}

	async remove(id: string): Promise<void> {
		this.orders = this.orders.filter((order) => order.id !== id);
	}
}

class MockProductRepository implements ProductRepository {
	private products: Product[] = [];

	async getById(id: string): Promise<Product | null> {
		return this.products.find((product) => product.id === id) || null;
	}

	async getAll(): Promise<Product[]> {
		return this.products;
	}

	async add(product: Product): Promise<void> {
		this.products.push(product);
	}

	async update(product: Product): Promise<void> {
		const index = this.products.findIndex((p) => p.id === product.id);
		if (index !== -1) {
			this.products[index] = product;
		}
	}

	async remove(id: string): Promise<void> {
		this.products = this.products.filter((p) => p.id !== id);
	}

	async reduceStock(productId: string, quantity: number): Promise<void> {
		const product = this.products.find((p) => p.id === productId);
		if (product) {
			product.stock -= quantity;
		}
	}

	async increaseStock(productId: string, quantity: number): Promise<void> {
		const product = this.products.find((p) => p.id === productId);
		if (product) {
			product.stock += quantity;
		}
	}
}

Deno.test("CreateOrderUseCase should create a new order", async () => {
	const orderRepository = new MockOrderRepository();
	const productRepository = new MockProductRepository();
	const useCase = new CreateOrderUseCase(orderRepository, productRepository);

	await productRepository.add(new Product("1", "Product 1", 100, 10));

	await useCase.execute("customer1", [{ productId: "1", quantity: 2 }]);

	const orders = await orderRepository.getAll();
	assertEquals(orders.length, 1);
	assertEquals(orders[0].customerId, "customer1");
	assertEquals(orders[0].items.length, 1);
	assertEquals(orders[0].items[0].productId, "1");
	assertEquals(orders[0].items[0].quantity, 2);
});

Deno.test("CreateOrderUseCase should throw error if product not found", async () => {
	const orderRepository = new MockOrderRepository();
	const productRepository = new MockProductRepository();
	const useCase = new CreateOrderUseCase(orderRepository, productRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("customer1", [{ productId: "1", quantity: 2 }]);
		},
		Error,
		"Product with ID 1 not found",
	);
});

Deno.test("CreateOrderUseCase should throw error if not enough stock", async () => {
	const orderRepository = new MockOrderRepository();
	const productRepository = new MockProductRepository();
	const useCase = new CreateOrderUseCase(orderRepository, productRepository);

	await productRepository.add(new Product("1", "Product 1", 100, 1));

	await assertThrowsAsync(
		async () => {
			await useCase.execute("customer1", [{ productId: "1", quantity: 2 }]);
		},
		Error,
		"Not enough stock for product Product 1",
	);
});
