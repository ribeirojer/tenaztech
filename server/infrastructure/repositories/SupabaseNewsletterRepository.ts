import { NewsletterRepository } from "../../domain/interfaces/NewsletterRepository.ts";
import { NewsletterSubscription } from "../../domain/entities/NewsletterSubscription.ts";
import { supabase } from "../persistence/DatabaseConnection.ts";

export class SupabaseNewsletterRepository implements NewsletterRepository {
	async subscribe(subscription: NewsletterSubscription): Promise<void> {
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
			.insert([
				{
					id: subscription.id,
					email: subscription.email,
					name: subscription.name,
					subscribed_at: subscription.subscribedAt,
				},
			]);

		if (error) {
			throw new Error(`Error subscribing to newsletter: ${error.message}`);
		}
	}

	async unsubscribe(email: string): Promise<void> {
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
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

	async list(): Promise<NewsletterSubscription[]> {
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
			.select("*");

		if (error) {
			throw new Error(`Error listing newsletters: ${error.message}`);
		}

		return data.map(
			(record: any) =>
				new NewsletterSubscription(
					record.id,
					record.email,
					record.name,
					new Date(record.subscribed_at),
				),
		);
	}

	async findById(id: string): Promise<NewsletterSubscription | null> {
		const { data, error } = await supabase
			.from("newsletter_subscriptions")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(`Error fetching newsletter by id: ${error.message}`);
		}

		if (!data) {
			return null;
		}

		return new NewsletterSubscription(
			data.id,
			data.email,
			data.name,
			new Date(data.subscribed_at),
		);
	}
}
