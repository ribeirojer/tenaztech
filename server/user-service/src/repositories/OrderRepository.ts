import { supabase } from "../config/supabase";

class OrderRepository {
	static async getAll() {
		const { data, error } = await supabase.from("orders").select("*");
		if (error) throw error;
		return data;
	}

	static async getById(id: string) {
		const { data, error } = await supabase
			.from("orders")
			.select("*")
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}
}

export { OrderRepository };
