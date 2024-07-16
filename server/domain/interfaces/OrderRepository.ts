import { Order } from "../entities/Order.ts";

export interface OrderRepository {
	getById(id: string): Promise<Order | null>;
	getAll(): Promise<Order[]>;
	add(order: Order): Promise<void>;
	update(order: Order): Promise<void>;
	remove(id: string): Promise<void>;
}
