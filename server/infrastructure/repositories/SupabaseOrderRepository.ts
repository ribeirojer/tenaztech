import { createClient, SupabaseClient } from 'https://deno.land/x/supabase/mod.ts';
import { Order } from '../../domain/entities/Order.ts';
import { OrderRepository } from '../../domain/interfaces/OrderRepository.ts';

export class SupabaseOrderRepository implements OrderRepository {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient('your-supabase-url', 'your-supabase-key');
    }

    async getById(id: string): Promise<Order | null> {
        const { data, error } = await this.supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return data ? new Order(data.id, data.customerId, data.items, data.createdAt, data.status) : null;
    }

    async getAll(): Promise<Order[]> {
        const { data, error } = await this.supabase
            .from('orders')
            .select('*');

        if (error) {
            throw error;
        }

        return data.map((item: any) => new Order(item.id, item.customerId, item.items, item.createdAt, item.status));
    }

    async add(order: Order): Promise<void> {
        const { error } = await this.supabase
            .from('orders')
            .insert([{ id: order.id, customerId: order.customerId, items: order.items, createdAt: order.createdAt, status: order.status }]);

        if (error) {
            throw error;
        }
    }

    async update(order: Order): Promise<void> {
        const { error } = await this.supabase
            .from('orders')
            .update({ customerId: order.customerId, items: order.items, createdAt: order.createdAt, status: order.status })
            .eq('id', order.id);

        if (error) {
            throw error;
        }
    }

    async remove(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('orders')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }
    }
}
