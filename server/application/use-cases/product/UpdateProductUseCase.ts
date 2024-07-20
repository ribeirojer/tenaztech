import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

export class UpdateProductUseCase {
	constructor(private productRepository: ProductRepository) {}

	async execute(
		id: string,
		name: string,
		price: number,
		stock: number,
	): Promise<void> {
		const product = await this.productRepository.getById(id);
		if (!product) {
			throw new Error("Product not found");
		}
		product.name = name;
		//product.price = price;
		product.stock = stock;
		await this.productRepository.update(product);
	}
}
