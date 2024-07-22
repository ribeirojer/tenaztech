import type { Newsletter } from "../entities/Newsletter.ts";

export interface NewsletterRepository {
	subscribe(email: string): Promise<void>;
	unsubscribe(email: string): Promise<void>;
	send(newsletter: {
		subject: string;
		content: string;
		sentAt: Date;
	}): Promise<void>;
	list(): Promise<Newsletter[]>;
	findById(id: string): Promise<Newsletter | null>;
}
