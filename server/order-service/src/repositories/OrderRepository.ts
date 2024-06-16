import { supabase } from "../services/supabaseService";

class OrderRepository {
	static async create(orderData: any) {
		const { data, error } = await supabase
			.from("orders")
			.insert(orderData)
			.select()
			.single();
		if (error) throw error.message;
		return data;
	}

	static async getAll() {
		const { data, error } = await supabase.from("orders").select("*");
		if (error) throw error.message;
		return data;
	}

	static async getById(orderId: string) {
		const { data, error } = await supabase
			.from("orders")
			.select("*")
			.eq("id", orderId)
			.single();
		if (error) throw error.message;
		return data;
	}

	static async updateStatus(orderId: string, status: string) {
		const { data, error } = await supabase
			.from("orders")
			.update({ status })
			.eq("id", orderId);
		if (error) throw error.message;
		return data;
	}

	static async getTrackingInfo(orderId: string) {
		// Implementar integração com serviço de rastreamento
	}

	static async cancel(orderId: string) {
		const { data, error } = await supabase
			.from("orders")
			.delete()
			.eq("id", orderId);
		if (error) throw error.message;
		return data;
	}

	static async refund(orderId: string) {
		// Implementar lógica de reembolso
	}

	static async getOrderProducts(orderId: string) {
		const { data, error } = await supabase
			.from("order_products")
			.select("*")
			.eq("order_id", orderId);
		if (error) throw error.message;
		return data;
	}

	static async applyCoupon(orderId: string, couponCode: string) {
		// Implementar lógica de aplicação de cupom
	}

	static async removeCoupon(orderId: string) {
		// Implementar lógica de remoção de cupom
	}

	static async integrateLogistics(orderId: string, logisticsData: any) {
		// Implementar integração com serviço de logística
	}
}

export { OrderRepository };
