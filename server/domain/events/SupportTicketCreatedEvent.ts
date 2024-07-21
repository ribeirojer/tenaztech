export class SupportTicketCreatedEvent {
	constructor(
		public readonly id: string,
		public readonly customerId: string,
		public readonly subject: string,
		public readonly message: string,
		public readonly status: string,
		public readonly createdAt: Date,
	) {}
}
