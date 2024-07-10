import { Product } from '../entities/Product.ts';

export interface ProductRepository {
    increaseStock(productId: any, quantity: any): unknown;
    getById(id: string): Promise<Product | null>;
    getAll(): Promise<Product[]>;
    add(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
    remove(id: string): Promise<void>;
    reduceStock(productId: string, quantity: number): Promise<void>;
}
