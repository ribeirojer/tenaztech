import type { NewsletterRepository } from "../../../domain/interfaces/NewsletterRepository.ts";

export class ListNewslettersUseCase {
	constructor(private newsletterRepository: NewsletterRepository) {}

	async execute(): Promise<any[]> {
		return await this.newsletterRepository.list();
	}
}
