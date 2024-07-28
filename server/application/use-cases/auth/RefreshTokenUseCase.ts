import type { JWTService } from "../../../domain/services/JWTService.ts";

interface RefreshTokenInput {
	refreshToken: string;
}

interface RefreshTokenOutput {
	accessToken: string;
}

export class RefreshTokenUseCase {
	constructor(private jwtService: JWTService) {}

	async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
		const { refreshToken } = input;

		// Verificar a validade do refresh token
		const payload = await this.jwtService.verifyRefreshToken(refreshToken);
		if (!payload) {
			throw new Error("Invalid refresh token");
		}

		// Gerar novo access token
		const accessToken = await this.jwtService.generateToken(payload, 60 * 60); // Novo token válido por 1 hora

		return { accessToken };
	}
}
