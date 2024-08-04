import { SupportTicket } from "../../../domain/entities/SupportTicket.ts";
import type { SupportTicketRepository } from "../../../domain/interfaces/SupportTicketRepository.ts";

interface CreateSupportTicketInput {
	name: string;
	email: string;
	message: string;
}

export class CreateSupportTicketUseCase {
	constructor(
		private readonly supportTicketRepository: SupportTicketRepository,
	) {}

	async execute(input: CreateSupportTicketInput): Promise<void> {

		const ticket = new SupportTicket(
			crypto.randomUUID(),
			input.name,
			input.email,
			input.message,
			"open",
			new Date(),
			new Date(),
		);

		await this.supportTicketRepository.add(ticket);
	}
}
