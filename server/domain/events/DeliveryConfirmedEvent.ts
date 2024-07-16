export class DeliveryConfirmedEvent {
    constructor(
        public readonly orderId: string,
        public readonly deliveryDate: Date
    ) {}
}
