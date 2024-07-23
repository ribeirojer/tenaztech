import type { Payment } from "../entities/Payment.ts";

export interface PaymentRepository {
	add(payment: Payment): unknown;
	getById(paymentId: string): Payment;
	createPayment(payment: Payment): Promise<void>;
	refundPayment(paymentId: string): Promise<void>;
	getPaymentDetail(paymentId: string): Promise<Payment>;
}
