import type { Payment } from "../../domain/entities/Payment.ts";
import type { PaymentRepository } from "../../domain/interfaces/PaymentRepository.ts";
import { supabase } from "../config/DatabaseConnection.ts";

export class SupabasePaymentRepository implements PaymentRepository {
	add(payment: Payment): unknown {
		throw new Error("Method not implemented.");
	}
	getById(paymentId: string): Payment {
		throw new Error("Method not implemented.");
	}
	async createPayment(payment: Payment): Promise<void> {
		const { error } = await supabase.from("payments").insert([
			{
				id: payment.id,
				orderId: payment.orderId,
				amount: payment.amount,
				status: payment.status,
				createdAt: payment.createdAt,
				updatedAt: payment.updatedAt,
			},
		]);

		if (error) {
			throw new Error(`Failed to create payment: ${error.message}`);
		}
	}

	async refundPayment(paymentId: string): Promise<void> {
		const { error } = await supabase
			.from("payments")
			.update({ status: "refunded" })
			.eq("id", paymentId);

		if (error) {
			throw new Error(`Failed to refund payment: ${error.message}`);
		}
	}

	async getPaymentDetail(paymentId: string): Promise<Payment> {
		const { data, error } = await supabase
			.from("payments")
			.select("*")
			.eq("id", paymentId)
			.single();

		if (error) {
			throw new Error(`Failed to get payment detail: ${error.message}`);
		}

		return data;
	}
}
