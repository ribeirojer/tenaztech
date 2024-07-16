// domain/value-objects/CustomerId.ts
export class CustomerId {
	constructor(private readonly id: string) {
		if (!id) {
			throw new Error("Customer ID cannot be empty");
		}
	}

	toString(): string {
		return this.id;
	}
}
