export class Wishlist {
	constructor(
		public id: string,
		public customerId: string,
		public items: WishlistItem[],
		public createdAt: Date,
		public updatedAt: Date,
	) {}
}

export class WishlistItem {
	constructor(
		public productId: string,
		public addedAt: Date,
	) {}
}
