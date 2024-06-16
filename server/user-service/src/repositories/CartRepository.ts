import { supabase } from "../config/supabase";

class CartRepository {
	static async getCartByUserId(userId: string) {
		const { data, error } = await supabase
			.from("carts")
			.select("*")
			.eq("user_id", userId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	static async addItem(userId: string, productId: string, quantity: number) {
		const { data, error } = await supabase
			.from("cart_items")
			.insert([{ user_id: userId, product_id: productId, quantity }]);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	static async updateItem(userId: string, itemId: string, quantity: number) {
		const { data, error } = await supabase
			.from("cart_items")
			.update({ quantity })
			.eq("user_id", userId)
			.eq("id", itemId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	static async removeItem(userId: string, itemId: string) {
		const { data, error } = await supabase
			.from("cart_items")
			.delete()
			.eq("user_id", userId)
			.eq("id", itemId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}

	static async checkout(
		userId: string,
		paymentMethod: string,
		addressId: string,
	) {
		// Exemplo simplificado de lógica de checkout
		const { data, error } = await supabase.from("orders").insert([
			{
				user_id: userId,
				payment_method: paymentMethod,
				address_id: addressId,
			},
		]);

		if (error) {
			throw new Error(error.message);
		}

		// Limpar carrinho após checkout
		await supabase.from("cart_items").delete().eq("user_id", userId);

		return data;
	}
}

export { CartRepository };
