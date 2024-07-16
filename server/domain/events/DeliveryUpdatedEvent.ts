export class DeliveryUpdatedEvent {
    constructor(
        public readonly orderId: string,
        public readonly newDeliveryDate: Date
    ) {}
}
