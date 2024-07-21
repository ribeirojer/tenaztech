import { Delivery } from "../../domain/entities/Delivery.ts";
import { OrderId } from "../../domain/value-objects/OrderId.ts";
import { DeliveryDate } from "../../domain/value-objects/DeliveryDate.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseDeliveryRepository {
	async add(delivery: Delivery): Promise<void> {
		const { data, error } = await supabase.from("deliveries").insert([
			{
				order_id: delivery.orderId,
				delivery_date: delivery.date.getValue(),
				status: delivery.status,
			},
		]);

		if (error) throw error;
	}

	async update(delivery: Delivery): Promise<void> {
		const { data, error } = await supabase
			.from("deliveries")
			.update({
				delivery_date: delivery.date.getValue(),
				status: delivery.status,
			})
			.eq("order_id", delivery.orderId.toString());

		if (error) throw error;
	}

	async getByOrderId(orderId: OrderId): Promise<Delivery | null> {
		const { data, error } = await supabase
			.from("deliveries")
			.select("*")
			.eq("order_id", orderId.toString())
			.single();

		if (error) throw error;

		if (!data) return null;

		return new Delivery(
			new OrderId(data.order_id),
			new DeliveryDate(data.delivery_date),
			data.status,
		);
	}

	async delete(orderId: OrderId): Promise<void> {
		const { error } = await supabase
			.from("deliveries")
			.delete()
			.eq("order_id", orderId.toString());

		if (error) throw error;
	}
}
