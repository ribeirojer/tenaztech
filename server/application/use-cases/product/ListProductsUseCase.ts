import type { Product } from "../../../domain/entities/Product.ts";
import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

export class ListProductsUseCase {
	constructor(private productRepository: ProductRepository) {}

	async execute(): Promise<Product[]> {
		return await this.productRepository.getAll();
	}
}
