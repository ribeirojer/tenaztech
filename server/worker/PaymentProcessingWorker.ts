import { supabase } from "../infrastructure/database/supabaseClient.ts";
import { SupabaseOrderRepository } from "../infrastructure/repositories/SupabaseOrderRepository.ts";
// worker/PaymentProcessingWorker.ts
import { AsyncPaymentProcessor } from "../infrastructure/services/AsyncPaymentProcessor.ts";
import { MercadoPagoService } from "../infrastructure/services/MercadoPagoService.ts";
import { SMTPService } from "../infrastructure/services/SMTPService.ts";

const orderRepository = new SupabaseOrderRepository(supabase);
const paymentService = new MercadoPagoService();
const emailService = new SMTPService();
const asyncPaymentProcessor = new AsyncPaymentProcessor(
	orderRepository,
	paymentService,
	emailService,
);

setInterval(async () => {
	try {
		const pendingOrders = await orderRepository.findByStatus(
			new OrderStatus("pending"),
		);

		for (const order of pendingOrders) {
			try {
				await orderRepository.startProcessingOrder(order.getId().getValue());

				try {
					const paymentResponse = await paymentService.processPayment(
						order.getId().getValue(),
						order.getTotalAmount(),
						order.getPaymentData(),
					);

					order.updateStatus(new OrderStatus("completed"));
					await orderRepository.save(order);
					await emailService.sendOrderCompletedEmail(order);
				} catch (error) {
					order.updateStatus(new OrderStatus("payment_failed"));
					await orderRepository.save(order);
					await emailService.sendOrderFailedEmail(order, error.message);
				}

				await orderRepository.completeProcessingOrder(order.getId().getValue());
			} catch (error) {
				console.error(
					`Error processing order ${order.getId().getValue()}:`,
					error,
				);
			}
		}
	} catch (error) {
		console.error("Error fetching pending orders:", error);
	}
}, 60000); // Executa a cada 60 segundos
