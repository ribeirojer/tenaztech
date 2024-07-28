import { SupportTicket } from "../../domain/entities/SupportTicket.ts";
import type { SupportTicketRepository } from "../../domain/interfaces/SupportTicketRepository.ts";
import { supabase } from "../config/DatabaseConnection.ts";

export class SupabaseSupportTicketRepository
	implements SupportTicketRepository
{
	getAll(): SupportTicket[] | PromiseLike<SupportTicket[]> {
		throw new Error("Method not implemented.");
	}
	update(supportTicket: SupportTicket): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async add(ticket: SupportTicket): Promise<void> {
		const { error } = await supabase.from("support_tickets").insert([
			{
				id: ticket.id,
				customerId: ticket.customerId,
				subject: ticket.subject,
				description: ticket.message,
				status: ticket.status,
				createdAt: ticket.createdAt,
				updatedAt: ticket.updatedAt,
			},
		]);

		if (error) {
			throw new Error(`Failed to add support ticket: ${error.message}`);
		}
	}

	async getById(id: string): Promise<SupportTicket | null> {
		const { data, error } = await supabase
			.from("support_tickets")
			.select("*")
			.eq("id", id)
			.single();

		if (error && error.code !== "PGRST116") {
			throw new Error(`Failed to get support ticket by id: ${error.message}`);
		}

		return data
			? new SupportTicket(
					data.id,
					data.customerId,
					data.subject,
					data.description,
					data.status,
					new Date(data.createdAt),
					new Date(data.updatedAt),
				)
			: null;
	}
}
