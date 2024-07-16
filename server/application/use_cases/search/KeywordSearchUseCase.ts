import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

interface KeywordSearchInput {
    keyword: string;
}

export class KeywordSearchUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: KeywordSearchInput): Promise<Product[]> {
        const products = await this.productRepository.searchByKeyword(input.keyword);
        return products;
    }
}
