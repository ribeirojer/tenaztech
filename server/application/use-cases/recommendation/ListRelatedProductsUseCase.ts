import { RecommendationRepository } from "../../../domain/interfaces/RecommendationRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

export class ListRelatedProductsUseCase {
	constructor(private recommendationRepository: RecommendationRepository) {}

	async execute(productId: string): Promise<Product[]> {
		return await this.recommendationRepository.listRelatedProducts(productId);
	}
}
