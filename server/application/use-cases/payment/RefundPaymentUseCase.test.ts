import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { RefundPaymentUseCase } from "./RefundPaymentUseCase.ts";
import { PaymentRepository } from "../../domain/interfaces/PaymentRepository.ts";
import { Payment } from "../../domain/entities/Payment.ts";
import { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";
import { Order } from "../../domain/entities/Order.ts";
import { MercadoPagoService } from "../../infra/mercadopago/MercadoPagoService.ts";

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

Deno.test("RefundPaymentUseCase should refund payment and update order status", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const useCase = new RefundPaymentUseCase(paymentRepository, orderRepository);

	const order = new Order("1", "paid", 100);
	await orderRepository.add(order);

	const payment = new Payment("1", 100, "credit_card", "processed");
	await paymentRepository.add(payment);

	await useCase.execute("1");

	const updatedPayment = await paymentRepository.getById("1");
	assertEquals(updatedPayment!.status, "refunded");

	const updatedOrder = await orderRepository.getById("1");
	assertEquals(updatedOrder!.status, "refunded");
});

Deno.test("RefundPaymentUseCase should throw error if payment not found", async () => {
	const paymentRepository = new MockPaymentRepository();
	const orderRepository = new MockOrderRepository();
	const useCase = new RefundPaymentUseCase(paymentRepository, orderRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1");
		},
		Error,
		"Payment not found",
	);
});

class MockMercadoPagoService extends MercadoPagoService {
	async refundPayment(paymentId: string): Promise<any> {
		return { status: "refunded" };
	}
}

Deno.test("RefundPaymentUseCase should refund payment and update payment status", async () => {
	const paymentRepository = new MockPaymentRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new RefundPaymentUseCase(
		paymentRepository,
		mercadoPagoService,
	);

	const payment = new Payment("1", "1", 100, "credit_card", "processed");
	await paymentRepository.add(payment);

	await useCase.execute("1");

	const refundedPayment = await paymentRepository.getById("1");
	assertEquals(refundedPayment!.status, "refunded");
});

Deno.test("RefundPaymentUseCase should throw error if payment not found", async () => {
	const paymentRepository = new MockPaymentRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new RefundPaymentUseCase(
		paymentRepository,
		mercadoPagoService,
	);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1");
		},
		Error,
		"Payment not found",
	);
});
