import type { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";

export class RemoveProductUseCase {
	constructor(private productRepository: ProductRepository) {}

	async execute(id: string): Promise<void> {
		const product = await this.productRepository.getById(id);
		if (!product) {
			throw new Error("Product not found");
		}
		await this.productRepository.remove(id);
	}
}
