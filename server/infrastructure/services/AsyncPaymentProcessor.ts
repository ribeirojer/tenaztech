// infrastructure/services/AsyncPaymentProcessor.ts
import { OrderRepository } from '../../domain/repositories/OrderRepository.ts';
import { PaymentService } from '../../domain/services/PaymentService.ts';
import { EmailService } from '../../domain/services/EmailService.ts';
import { OrderStatus } from '../../domain/value-objects/OrderStatus.ts';

export class AsyncPaymentProcessor {
    constructor(
        private orderRepository: OrderRepository,
        private paymentService: PaymentService,
        private emailService: EmailService
    ) {}

    async processPendingOrders(): Promise<void> {
        const pendingOrders = await this.orderRepository.findByStatus(new OrderStatus('pending'));

        for (const order of pendingOrders) {
            try {
                const paymentResponse = await this.paymentService.processPayment(
                    order.getId().getValue(),
                    order.getTotalAmount(),
                    order.getPaymentData()
                );

                order.updateStatus(new OrderStatus('completed'));
                await this.orderRepository.save(order);

                await this.emailService.sendOrderCompletedEmail(order);
            } catch (error) {
                order.updateStatus(new OrderStatus('payment_failed'));
                await this.orderRepository.save(order);

                await this.emailService.sendOrderFailedEmail(order, error.message);
            }
        }
    }
}
