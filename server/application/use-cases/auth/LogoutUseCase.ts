import { JWTService } from "../../../domain/services/JWTService.ts";

interface LogoutInput {
	token: string;
}

export class LogoutUseCase {
	constructor(private readonly jwtService: JWTService) {}

	execute(input: LogoutInput): void {
		this.jwtService.invalidateToken(input.token);
	}
}
