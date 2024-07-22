import { RecommendationRepository } from "../../domain/interfaces/RecommendationRepository.ts";
import { Product } from "../../domain/entities/Product.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseRecommendationRepository
	implements RecommendationRepository
{
	async recommendProducts(productId: string): Promise<Product[]> {
		const { data, error } = await supabase
			.from("recommendations")
			.select("recommendedProductId")
			.eq("productId", productId);

		if (error) {
			throw new Error(`Failed to get recommendations: ${error.message}`);
		}

		const productIds = data.map((item: any) => item.recommendedProductId);

		// Fetch product details
		const products = await supabase
			.from("products")
			.select("*")
			.in("id", productIds);

		if (products.error) {
			throw new Error(
				`Failed to get product details: ${products.error.message}`,
			);
		}

		return products.data;
	}

	async listRelatedProducts(productId: string): Promise<Product[]> {
		const { data, error } = await supabase
			.from("related_products")
			.select("relatedProductId")
			.eq("productId", productId);

		if (error) {
			throw new Error(`Failed to get related products: ${error.message}`);
		}

		const productIds = data.map((item: any) => item.relatedProductId);

		// Fetch product details
		const products = await supabase
			.from("products")
			.select("*")
			.in("id", productIds);

		if (products.error) {
			throw new Error(
				`Failed to get product details: ${products.error.message}`,
			);
		}

		return products.data;
	}
}
