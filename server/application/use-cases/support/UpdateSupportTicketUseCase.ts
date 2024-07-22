import type { SupportTicketRepository } from "../../../domain/interfaces/SupportTicketRepository.ts";

export class UpdateSupportTicketUseCase {
	constructor(
		private readonly supportTicketRepository: SupportTicketRepository,
	) {}

	async execute(id: string, description: string): Promise<void> {
		const ticket = await this.supportTicketRepository.getById(id);
		if (!ticket) {
			throw new Error("Support ticket not found");
		}

		ticket.message = description;
		await this.supportTicketRepository.update(ticket);
	}
}
