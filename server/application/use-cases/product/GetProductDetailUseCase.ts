import type { Product } from "../../../domain/entities/Product.ts";
import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

export class GetProductDetailUseCase {
	constructor(private productRepository: ProductRepository) {}

	async execute(slug: string): Promise<Product | null> {
		return await this.productRepository.getBySlug(slug);
	}
}
