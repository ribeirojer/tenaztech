import { RecommendationRepository } from "../../../domain/interfaces/RecommendationRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

export class RecommendProductsUseCase {
	constructor(private recommendationRepository: RecommendationRepository) {}

	async execute(userId: string): Promise<Product[]> {
		return await this.recommendationRepository.recommendProducts(userId);
	}
}
