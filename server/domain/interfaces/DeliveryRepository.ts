import { Delivery } from "../entities/Delivery.ts";
import { OrderId } from "../value-objects/OrderId.ts";

export interface DeliveryRepository {
    add(delivery: Delivery): Promise<void>;
    update(delivery: Delivery): Promise<void>;
    getByOrderId(orderId: OrderId): Promise<Delivery | null>;
    delete(orderId: OrderId): Promise<void>;
}
