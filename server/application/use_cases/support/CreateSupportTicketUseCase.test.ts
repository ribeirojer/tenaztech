import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { CreateSupportTicketUseCase } from './CreateSupportTicketUseCase.ts';
import { SupportTicketRepository } from '../../domain/interfaces/SupportTicketRepository.ts';
import { SupportTicket } from '../../domain/entities/SupportTicket.ts';

class MockSupportTicketRepository implements SupportTicketRepository {
    private tickets: SupportTicket[] = [];

    async getById(id: string): Promise<SupportTicket | null> {
        return this.tickets.find(ticket => ticket.id === id) || null;
    }

    async getAll(): Promise<SupportTicket[]> {
        return this.tickets;
    }

    async add(ticket: SupportTicket): Promise<void> {
        this.tickets.push(ticket);
    }

    async update(ticket: SupportTicket): Promise<void> {
        const index = this.tickets.findIndex(t => t.id === ticket.id);
        if (index !== -1) {
            this.tickets[index] = ticket;
        }
    }

    async remove(id: string): Promise<void> {
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    }
}

Deno.test('CreateSupportTicketUseCase should create a support ticket', async () => {
    const supportTicketRepository = new MockSupportTicketRepository();
    const useCase = new CreateSupportTicketUseCase(supportTicketRepository);

    await useCase.execute('1', 'Issue with the product');

    const tickets = await supportTicketRepository.getAll();
    assertEquals(tickets.length, 1);
    assertEquals(tickets[0].customerId, '1');
    assertEquals(tickets[0].description, 'Issue with the product');
    assertEquals(tickets[0].status, 'open');
});
