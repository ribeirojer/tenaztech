import { SupportTicketRepository } from "../../domain/interfaces/SupportTicketRepository.ts";
import { SupportTicket } from "../../domain/entities/SupportTicket.ts";

export class UpdateSupportTicketUseCase {
	constructor(
		private readonly supportTicketRepository: SupportTicketRepository,
	) {}

	async execute(id: string, description: string): Promise<void> {
		const ticket = await this.supportTicketRepository.getById(id);
		if (!ticket) {
			throw new Error("Support ticket not found");
		}

		ticket.description = description;
		await this.supportTicketRepository.update(ticket);
	}
}
