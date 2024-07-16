// domain/events/OrderCreatedEvent.ts
export class OrderCreatedEvent {
	constructor(
		public readonly orderId: string,
		public readonly customerId: string,
		public readonly orderDate: Date,
		public readonly totalAmount: number,
	) {}
}
