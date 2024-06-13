import { supabase } from "../services/supabaseService";

class ReportRepository {
    static async getOrderReports() {
        const { data, error } = await supabase.rpc('get_order_reports');
        if (error) throw error;
        return data;
    }

    static async getPaymentReports() {
        const { data, error } = await supabase.rpc('get_payment_reports');
        if (error) throw error;
        return data;
    }
}

export { ReportRepository };
