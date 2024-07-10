import { ProductRepository } from '../../../domain/interfaces/ProductRepository.ts';
import { Product } from '../../../domain/entities/Product.ts';

export class ListProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return await this.productRepository.getAll();
    }
}
