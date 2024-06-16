import { supabase } from "../config/supabase.ts";

export class ProductRepository {
	async getAllProducts() {
		const { data, error } = await supabase.from("products").select("*");
		if (error) throw error;
		return data;
	}

	async getProductBySlug(slug: string) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("slug", slug)
			.single();
		if (error) throw error;
		return data;
	}

	async getProductById(id: string) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}

	async addProduct(productData: any) {
		const { data, error } = await supabase
			.from("products")
			.insert(productData)
			.single();
		if (error) throw error;
		return data;
	}

	async updateProduct(id: string, productData: any) {
		const { data, error } = await supabase
			.from("products")
			.update(productData)
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}

	async deleteProduct(id: string) {
		const { data, error } = await supabase
			.from("products")
			.delete()
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}

	async searchProductsByName(name: string) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.ilike("name", `%${name}%`);
		if (error) throw error;
		return data;
	}

	async getProductsByCategory(category: string) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("category", category);
		if (error) throw error;
		return data;
	}

	async getProductsOnDiscount() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.gt("discount", 0);
		if (error) throw error;
		return data;
	}

	async getAllCategories() {
		const { data, error } = await supabase.from("categories").select("*");
		if (error) throw error;
		return data;
	}

	async getBestSellers() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("sales", { ascending: false })
			.limit(10);
		if (error) throw error;
		return data;
	}

	async getRecommendedProducts() {
		// Logic to get recommended products
	}

	async getProductsByPriceRange(minPrice: number, maxPrice: number) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.gte("price", minPrice)
			.lte("price", maxPrice);
		if (error) throw error;
		return data;
	}

	async getProductsOnSale() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.is("on_sale", true);
		if (error) throw error;
		return data;
	}

	async getProductDetails(id: string) {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id)
			.single();
		if (error) throw error;
		return data;
	}

	async getNewArrivals() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(10);
		if (error) throw error;
		return data;
	}
}
