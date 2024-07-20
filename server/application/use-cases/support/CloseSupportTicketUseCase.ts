import { SupportTicketRepository } from "../../../domain/interfaces/SupportTicketRepository.ts";
import { SupportTicket } from "../../../domain/entities/SupportTicket.ts";

export class CloseSupportTicketUseCase {
	constructor(
		private readonly supportTicketRepository: SupportTicketRepository,
	) {}

	async execute(id: string): Promise<void> {
		const ticket = await this.supportTicketRepository.getById(id);
		if (!ticket) {
			throw new Error("Support ticket not found");
		}

		ticket.status = "closed";
		await this.supportTicketRepository.update(ticket);
	}
}
