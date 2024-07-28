import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import type { JWTService } from "../../../domain/services/JWTService.ts";
import type { Email } from "../../../domain/value-objects/Email.ts";

interface ResetPasswordInput {
	resetToken: string;
	newPassword: string;
}

export class ResetPasswordUseCase {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JWTService,
	) {}

	async execute(input: ResetPasswordInput): Promise<void> {
		try {
			const tokenData = await this.jwtService.verifyToken(input.resetToken);

			if (!tokenData) {
				throw new Error("Invalid reset token");
			}

			const customer = await this.customerRepository.getByEmail(
				tokenData as Email,
			);

			if (!customer) {
				throw new Error("User not found");
			}

			customer.password.setValue(input.newPassword);
			customer.password.hash();

			await this.customerRepository.update(customer);
		} catch (error) {
			throw new Error(`Password reset failed: ${error.message}`);
		}
	}
}
