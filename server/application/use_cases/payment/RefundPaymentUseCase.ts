import { PaymentRepository } from '../../domain/interfaces/PaymentRepository.ts';
import { Payment } from '../../domain/entities/Payment.ts';
import { OrderRepository } from '../../domain/interfaces/OrderRepository.ts';

export class RefundPaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(paymentId: string): Promise<void> {
        const payment = await this.paymentRepository.getById(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }

        payment.status = 'refunded';
        await this.paymentRepository.update(payment);

        const order = await this.orderRepository.getById(payment.orderId);
        if (order) {
            order.status = 'refunded';
            await this.orderRepository.update(order);
        }
    }
}
