export class SupportTicket {
	constructor(
		public id: string,
		public customerId: string,
		public subject: string,
		public message: string,
		public status: "open" | "closed" | "in-progress",
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
