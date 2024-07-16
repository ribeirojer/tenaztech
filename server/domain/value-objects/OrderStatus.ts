// domain/value-objects/OrderStatus.ts
export class OrderStatus {
	private static validTransitions: { [key: string]: string[] } = {
		pending: ["completed", "cancelled"],
		completed: [],
		cancelled: [],
	};

	constructor(private readonly status: string) {
		if (!OrderStatus.validTransitions.hasOwnProperty(status)) {
			throw new Error("Invalid order status");
		}
	}

	getStatus(): string {
		return this.status;
	}

	isValidTransition(newStatus: OrderStatus): boolean {
		return OrderStatus.validTransitions[this.status].includes(
			newStatus.getStatus(),
		);
	}
}
