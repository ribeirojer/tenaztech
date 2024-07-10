import { SupportTicketRepository } from '../../domain/interfaces/SupportTicketRepository.ts';
import { SupportTicket } from '../../domain/entities/SupportTicket.ts';

export class CreateSupportTicketUseCase {
    constructor(private readonly supportTicketRepository: SupportTicketRepository) {}

    async execute(customerId: string, description: string): Promise<void> {
        const ticket = new SupportTicket(customerId, description, 'open');
        await this.supportTicketRepository.add(ticket);
    }
}
