// domain/value-objects/OrderItem.ts
export class OrderItem {
	constructor(
		public productId: string,
		public quantity: number,
		public unitPrice: number,
	) {
		if (quantity <= 0) {
			throw new Error("Quantity must be greater than zero");
		}
		if (unitPrice < 0) {
			throw new Error("Unit price cannot be negative");
		}
	}

	getTotalPrice(): number {
		return this.quantity * this.unitPrice;
	}
}
