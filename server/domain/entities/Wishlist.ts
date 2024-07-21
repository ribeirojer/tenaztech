export class Wishlist {
	constructor(
		public id: string,
		public customerId: string,
		public products: WishlistItem[],
		public createdAt: Date,
		public updatedAt: Date
		) {}
	
		addProduct(productId: WishlistItem): void {
			if (!this.products.includes(productId)) {
				this.products.push(productId);
			}
		}
	
		removeProduct(productId: WishlistItem): void {
			this.products = this.products.filter(id => id !== productId);
		}
}

export class WishlistItem {
	constructor(
		public productId: string,
		public addedAt: Date,
	) {}
}
