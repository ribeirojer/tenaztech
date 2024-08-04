export class Review {
	constructor(
		public id: string,
		public productSlug: string,
		public name: string,
		public email: string,
		public rating: number,
		public review: string,
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}
