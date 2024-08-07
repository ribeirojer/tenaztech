import type { OrderRepository } from "../../../domain/interfaces/OrderRepository.ts";
import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

import { Order } from "../../../domain/entities/Order.ts";
import { Address } from "../../../domain/value-objects/Address.ts";
import { Coupon } from "../../../domain/value-objects/Coupon.ts";
import { CustomerId } from "../../../domain/value-objects/CustomerId.ts";
import { OrderId } from "../../../domain/value-objects/OrderId.ts";
import { OrderItem } from "../../../domain/value-objects/OrderItem.ts";
import { OrderStatus } from "../../../domain/value-objects/OrderStatus.ts";
import type { ResendEmailService } from "../../../infrastructure/services/EmailService.ts";

interface CreateOrderInput {
	customerId: string;
	items: { productId: string; quantity: number; price: number }[];
	shippingAddress: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
	email: string;
	customerEmail: string;
	coupons?: { code: string; discountPercentage: number }[];
}

export class CreateOrderUseCase {
	constructor(
		private orderRepository: OrderRepository,
		private productRepository: ProductRepository,
		private emailService: ResendEmailService,
	) {}

	async execute(input: CreateOrderInput): Promise<Order> {
		this.validateInput(input);

		const orderId = new OrderId(this.generateUniqueId());
		const customerId = new CustomerId(input.customerId);
		const orderItems = await this.createOrderItems(input.items);
		const shippingAddress = new Address(
			input.shippingAddress.street,
			input.shippingAddress.city,
			input.shippingAddress.state,
			input.shippingAddress.zipCode,
		);
		const orderStatus = new OrderStatus("pending");

		const totalAmount = orderItems.reduce(
			(sum, item) => sum + item.getTotalPrice(),
			0,
		);

		const order = new Order(
			orderId,
			customerId,
			new Date(),
			orderItems,
			totalAmount,
			shippingAddress,
			orderStatus,
		);

		if (input.coupons) {
			this.applyCoupons(order, input.coupons);
		}

		await this.orderRepository.add(order);

		// Enviando email de confirmação
		await this.emailService.sendOrderCreatedEmail(order);

		return order;
	}

	private async createOrderItems(
		items: { productId: string; quantity: number; price: number }[],
	): Promise<OrderItem[]> {
		const orderItems: OrderItem[] = [];
		for (const item of items) {
			const product = await this.productRepository.getById(item.productId);
			if (!product) {
				throw new Error(`Product with ID ${item.productId} not found`);
			}
			if (product.stock < item.quantity) {
				throw new Error(
					`Stock insufficient for product ${item.productId}. Requested: ${item.quantity}, Available: ${product.stock}`,
				);
			}

			await this.productRepository.reduceStock(product.id, item.quantity);
			orderItems.push(
				new OrderItem(product.id, item.quantity, product.price.getValue()),
			);
		}
		return orderItems;
	}

	private generateUniqueId(): string {
		return crypto.randomUUID();
	}

	private validateInput(input: CreateOrderInput): void {
		if (!input.customerId) {
			throw new Error("Customer ID is required.");
		}

		if (!input.items || input.items.length === 0) {
			throw new Error("At least one order item is required.");
		}

		input.items.forEach((item) => {
			if (!item.productId || item.quantity <= 0 || item.price < 0) {
				throw new Error("Invalid order item.");
			}
		});

		if (!input.shippingAddress) {
			throw new Error("Shipping address is required.");
		}

		if (input.coupons) {
			input.coupons.forEach((coupon) => {
				if (
					!coupon.code ||
					coupon.discountPercentage < 0 ||
					coupon.discountPercentage > 100
				) {
					throw new Error("Invalid coupon.");
				}
			});
		}
	}

	private applyCoupons(
		order: Order,
		coupons: { code: string; discountPercentage: number }[],
	): void {
		coupons.forEach((couponInput) => {
			const coupon = new Coupon(
				couponInput.code,
				couponInput.discountPercentage,
			);
			order.applyCoupon(coupon);
		});
	}
}
