import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { ProcessPaymentUseCase } from "./ProcessPaymentUseCase.ts";
import { PaymentRepository } from "../../domain/interfaces/PaymentRepository.ts";
import { Payment } from "../../domain/entities/Payment.ts";
import { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";
import { Order } from "../../domain/entities/Order.ts";

class MockPaymentRepository implements PaymentRepository {
	private payments: Payment[] = [];

	async getById(id: string): Promise<Payment | null> {
		return this.payments.find((payment) => payment.id === id) || null;
	}

	async getAll(): Promise<Payment[]> {
		return this.payments;
	}

	async add(payment: Payment): Promise<void> {
		this.payments.push(payment);
	}

	async update(payment: Payment): Promise<void> {
		const index = this.payments.findIndex((p) => p.id === payment.id);
		if (index !== -1) {
			this.payments[index] = payment;
		}
	}

	async remove(id: string): Promise<void> {
		this.payments = this.payments.filter((payment) => payment.id !== id);
	}
}

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

Deno.test("ProcessPaymentUseCase should process payment and update order status", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const useCase = new ProcessPaymentUseCase(paymentRepository, orderRepository);

	const order = new Order("1", "pending", 100);
	await orderRepository.add(order);

	await useCase.execute("1", 100, "credit_card");

	const payments = await paymentRepository.getAll();
	assertEquals(payments.length, 1);
	assertEquals(payments[0].orderId, "1");
	assertEquals(payments[0].amount, 100);
	assertEquals(payments[0].paymentMethod, "credit_card");

	const updatedOrder = await orderRepository.getById("1");
	assertEquals(updatedOrder!.status, "paid");
});

Deno.test("ProcessPaymentUseCase should throw error if order not found", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const useCase = new ProcessPaymentUseCase(paymentRepository, orderRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1", 100, "credit_card");
		},
		Error,
		"Order not found",
	);
});
import { MercadoPagoService } from "../../infra/mercadopago/MercadoPagoService.ts";

class MockMercadoPagoService extends MercadoPagoService {
	async createPayment(
		description: string,
		amount: number,
		paymentMethod: string,
		email: string,
	): Promise<any> {
		return { status: "approved" };
	}
}

Deno.test("ProcessPaymentUseCase should process payment and update order status", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new ProcessPaymentUseCase(
		paymentRepository,
		orderRepository,
		mercadoPagoService,
	);

	const order = new Order("1", "pending", 100);
	await orderRepository.add(order);

	await useCase.execute("1", 100, "credit_card", "test@example.com");

	const payments = await paymentRepository.getAll();
	assertEquals(payments.length, 1);
	assertEquals(payments[0].orderId, "1");
	assertEquals(payments[0].amount, 100);
	assertEquals(payments[0].paymentMethod, "credit_card");

	const updatedOrder = await orderRepository.getById("1");
	assertEquals(updatedOrder!.status, "paid");
});

Deno.test("ProcessPaymentUseCase should throw error if order not found", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new ProcessPaymentUseCase(
		paymentRepository,
		orderRepository,
		mercadoPagoService,
	);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1", 100, "credit_card", "test@example.com");
		},
		Error,
		"Order not found",
	);
});
