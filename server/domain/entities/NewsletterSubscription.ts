export class NewsletterSubscription {
	id: string;
	email: string;
	name?: string;
	subscribedAt: Date;

	constructor(id: string, email: string, name: string, subscribedAt: Date) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.subscribedAt = subscribedAt;
	}
}
