import type { Product } from "../entities/Product.ts";

export interface RecommendationRepository {
	recommendProducts(productId: string): Promise<Product[]>;
	listRelatedProducts(productId: string): Promise<Product[]>;
}
