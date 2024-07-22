import type { Product } from "../../../domain/entities/Product.ts";
import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

interface KeywordSearchInput {
	keyword: string;
}

export class KeywordSearchUseCase {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(input: KeywordSearchInput): Promise<Product[]> {
		const products = await this.productRepository.searchByKeyword(
			input.keyword,
		);
		return products;
	}
}
