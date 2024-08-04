export class SupportTicket {
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public message: string,
		public status: "open" | "closed" | "in-progress",
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
