import { createClient, SupabaseClient } from 'https://deno.land/x/supabase/mod.ts';
import { User } from '../../domain/entities/User.ts';
import { UserRepository } from '../../domain/interfaces/UserRepository.ts';

export class SupabaseUserRepository implements UserRepository {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient('your-supabase-url', 'your-supabase-key');
    }

    async getById(id: string): Promise<User | null> {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return data ? new User(data.id, data.name, data.email) : null;
    }

    async add(user: User): Promise<void> {
        const { error } = await this.supabase
            .from('users')
            .insert([{ id: user.id, name: user.name, email: user.email }]);

        if (error) {
            throw error;
        }
    }

    async update(user: User): Promise<void> {
        const { error } = await this.supabase
            .from('users')
            .update({ name: user.name, email: user.email })
            .eq('id', user.id);

        if (error) {
            throw error;
        }
    }
}
