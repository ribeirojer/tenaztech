// application/event-handlers/SendOrderConfirmationEmailHandler.ts
import { OrderCreatedEvent } from "../../events/OrderCreatedEvent.ts";
import { EmailService } from "../../services/EmailService.ts";

export class SendOrderConfirmationEmailHandler {
	constructor(private emailService: EmailService) {}

	handle(event: OrderCreatedEvent): void {
		this.emailService.sendOrderConfirmation(
			event.customerId,
			event.orderId,
			event.orderDate,
			event.totalAmount,
		);
	}
}
