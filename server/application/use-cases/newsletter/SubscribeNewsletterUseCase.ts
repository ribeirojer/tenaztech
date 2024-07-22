import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import type { NewsletterRepository } from "../../../domain/interfaces/NewsletterRepository.ts";
import { Email } from "../../../domain/value-objects/Email.ts";

export class SubscribeNewsletterUseCase {
	constructor(
		private newsletterRepository: NewsletterRepository,
		private customerRepository: CustomerRepository,
	) {}

	async execute(email: string, userData: any): Promise<void> {
		const emailVO = new Email(email);
		const existingUser = await this.customerRepository.getByEmail(emailVO);

		if (existingUser) {
			// Atualizar informações do usuário
			await this.customerRepository.subscribeNewsletter(
				existingUser.id,
				userData,
			);
			// Inscrever usuário na newsletter
			await this.newsletterRepository.subscribe(emailVO.getValue());
		} else {
			// Criar novo usuário e inscrevê-lo na newsletter
			await this.customerRepository.add({ email: emailVO, ...userData });
			await this.newsletterRepository.subscribe(emailVO.getValue());
		}
	}
}
