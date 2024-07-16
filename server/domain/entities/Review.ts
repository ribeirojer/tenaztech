export class Review {
	constructor(
		public id: string,
		public productId: string,
		public customerId: string,
		public rating: number,
		public comment: string,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
