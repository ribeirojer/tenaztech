import { ProductRepository } from '../../../domain/interfaces/ProductRepository.ts';
import { Product } from '../../../domain/entities/Product.ts';

export class GetProductDetailUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string): Promise<Product | null> {
        return await this.productRepository.getById(id);
    }
}
