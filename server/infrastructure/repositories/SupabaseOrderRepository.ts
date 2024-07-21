import { Order } from "../../domain/entities/Order.ts";
import { OrderRepository } from "../../domain/interfaces/OrderRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseOrderRepository implements OrderRepository {
	getById(id: string): Promise<Order | null> {
		throw new Error("Method not implemented.");
	}
	getAll(): Promise<Order[]> {
		throw new Error("Method not implemented.");
	}
	add(order: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	update(order: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	remove(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	/** 
	async getById(id: string): Promise<Order | null> {
		const { data, error } = await this.supabase
			.from("orders")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw error;
		}

		return data
			? new Order(
					data.id,
					data.customerId,
					data.items,
					data.createdAt,
					data.status,
				)
			: null;
	}

	async getAll(): Promise<Order[]> {
		const { data, error } = await this.supabase.from("orders").select("*");

		if (error) {
			throw error;
		}

		return data.map(
			(item: any) =>
				new Order(
					item.id,
					item.customerId,
					item.items,
					item.createdAt,
					item.status,
				),
		);
	}

	async add(order: Order): Promise<void> {
		const { error } = await this.supabase
			.from("orders")
			.insert([
				{
					id: order.id,
					customerId: order.customerId,
					items: order.items,
					createdAt: order.createdAt,
					status: order.status,
				},
			]);

		if (error) {
			throw error;
		}
	}

	async update(order: Order): Promise<void> {
		const { error } = await this.supabase
			.from("orders")
			.update({
				customerId: order.customerId,
				items: order.items,
				createdAt: order.createdAt,
				status: order.status,
			})
			.eq("id", order.id);

		if (error) {
			throw error;
		}
	}

	async remove(id: string): Promise<void> {
		const { error } = await this.supabase.from("orders").delete().eq("id", id);

		if (error) {
			throw error;
		}
	}
*/
	async save(order: Order): Promise<void> {
		const {
			id,
			customerId,
			orderDate,
			items,
			totalAmount,
			shippingAddress,
			status,
			createdAt,
			updatedAt,
		} = order.getOrderDetails();
		const { data, error } = await supabase.from("orders").insert({
			id: id.toString(),
			customer_id: customerId.toString(),
			order_date: orderDate.toISOString(),
			items: items.map((item) => ({
				product_id: item.productId,
				quantity: item.quantity,
				price: item.unitPrice,
			})),
			total_amount: totalAmount,
			shipping_address: {
				street: shippingAddress.street,
				city: shippingAddress.city,
				state: shippingAddress.state,
				zip_code: shippingAddress.zipCode,
			},
			status: status.getStatus(),
			created_at: createdAt.toISOString(),
			updated_at: updatedAt.toISOString(),
		});

		if (error) {
			throw new Error("Failed to save order");
		}
	}

	async startProcessingOrder(orderId: string): Promise<void> {
		const { data, error } = await supabase
			.from("orders")
			.update({ processing: true })
			.eq("id", orderId)
			.eq("processing", false); // Garante que o pedido não está sendo processado

		if (error) {
			throw new Error(
				`Error starting processing for order ${orderId}: ${error.message}`,
			);
		}

		if (data.length === 0) {
			throw new Error(`Order ${orderId} is already being processed.`);
		}
	}

	async completeProcessingOrder(orderId: string): Promise<void> {
		const { error } = await supabase
			.from("orders")
			.update({ processing: false })
			.eq("id", orderId);

		if (error) {
			throw new Error(
				`Error completing processing for order ${orderId}: ${error.message}`,
			);
		}
	}
}
