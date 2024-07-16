// domain/exceptions/InsufficientStockException.ts
export class InsufficientStockException extends Error {
	constructor(productId: string) {
		super(`Insufficient stock for product ID: ${productId}`);
		this.name = "InsufficientStockException";
	}
}
