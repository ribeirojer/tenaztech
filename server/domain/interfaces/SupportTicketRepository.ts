import type { SupportTicket } from "../entities/SupportTicket.ts";

export interface SupportTicketRepository {
	getAll(): SupportTicket[] | PromiseLike<SupportTicket[]>;
	getById(id: string): Promise<SupportTicket | null>;
	add(supportTicket: SupportTicket): Promise<void>;
	update(supportTicket: SupportTicket): Promise<void>;
}
