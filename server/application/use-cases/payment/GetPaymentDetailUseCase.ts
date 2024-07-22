import type { PaymentRepository } from "../../../domain/interfaces/PaymentRepository.ts";
import type { MercadoPagoService } from "../../../infrastructure/services/MercadoPagoService.ts";

export class GetPaymentDetailUseCase {
	constructor(
		private readonly paymentRepository: PaymentRepository,
		private readonly mercadoPagoService: MercadoPagoService,
	) {}

	async execute(paymentId: string): Promise<any> {
		const payment = await this.paymentRepository.getById(paymentId);
		if (!payment) {
			throw new Error("Payment not found");
		}

		return await this.mercadoPagoService.getPayment(paymentId);
	}
}
