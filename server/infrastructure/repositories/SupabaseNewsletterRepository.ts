import { NewsletterRepository } from "../../domain/interfaces/NewsletterRepository.ts";
import { Newsletter } from "../../domain/entities/Newsletter.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseNewsletterRepository implements NewsletterRepository {
	async subscribe(subscription: Newsletter): Promise<void> {
		const { data, error } = await supabase.from("newsletter").insert([
			{
				id: subscription.id,
				email: subscription.email,
				subscribed_at: subscription.subscribedAt,
			},
		]);

		if (error) {
			throw new Error(`Error subscribing to newsletter: ${error.message}`);
		}
	}

	async unsubscribe(email: string): Promise<void> {
		const { data, error } = await supabase
			.from("newsletter")
			.delete()
			.eq("email", email);

		if (error) {
			throw new Error(`Error unsubscribing from newsletter: ${error.message}`);
		}
	}

	async send(newsletter: {
		subject: string;
		content: string;
		sentAt: Date;
	}): Promise<void> {
		const { data, error } = await supabase
			.from("newsletters")
			.insert([{ ...newsletter }]);

		if (error) {
			throw new Error(`Error sending newsletter: ${error.message}`);
		}
	}

	async list(): Promise<Newsletter[]> {
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
			.select("*");

		if (error) {
			throw new Error(`Error listing newsletters: ${error.message}`);
		}

		return data.map(
			(record: any) =>
				new Newsletter(record.id, record.email, new Date(record.subscribed_at)),
		);
	}

	async findById(id: string): Promise<Newsletter | null> {
		const { data, error } = await supabase
			.from("newsletter")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(`Error fetching newsletter by id: ${error.message}`);
		}

		if (!data) {
			return null;
		}

		return new Newsletter(data.id, data.email, new Date(data.subscribed_at));
	}
}
