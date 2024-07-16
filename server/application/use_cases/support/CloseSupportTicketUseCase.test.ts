import {
	assertEquals,
	assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { CloseSupportTicketUseCase } from "./CloseSupportTicketUseCase.ts";
import { SupportTicketRepository } from "../../domain/interfaces/SupportTicketRepository.ts";
import { SupportTicket } from "../../domain/entities/SupportTicket.ts";

class MockSupportTicketRepository implements SupportTicketRepository {
	private tickets: SupportTicket[] = [];

	async getById(id: string): Promise<SupportTicket | null> {
		return this.tickets.find((ticket) => ticket.id === id) || null;
	}

	async getAll(): Promise<SupportTicket[]> {
		return this.tickets;
	}

	async add(ticket: SupportTicket): Promise<void> {
		this.tickets.push(ticket);
	}

	async update(ticket: SupportTicket): Promise<void> {
		const index = this.tickets.findIndex((t) => t.id === ticket.id);
		if (index !== -1) {
			this.tickets[index] = ticket;
		}
	}

	async remove(id: string): Promise<void> {
		this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
	}
}

Deno.test("CloseSupportTicketUseCase should close support ticket", async () => {
	const supportTicketRepository = new MockSupportTicketRepository();
	const useCase = new CloseSupportTicketUseCase(supportTicketRepository);

	const ticket = new SupportTicket("1", "Issue with the product", "open");
	await supportTicketRepository.add(ticket);

	await useCase.execute("1");

	const closedTicket = await supportTicketRepository.getById("1");
	assertEquals(closedTicket!.status, "closed");
});

Deno.test("CloseSupportTicketUseCase should throw error if support ticket not found", async () => {
	const supportTicketRepository = new MockSupportTicketRepository();
	const useCase = new CloseSupportTicketUseCase(supportTicketRepository);

	await assertThrowsAsync(
		async () => {
			await useCase.execute("1");
		},
		Error,
		"Support ticket not found",
	);
});
