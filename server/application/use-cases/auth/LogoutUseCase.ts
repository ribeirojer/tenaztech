import type { JWTService } from "../../../domain/services/JWTService.ts";

interface LogoutInput {
	refreshToken: string;
}

export class LogoutUseCase {
	constructor(private readonly jwtService: JWTService) {}

	async execute(input: LogoutInput): Promise<void> {
		try {
			// Valide o token antes de invalidá-lo
			const tokenData = await this.jwtService.verifyToken(input.refreshToken);
			if (!tokenData) {
				throw new Error("Invalid refresh token");
			}

			// Invalide o token
			await this.jwtService.invalidateToken(input.refreshToken);
		} catch (error) {
			throw new Error(`Logout failed: ${error.message}`);
		}
	}
}
