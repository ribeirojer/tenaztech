import { supabase } from "../../infrastructure/config/DatabaseConnection.ts";

class SupabaseTokenService {
	async storeToken(token: string, expiresAt: string): Promise<void> {
		const { error } = await supabase
			.from("tokens")
			.insert([{ token, expires_at: expiresAt }]);

		if (error) {
			throw new Error(`Failed to store token: ${error.message}`);
		}
	}

	async getToken(token: string) {
		const { data, error } = await supabase
			.from("tokens")
			.select("*")
			.eq("token", token)
			.single();

		if (error) {
			throw new Error(`Failed to get token: ${error.message}`);
		}

		return data;
	}

	async deleteToken(token: string): Promise<void> {
		const { error } = await supabase.from("tokens").delete().eq("token", token);

		if (error) {
			throw new Error(`Failed to delete token: ${error.message}`);
		}
	}
}

export const supabaseTokenService = new SupabaseTokenService();
