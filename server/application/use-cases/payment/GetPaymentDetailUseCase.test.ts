import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { GetPaymentDetailUseCase } from "./GetPaymentDetailUseCase.ts";
import { PaymentRepository } from "../../domain/interfaces/PaymentRepository.ts";
import { Payment } from "../../domain/entities/Payment.ts";
import { MercadoPagoService } from "../../infra/mercadopago/MercadoPagoService.ts";

class MockPaymentRepository implements PaymentRepository {
	// Implementação similar ao exemplo anterior
}

class MockMercadoPagoService extends MercadoPagoService {
	async getPayment(paymentId: string): Promise<any> {
		return { id: paymentId, status: "approved", amount: 100 };
	}
}

Deno.test("GetPaymentDetailUseCase should return payment details", async () => {
	const paymentRepository = new MockPaymentRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new GetPaymentDetailUseCase(
		paymentRepository,
		mercadoPagoService,
	);

	const payment = new Payment("1", "1", 100, "credit_card", "processed");
	await paymentRepository.add(payment);

	const paymentDetails = await useCase.execute("1");
	assertEquals(paymentDetails.id, "1");
	assertEquals(paymentDetails.status, "approved");
	assertEquals(paymentDetails.amount, 100);
});

Deno.test("GetPaymentDetailUseCase should throw error if payment not found", async () => {
	const paymentRepository = new MockPaymentRepository();
	const mercadoPagoService = new MockMercadoPagoService("mock_access_token");
	const useCase = new GetPaymentDetailUseCase(
		paymentRepository,
		mercadoPagoService,
	);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1");
		},
		Error,
		"Payment not found",
	);
});
