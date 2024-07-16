import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { AddProductUseCase } from "./AddProductUseCase.ts";
import { ProductRepository } from "../../../domain/interfaces/ProductRepository.ts";
import { Product } from "../../../domain/entities/Product.ts";

class MockProductRepository implements ProductRepository {
	private products: Product[] = [];

	async getById(id: string): Promise<Product | null> {
		return this.products.find((product) => product.id === id) || null;
	}

	async getAll(): Promise<Product[]> {
		return this.products;
	}

	async add(product: Product): Promise<void> {
		this.products.push(product);
	}

	async update(product: Product): Promise<void> {
		const index = this.products.findIndex((p) => p.id === product.id);
		if (index !== -1) {
			this.products[index] = product;
		}
	}

	async remove(id: string): Promise<void> {
		this.products = this.products.filter((p) => p.id !== id);
	}

	async reduceStock(productId: string, quantity: number): Promise<void> {
		const product = this.products.find((p) => p.id === productId);
		if (product) {
			product.stock -= quantity;
		}
	}
}

Deno.test("AddProductUseCase should add a product", async () => {
	const repository = new MockProductRepository();
	const useCase = new AddProductUseCase(repository);

	await useCase.execute("Product 1", 100, 10);

	const product = await repository.getById("1");
	assertEquals(product!.name, "Product 1");
	assertEquals(product!.price, 100);
	assertEquals(product!.stock, 10);
});
