import type { CustomerRepository } from "../../../domain/interfaces/CustomerRepository.ts";
import type { JWTService } from "../../../domain/services/JWTService.ts";
import { Email } from "../../../domain/value-objects/Email.ts";
import { Password } from "../../../domain/value-objects/Password.ts";

interface LoginInput {
	email: string;
	password: string;
	rememberMe?: boolean;
}

interface LoginOutput {
	accessToken: string;
	refreshToken: string;
}

export class LoginUseCase {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JWTService,
	) {}

	async execute(input: LoginInput): Promise<LoginOutput> {
		const email = new Email(input.email);
		const password = new Password(input.password);
		const rememberMe = input.rememberMe;

		const customer = await this.customerRepository.getByEmail(email);

		if (!customer || !(await customer.password.compare(password.getValue()))) {
			throw new Error("Invalid email or password.");
		}

		// Definir a duração do token com base na opção "remember me"
		const tokenDuration = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60; // 1 semana ou 1 hora

		// Gerar tokens
		const accessToken = await this.jwtService.generateToken(
			{ customerId: customer.id },
			tokenDuration,
		);
		const refreshToken = await this.jwtService.generateRefreshToken(
			{ customerId: customer.id },
			tokenDuration,
		);

		return { accessToken, refreshToken };
	}
}
