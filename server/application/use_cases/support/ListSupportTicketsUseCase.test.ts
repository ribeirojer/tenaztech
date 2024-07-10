import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { ListSupportTicketsUseCase } from './ListSupportTicketsUseCase.ts';
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

Deno.test('ListSupportTicketsUseCase should list all support tickets', async () => {
    const supportTicketRepository = new MockSupportTicketRepository();
    const useCase = new ListSupportTicketsUseCase(supportTicketRepository);

    const ticket1 = new SupportTicket('1', 'Issue with the product 1', 'open');
    const ticket2 = new SupportTicket('2', 'Issue with the product 2', 'closed');
    await supportTicketRepository.add(ticket1);
    await supportTicketRepository.add(ticket2);

    const tickets = await useCase.execute();
    assertEquals(tickets.length, 2);
    assertEquals(tickets[0].id, '1');
    assertEquals(tickets[1].id, '2');
});
