export class Coupon {
	constructor(
		private readonly code: string,
		private readonly discountPercentage: number,
	) {
		if (discountPercentage < 0 || discountPercentage > 100) {
			throw new InvalidCouponException(
				"Discount percentage must be between 0 and 100",
			);
		}
		this.code = code;
		this.discountPercentage = discountPercentage;
	}

	getCode(): string {
		return this.code;
	}

	getDiscountPercentage(): number {
		return this.discountPercentage;
	}

	applyDiscount(amount: number): number {
		return amount - amount * (this.discountPercentage / 100);
	}
}

export class InvalidCouponException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidCouponException";
	}
}
