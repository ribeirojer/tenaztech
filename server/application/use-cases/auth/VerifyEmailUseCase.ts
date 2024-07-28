import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import type { JWTService } from "../../../domain/services/JWTService.ts";
import type { Email } from "../../../domain/value-objects/Email.ts";

interface VerifyEmailInput {
	verificationToken: string;
}

export class VerifyEmailUseCase {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JWTService,
	) {}

	async execute(input: VerifyEmailInput): Promise<void> {
		try {
			const tokenData = await this.jwtService.verifyToken(
				input.verificationToken,
			);

			if (!tokenData) {
				throw new Error("Invalid verification token");
			}

			const customer = await this.customerRepository.getByEmail(
				tokenData as Email,
			);

			if (!customer) {
				throw new Error("User not found");
			}

			customer.isEmailVerified = true;
			await this.customerRepository.update(customer);
		} catch (error) {
			throw new Error(`Email verification failed: ${error.message}`);
		}
	}
}
