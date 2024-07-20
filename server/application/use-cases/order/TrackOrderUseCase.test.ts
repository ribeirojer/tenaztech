import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { TrackOrderUseCase } from "./TrackOrderUseCase.ts";
import { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import { Order } from "../../../domain/entities/Order.ts";
import { OrderItem } from "../../../domain/entities/OrderItem.ts";

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

Deno.test("TrackOrderUseCase should return order status", async () => {
	const orderRepository = new MockOrderRepository();
	const useCase = new TrackOrderUseCase(orderRepository);

	const order = new Order(
		"1",
		"customer1",
		[new OrderItem("1", "Product 1", 100, 2)],
		new Date(),
		"Pending",
	);
	await orderRepository.add(order);

	const status = await useCase.execute("1");
	assertEquals(status, "Pending");
});

Deno.test("TrackOrderUseCase should throw error if order not found", async () => {
	const orderRepository = new MockOrderRepository();
	const useCase = new TrackOrderUseCase(orderRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1");
		},
		Error,
		"Order not found",
	);
});
