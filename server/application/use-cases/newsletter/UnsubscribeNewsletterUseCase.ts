import type { NewsletterRepository } from "../../../domain/interfaces/NewsletterRepository.ts";
import { Email } from "../../../domain/value-objects/Email.ts";

export class UnsubscribeNewsletterUseCase {
	constructor(private newsletterRepository: NewsletterRepository) {}

	async execute(email: string): Promise<void> {
		const emailVO = new Email(email);
		await this.newsletterRepository.unsubscribe(emailVO.getValue());
	}
}
