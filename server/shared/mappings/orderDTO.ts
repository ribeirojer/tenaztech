import { Order } from "../../domain/entities/Order.ts";

export const toDTO = (order: Order) => ({
	id: order.id,
	customerId: order.customerId,
	productIds: order.productIds,
	status: order.status,
	totalAmount: order.totalAmount,
});

export const fromDTO = (dto: any) =>
	new Order(
		dto.id,
		dto.customerId,
		dto.productIds,
		dto.status,
		dto.totalAmount,
	);
