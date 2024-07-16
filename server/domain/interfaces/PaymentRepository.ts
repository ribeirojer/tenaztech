import { Payment } from "../entities/Payment";

export interface PaymentRepository {
	update(payment: Payment): unknown;
	add(payment: Payment): Payment;
	getById(paymentId: string): Payment;
}
