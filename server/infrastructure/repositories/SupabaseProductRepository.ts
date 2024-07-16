import { Product } from "../../domain/entities/Product.ts";
import { ProductRepository } from "../../domain/interfaces/ProductRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseProductRepository implements ProductRepository {
	async find(filters: any): Promise<Product[]> {
        let query = supabase.from('products').select('*');

        if (filters.category) {
            query = query.eq('category', filters.category);
        }

        if (filters.price) {
            query = query.gte('price', filters.price.$gte).lte('price', filters.price.$lte);
        }

        if (filters.brand) {
            query = query.eq('brand', filters.brand);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data;
    }

    async searchByKeyword(keyword: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${keyword}%`);
        if (error) throw error;

        return data;
    }
	increaseStock(productId: any, quantity: any): unknown {
		throw new Error("Method not implemented.");
	}
	async getById(id: string): Promise<Product | null> {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw error;
		}

		return data;
	}

	async getAll(): Promise<Product[]> {
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw error;
		}

		return data;
	}

	async add(product: Product): Promise<void> {
		const { error } = await supabase
			.from("products")
			.insert([
				{
					id: product.id,
					name: product.name,
					price: product.price,
					stock: product.stock,
				},
			]);

		if (error) {
			throw error;
		}
	}

	async update(product: Product): Promise<void> {
		const { error } = await supabase
			.from("products")
			.update({
				name: product.name,
				price: product.price,
				stock: product.stock,
			})
			.eq("id", product.id);

		if (error) {
			throw error;
		}
	}

	async remove(id: string): Promise<void> {
		const { error } = await supabase
			.from("products")
			.delete()
			.eq("id", id);

		if (error) {
			throw error;
		}
	}

	async reduceStock(productId: string, quantity: number): Promise<void> {
		const { data, error } = await supabase
			.from("products")
			.update({ stock: supabase.fn("subtract", ["stock", quantity]) })
			.eq("id", productId);

		if (error) {
			throw error;
		}

		if (data.length === 0) {
			throw new Error("Product not found");
		}
	}
}
