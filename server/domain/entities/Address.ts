export class Address {
	constructor(
		public id: string,
		public customerId: string,
		public street: string,
		public city: string,
		public state: string,
		public zipCode: string,
		public country: string,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
