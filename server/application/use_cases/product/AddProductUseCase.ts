import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/interfaces/ProductRepository";

export class AddProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(name: string, price: number, stock: number): Promise<void> {
        const product = new Product(crypto.randomUUID(), name, price, stock);
        await this.productRepository.add(product);
    }
}
