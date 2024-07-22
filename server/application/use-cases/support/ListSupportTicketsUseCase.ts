import type { SupportTicket } from "../../../domain/entities/SupportTicket.ts";
import type { SupportTicketRepository } from "../../../domain/interfaces/SupportTicketRepository.ts";

export class ListSupportTicketsUseCase {
	constructor(
		private readonly supportTicketRepository: SupportTicketRepository,
	) {}

	async execute(): Promise<SupportTicket[]> {
		return this.supportTicketRepository.getAll();
	}
}
