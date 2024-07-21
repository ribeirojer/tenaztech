import { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import { Email } from "../../../domain/value-objects/Email.ts";
import { Password } from "../../../domain/value-objects/Password.ts";
import { JWTService } from "../../../domain/services/JWTService.ts";
import { InvalidCredentialsException } from "../../../domain/exceptions/InvalidCredentialsException.ts";

interface LoginInput {
	email: string;
	password: string;
}

interface LoginOutput {
	token: string;
	customerId: string;
}

export class LoginUseCase {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JWTService,
	) {}

	async execute(input: LoginInput): Promise<LoginOutput> {
		const email = new Email(input.email);
		const password = new Password(input.password);

		const customer = await this.customerRepository.getByEmail(email);
		if (!customer || !(await customer.password.compare(password.getValue()))) {
			throw new InvalidCredentialsException("Invalid email or password.");
		}

		const token = this.jwtService.generateToken({ customerId: customer.id });

		return {
			token,
			customerId: customer.id,
		};
	}
}
