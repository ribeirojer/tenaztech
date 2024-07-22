import type { Product } from "../../../domain/entities/Product.ts";
import type { RecommendationRepository } from "../../../domain/interfaces/RecommendationRepository.ts";

export class RecommendProductsUseCase {
	constructor(private recommendationRepository: RecommendationRepository) {}

	async execute(userId: string): Promise<Product[]> {
		return await this.recommendationRepository.recommendProducts(userId);
	}
}
