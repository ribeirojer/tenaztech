import type { Product } from "../../../domain/entities/Product.ts";
import type { RecommendationRepository } from "../../../domain/interfaces/RecommendationRepository.ts";

export class ListRelatedProductsUseCase {
	constructor(private recommendationRepository: RecommendationRepository) {}

	async execute(productId: string): Promise<Product[]> {
		return await this.recommendationRepository.listRelatedProducts(productId);
	}
}
