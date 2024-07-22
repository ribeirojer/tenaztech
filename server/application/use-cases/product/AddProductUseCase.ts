import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

export class AddProductUseCase {
	constructor(private productRepository: ProductRepository) {}

	async execute(name: string, price: number, stock: number): Promise<void> {
		//const product = new Product(crypto.randomUUID(), name, price, stock);
		//await this.productRepository.add(product);
	}
}
