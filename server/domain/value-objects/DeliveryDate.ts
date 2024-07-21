// domain/value-objects/DeliveryDate.ts

export class DeliveryDate {
	private readonly value: Date;

	constructor(value: Date) {
		if (!this.isValidDate(value)) {
			throw new Error("Invalid delivery date");
		}
		this.value = value;
	}

	getValue(): Date {
		return this.value;
	}

	private isValidDate(date: Date): boolean {
		const now = new Date();
		return date > now;
	}
}
