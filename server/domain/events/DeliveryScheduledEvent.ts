export class DeliveryScheduledEvent {
	constructor(
		public readonly orderId: string,
		public readonly deliveryDate: Date,
	) {}
}
