import { NewsletterRepository } from "../../domain/interfaces/NewsletterRepository.ts";

export class GetNewsletterDetailUseCase {
	constructor(private newsletterRepository: NewsletterRepository) {}

	async execute(id: string): Promise<Newsletter> {
		return await this.newsletterRepository.detail(id);
	}
}
