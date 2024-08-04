import type { NewsletterRepository } from "../../domain/interfaces/NewsletterRepository.ts";
import { supabase } from "../config/DatabaseConnection.ts";

export class SupabaseNewsletterRepository implements NewsletterRepository {
	async subscribe(email: string): Promise<void> {
		const { error } = await supabase.from("newsletter").insert([
			{
				email,
			},
		]);

		if (error) {
			throw new Error(`Error subscribing to newsletter: ${error.message}`);
		}
	}

	async unsubscribe(email: string): Promise<void> {
		const { error } = await supabase
			.from("newsletter")
			.delete()
			.eq("email", email);

		if (error) {
			throw new Error(`Error unsubscribing from newsletter: ${error.message}`);
		}
	}
}
