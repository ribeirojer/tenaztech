export class Newsletter {
	id: string;
	email: string;
	subscribedAt: Date;

	constructor(id: string, email: string, subscribedAt: Date) {
		this.id = id;
		this.email = email;
		this.subscribedAt = subscribedAt;
	}
}
