import type { Product } from "../entities/Product.ts";

export interface ProductRepository {
  getBySlug(slug: string): Product | PromiseLike<Product | null> | null;
	searchByKeyword(keyword: string): Promise<Product[]>;
	find(filters: any): Promise<Product[]>;
	increaseStock(productId: any, quantity: any): unknown;
	getById(id: string): Promise<Product | null>;
	getAll(): Promise<Product[]>;
	add(product: Product): Promise<void>;
	update(product: Product): Promise<void>;
	remove(id: string): Promise<void>;
	reduceStock(productId: string, quantity: number): Promise<void>;
}
