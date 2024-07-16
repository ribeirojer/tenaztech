// domain/value-objects/Discount.ts
export class Discount {
	constructor(private percentage: number) {
		if (percentage < 0 || percentage > 100) {
			throw new Error("Discount percentage must be between 0 and 100");
		}
	}

	getPercentage(): number {
		return this.percentage;
	}
}
