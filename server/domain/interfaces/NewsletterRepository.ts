import { NewsletterSubscription } from "../entities/NewsletterSubscription.ts";

export interface NewsletterRepository {
	subscribe(subscription: NewsletterSubscription): Promise<void>;
	unsubscribe(email: string): Promise<void>;
	send(newsletter: {
		subject: string;
		content: string;
		sentAt: Date;
	}): Promise<void>;
	list(): Promise<NewsletterSubscription[]>;
	findById(id: string): Promise<NewsletterSubscription | null>;
}
