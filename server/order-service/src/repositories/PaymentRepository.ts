import { supabase } from "../services/supabaseService";

class PaymentRepository {
	static async process(paymentData: any) {
		const { data, error } = await supabase.from("payments").insert(paymentData);
		if (error) throw error;
		return data;
	}

	static async configureProvider(providerData: any) {
		const { data, error } = await supabase
			.from("payment_providers")
			.insert(providerData);
		if (error) throw error;
		return data;
	}

	static async getProviders() {
		const { data, error } = await supabase
			.from("payment_providers")
			.select("*");
		if (error) throw error;
		return data;
	}

	static async getHistory() {
		const { data, error } = await supabase.from("payment_history").select("*");
		if (error) throw error;
		return data;
	}

	static async getDetails(transactionId: string) {
		const { data, error } = await supabase
			.from("payments")
			.select("*")
			.eq("transaction_id", transactionId)
			.single();
		if (error) throw error;
		return data;
	}
}

export { PaymentRepository };
