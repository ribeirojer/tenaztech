export class DeliveryNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeliveryNotFoundException";
    }
}
