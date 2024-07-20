import { SupportTicketRepository } from "../../../domain/interfaces/SupportTicketRepository.ts";
import { SupportTicket } from "../../../domain/entities/SupportTicket.ts";
import { InvalidSupportTicketException } from "../../../domain/exceptions/InvalidSupportTicketException.ts";
import { EventPublisher } from "../../services/EventPublisher.ts";
import { SupportTicketCreatedEvent } from "../../../domain/events/SupportTicketCreatedEvent.ts";

interface CreateSupportTicketInput {
    customerId: string;
    subject: string;
    message: string;
}

export class CreateSupportTicketUseCase {
    constructor(
        private readonly supportTicketRepository: SupportTicketRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async execute(input: CreateSupportTicketInput): Promise<void> {
        this.validateInput(input);

        const ticket = new SupportTicket(
			crypto.randomUUID(),
			input.customerId,
            input.subject,
            input.message,
            "open",
            new Date(),
            new Date()
        );

        await this.supportTicketRepository.add(ticket);

        const supportTicketCreatedEvent = new SupportTicketCreatedEvent(
            ticket.id,
            ticket.customerId,
            ticket.subject,
            ticket.message,
            ticket.status,
            ticket.createdAt
        );
        this.eventPublisher.publish(supportTicketCreatedEvent);
    }

    private validateInput(input: CreateSupportTicketInput): void {
        if (!input.customerId || !input.subject || !input.message) {
            throw new InvalidSupportTicketException("All fields are required.");
        }
    }
}
