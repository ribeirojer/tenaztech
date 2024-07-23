import type { Email } from "../value-objects/Email.ts";

export interface AuthRepository {
	getByEmail(email: Email): unknown;
	register(email: string, password: string, name?: string): Promise<void>;
	login(
		email: string,
		password: string,
	): Promise<{ accessToken: string; refreshToken: string }>;
	logout(): Promise<void>;
	recoverPassword(email: string): Promise<void>;
}
