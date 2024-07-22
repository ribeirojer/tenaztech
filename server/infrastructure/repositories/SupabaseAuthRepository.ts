import type { AuthRepository } from "../../domain/interfaces/AuthRepository.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseAuthRepository implements AuthRepository {
	async register(
		email: string,
		password: string,
		name?: string,
	): Promise<void> {
		const { data, error } = await supabase
			.from("customers")
			.insert({
				email,
				password,
			})
			.select();

		if (error) {
			throw new Error(`Error registering user: ${error.message}`);
		}

		if (name) {
			const { data, error } = await supabase
				.from("profiles")
				.insert([{ email, name }]);

			if (error) {
				throw new Error(`Error saving user profile: ${error.message}`);
			}
		}
	}

	async login(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const { data, error } = await supabase
			.from("customers")
			.select("*")
			.eq("email", email);

		if (error) {
			throw new Error(`Error logging in: ${error.message}`);
		}

		return {
			accessToken: "",
			refreshToken: "",
		};
	}

	async logout(): Promise<void> {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(`Error logging out: ${error.message}`);
		}
	}

	async recoverPassword(email: string): Promise<void> {
		/*const { error } = await supabase.auth.api.resetPasswordForEmail(email);

		if (error) {
			throw new Error(
				`Error sending password recovery email: ${error.message}`,
			);
		}*/
	}
}
