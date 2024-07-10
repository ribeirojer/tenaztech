import { createClient, SupabaseClient } from 'https://deno.land/x/supabase/mod.ts';
import { Product } from '../../domain/entities/Product.ts';
import { ProductRepository } from '../../domain/interfaces/ProductRepository.ts';

export class SupabaseProductRepository implements ProductRepository {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient('your-supabase-url', 'your-supabase-key');
    }

    async getById(id: string): Promise<Product | null> {
        const { data, error } = await this.supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return data ? new Product(data.id, data.name, data.price, data.stock) : null;
    }

    async getAll(): Promise<Product[]> {
        const { data, error } = await this.supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        return data.map((item: any) => new Product(item.id, item.name, item.price, item.stock));
    }

    async add(product: Product): Promise<void> {
        const { error } = await this.supabase
            .from('products')
            .insert([{ id: product.id, name: product.name, price: product.price, stock: product.stock }]);

        if (error) {
            throw error;
        }
    }

    async update(product: Product): Promise<void> {
        const { error } = await this.supabase
            .from('products')
            .update({ name: product.name, price: product.price, stock: product.stock })
            .eq('id', product.id);

        if (error) {
            throw error;
        }
    }

    async remove(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }
    }

    async reduceStock(productId: string, quantity: number): Promise<void> {
        const { data, error } = await this.supabase
            .from('products')
            .update({ stock: this.supabase.fn('subtract', ['stock', quantity]) })
            .eq('id', productId);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            throw new Error('Product not found');
        }
    }
}
