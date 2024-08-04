export interface NewsletterRepository {
	subscribe(email: string): Promise<void>;
	unsubscribe(email: string): Promise<void>;
}
