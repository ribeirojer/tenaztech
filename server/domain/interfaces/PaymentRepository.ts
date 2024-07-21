import { Payment } from "../entities/Payment.ts";

export interface PaymentRepository {
    createPayment(payment: Payment): Promise<void>;
    refundPayment(paymentId: string): Promise<void>;
    getPaymentDetail(paymentId: string): Promise<Payment>;
}
