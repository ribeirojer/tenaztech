// domain/value-objects/OrderId.ts
export class OrderId {
	constructor(private readonly id: string) {
		if (!id) {
			throw new Error("Order ID cannot be empty");
		}
	}

	toString(): string {
		return this.id;
	}
}
