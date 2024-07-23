import { Customer } from "../../../domain/entities/Customer.ts";
import type { AuthRepository } from "../../../domain/interfaces/AuthRepository.ts";
import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import type { EmailService } from "../../../domain/services/EmailService.ts";
import type { Address } from "../../../domain/value-objects/Address.ts";
import { Email } from "../../../domain/value-objects/Email.ts";
import { Password } from "../../../domain/value-objects/Password.ts";

interface RegisterAccountInput {
	name: string;
	email: string;
	password: string;
	phone: string;
	addresses: Address[];
}

export class RegisterAccountUseCase {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly customerRepository: CustomerRepository,
		private readonly emailService: EmailService,
	) {}

	async execute(input: RegisterAccountInput): Promise<void> {
		const email = new Email(input.email);
		const existingCustomer = await this.customerRepository.getByEmail(email);
		if (existingCustomer) {
			throw new Error("Customer with this email already exists");
		}

		const password = new Password(input.password);
		await password.hash();

		const customer = new Customer(
			this.generateUniqueId(),
			input.name,
			email,
			password,
			input.phone,
			input.addresses,
			new Date(),
			new Date(),
		);

		await this.customerRepository.add(customer);

		await this.emailService.sendWelcomeEmail(
			customer.email.getValue(),
			customer.name,
		);
	}

	private generateUniqueId(): string {
		return crypto.randomUUID();
	}
}
