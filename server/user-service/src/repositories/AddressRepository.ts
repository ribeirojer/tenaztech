import { supabase } from "../config/supabase";

class AddressRepository {
    static async getAll() {
        const { data, error } = await supabase.from('addresses').select('*');
        if (error) throw error;
        return data;
    }

    static async getById(id: any) {
        const { data, error } = await supabase.from('addresses').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async create(address: any) {
        const { data, error } = await supabase.from('addresses').insert([address]).single();
        if (error) throw error;
        return data;
    }

    static async update(id: any, updates: any) {
        const { data, error } = await supabase.from('addresses').update(updates).eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async delete(id: any) {
        const { error } = await supabase.from('addresses').delete().eq('id', id);
        if (error) throw error;
    }
}

export { AddressRepository };
