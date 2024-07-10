import { SupportTicketRepository } from '../../domain/interfaces/SupportTicketRepository.ts';
import { SupportTicket } from '../../domain/entities/SupportTicket.ts';

export class ListSupportTicketsUseCase {
    constructor(private readonly supportTicketRepository: SupportTicketRepository) {}

    async execute(): Promise<SupportTicket[]> {
        return this.supportTicketRepository.getAll();
    }
}
