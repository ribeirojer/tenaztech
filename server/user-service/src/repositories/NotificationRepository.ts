import { supabase } from "../config/supabase";

class NotificationRepository {
    static async getAll() {
        const { data, error } = await supabase.from('notifications').select('*');
        if (error) throw error;
        return data;
    }

    static async update(id: any, updates: any) {
        const { data, error } = await supabase.from('notifications').update(updates).eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async delete(id: any) {
        const { error } = await supabase.from('notifications').delete().eq('id', id);
        if (error) throw error;
    }
}

export { NotificationRepository };
