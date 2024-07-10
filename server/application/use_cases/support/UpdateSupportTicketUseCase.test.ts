import { assertEquals, assertThrowsAsync } from 'https://deno.land/std/testing/asserts.ts';
import { UpdateSupportTicketUseCase } from './UpdateSupportTicketUseCase.ts';
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

Deno.test('UpdateSupportTicketUseCase should update support ticket description', async () => {
    const supportTicketRepository = new MockSupportTicketRepository();
    const useCase = new UpdateSupportTicketUseCase(supportTicketRepository);

    const ticket = new SupportTicket('1', 'Initial issue', 'open');
    await supportTicketRepository.add(ticket);

    await useCase.execute('1', 'Updated issue description');

    const updatedTicket = await supportTicketRepository.getById('1');
    assertEquals(updatedTicket!.description, 'Updated issue description');
});

Deno.test('UpdateSupportTicketUseCase should throw error if support ticket not found', async () => {
    const supportTicketRepository = new MockSupportTicketRepository();
    const useCase = new UpdateSupportTicketUseCase(supportTicketRepository);

    await assertThrowsAsync(
        async () => {
            await useCase.execute('1', 'Updated issue description');
        },
        Error,
        'Support ticket not found'
    );
});
