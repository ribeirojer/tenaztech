import { NewsletterRepository } from "../../domain/interfaces/NewsletterRepository.ts";

export class ListNewslettersUseCase {
	constructor(private newsletterRepository: NewsletterRepository) {}

	async execute(): Promise<Newsletter[]> {
		return await this.newsletterRepository.list();
	}
}
