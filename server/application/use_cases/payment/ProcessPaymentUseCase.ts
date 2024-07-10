import { PaymentRepository } from '../../domain/interfaces/PaymentRepository.ts';
import { Payment } from '../../domain/entities/Payment.ts';
import { OrderRepository } from '../../domain/interfaces/OrderRepository.ts';
import { MercadoPagoService } from '../../infra/mercadopago/MercadoPagoService.ts';

export class ProcessPaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository,
        private readonly mercadoPagoService: MercadoPagoService
    ) {}

    async execute(orderId: string, amount: number, paymentMethod: string, email: string): Promise<void> {
        const order = await this.orderRepository.getById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        const paymentResponse = await this.mercadoPagoService.createPayment(order.description, amount, paymentMethod, email);

        if (paymentResponse.status === 'approved') {
            const payment = new Payment(orderId, amount, paymentMethod, 'processed');
            await this.paymentRepository.add(payment);

            order.status = 'paid';
            await this.orderRepository.update(order);
        } else {
            throw new Error('Payment not approved');
        }
    }
}
