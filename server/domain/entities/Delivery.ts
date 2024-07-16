import { OrderId } from "../value-objects/OrderId.ts";
import { DeliveryDate } from "../value-objects/DeliveryDate.ts";

export class Delivery {
    public status: string;

    constructor(
        public orderId: OrderId,
        public date: DeliveryDate,
        status: string = "scheduled"
    ) {
        this.status = status;
    }

    updateDate(newDate: DeliveryDate): void {
        this.date = newDate;
    }

    confirm(): void {
        this.status = "confirmed";
    }

    cancel(): void {
        this.status = "cancelled";
    }
}
