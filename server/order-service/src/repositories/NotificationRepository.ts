import { supabase } from "../services/supabaseService";

class NotificationRepository {
    static async getOrderNotifications() {
        const { data, error } = await supabase.from('notifications').select('*').eq('type', 'order');
        if (error) throw error;
        return data;
    }

    static async markAsRead(notificationId: string) {
        const { data, error } = await supabase.from('notifications').update({ read: true }).eq('id', notificationId);
        if (error) throw error;
        return data;
    }

    static async delete(notificationId: string) {
        const { data, error } = await supabase.from('notifications').delete().eq('id', notificationId);
        if (error) throw error;
        return data;
    }
}

export { NotificationRepository };
